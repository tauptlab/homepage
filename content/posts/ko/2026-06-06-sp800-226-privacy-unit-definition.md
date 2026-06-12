---
title: "차등 프라이버시 privacy unit: ε이 같아도 보호 강도가 달라지는 이유"
description: "차등 프라이버시에서 보호 단위를 행·사용자·이벤트 중 무엇으로 잡느냐가 같은 ε의 실제 보호 강도를 좌우합니다. 잘못 잡으면 보장이 몇 배로 무너지는 이유를 NIST 논리로 따라갑니다."
date: "2026-06-06"
category: "Research"
author: "정현진(Hyunjin Jeong)"
thumbnail: "/images/blog/sp800-226-privacy-unit-definition.webp"
tags: ["차등 프라이버시", "NIST SP 800-226", "프라이버시 단위", "데이터 프라이버시", "ε"]
---

# 차등 프라이버시 privacy unit: ε이 같아도 보호 강도가 달라지는 이유

> **TL;DR**: 차등 프라이버시에서 "안전하다"는 ε 하나로 정해지지 않습니다. ε은 보호의 세기를 정하는 다이얼이고, privacy unit은 "무엇을 한 명으로 셀지"를 정하는 기준입니다. 같은 ε=1이라도 보호 단위를 "한 줄"로 잡으면 한 사람이 여러 줄을 쓸 때 보호가 줄 수(k)에 비례해 무너지고, Apple처럼 "하루마다 예산을 새로" 주면 광고한 ε=4가 시간이 갈수록 16×일수로 불어납니다. NIST SP 800-226이 privacy unit 정의에 한 페이지를 통째로 쓴 이유가 여기에 있습니다.

"ε=1로 설정했으니 안전합니다." 보고서에 이 한 줄을 적었다고 해 봅니다. 그런데 거래 632건 중 610건이 한 고객의 것이라면, 정작 그 고객은 거의 보호받지 못합니다. ε이라는 숫자는 그대로인데, 보호 대상이 "한 사람"이 아니라 "한 줄"이었기 때문입니다.

여기서 빠진 것이 바로 privacy unit, 즉 보호 단위입니다. ε은 약속의 절반일 뿐입니다. 나머지 절반인 보호 단위를 적지 않으면, 안전 보장은 빈칸이 하나 남은 문장이 됩니다.

행·사용자·이벤트 중에서 단위를 잘못 고르면 보호가 몇 배까지 무너지는지, 실제 사례의 숫자로 하나씩 따라가 봅니다.

## ε은 보호의 절반일 뿐이고 privacy unit이 나머지 절반을 정합니다

가장 먼저 깨야 할 오해는 "ε이 곧 보장"이라는 생각입니다. ε은 보호를 얼마나 세게 걸지 정하는 다이얼이고, privacy unit은 그 보호가 "무엇 하나를 지키는가"를 정하는 기준입니다. 둘은 한 쌍이라 하나만 적으면 약속이 절반만 적힌 셈입니다.

NIST SP 800-226도 정확히 이 점을 못박습니다[^1].

> "The differential privacy guarantee is defined by both the privacy parameters (e.g., ε) and the unit of privacy (i.e., the definition of neighboring datasets)."

쉽게 말하면, 보장은 ε 하나가 아니라 ε과 보호 단위 둘이 함께 정한다는 뜻입니다. 비유하자면, ε은 경비원이 "데이터가 한 단위 바뀌어도 결과는 거의 그대로 두겠다"고 약속하는 강도이고, privacy unit은 그 "한 단위"가 한 줄인지 한 사람인지를 정하는 기준입니다.

**privacy unit**은 차등 프라이버시로 묶어서 지키려는 한 개체를 가리키는 단위입니다. 보통은 한 개인이지만, 한 줄이나 한 이벤트, 혹은 "사람+매장 쌍" 같은 복합 단위도 될 수 있습니다[^2]. 즉, privacy unit은 "데이터에서 이만큼이 바뀌어도 결과가 거의 안 변하게 지키겠다"고 약속하는 그 "이만큼"의 크기입니다.

이 단위가 차등 프라이버시 정의 자체에 박혀 있다는 사실은 Dwork와 Roth의 정식 정의에서 드러납니다. 정의 2.4는 서로 한 단위만큼만 다른 두 데이터셋 $x, y$에 대해 다음을 요구합니다[^3].

$$\Pr[M(x) \in S] \le e^{\varepsilon}\,\Pr[M(y) \in S] + \delta$$

쉽게 말하면, "딱 한 단위만 다른 두 데이터셋"을 넣었을 때 알고리즘 $M$이 내놓는 결과가 거의 구별되지 않아야 한다는 조건입니다. 여기서 $\varepsilon$은 두 결과가 벌어질 수 있는 폭의 상한이고, $\delta$는 그 약속이 깨질 아주 작은 예외 확률입니다. 그리고 핵심은 이것입니다. **이웃 데이터셋**(neighboring datasets)은 "정확히 한 privacy unit만큼 차이 나는 두 데이터셋"을 뜻합니다. 다시 풀면, "이웃"을 어떻게 정의하느냐가 곧 보호 단위를 정하는 일이고, 단위를 바꾸면 정의의 전제부터 바뀝니다.

그래서 같은 ε이라도 단위가 "한 이벤트"냐 "한 사람"이냐에 따라 보호 강도가 전혀 달라집니다. NIST는 이벤트 단위 보호(event-level, 곧 행 단위)는 사람이 아니라 개별 이벤트만 지키기 때문에 "놀라울 만큼 약한" 보장이 될 수 있다고 경고합니다[^1].

## NIST가 한 페이지를 쓴 이유는 privacy unit이 건물의 기초이기 때문입니다

NIST SP 800-226은 차등 프라이버시를 떠받치는 요소들을 **차등 프라이버시 피라미드**(differential privacy pyramid)라는 그림으로 정리합니다. 요지는 단순합니다. 위층은 아래층에 기대고 있다는 것입니다[^4].

> "The ability for each component of the pyramid to protect privacy depends on the components below it … privacy parameters—including ε—and the unit of privacy, which together are the most direct measure of the strength of a differential privacy guarantee."

쉽게 말하면, 피라미드는 보장을 떠받치는 요소들을 층층이 쌓은 그림이고, 아래층이 흔들리면 그 위에 아무리 정교하게 쌓은 ε 계산도 통째로 의미를 잃습니다. 비유하자면, 모래 위에 지은 집은 벽을 아무리 튼튼하게 쌓아도 소용이 없는 것과 같습니다. unit of privacy는 ε과 함께 이 피라미드의 바닥, 곧 기초 층에 놓입니다.

그래서 §2.4 "The Unit of Privacy"는 보호 단위를 피라미드의 기초 층으로 배치하고, 한 절을 통째로 쓴 이유를 직접 밝힙니다[^5].

> "The formal definition of neighboring datasets in a differential privacy guarantee implies a real-world unit of privacy that specifies exactly what is protected by the guarantee. In many ways, it is just as important to real-world privacy as the setting of the privacy parameters."

즉, 이웃 데이터셋의 형식적 정의가 "현실에서 정확히 무엇이 보호되는가"를 결정하고, 이 선택이 ε 설정만큼이나 실제 프라이버시에 중요하다는 것입니다. 한 페이지를 따로 뗀 이유가 바로 이 문장에 적혀 있습니다.

왜 이렇게까지 강조할까요. 단위를 바꾸면 "두 상황을 이웃으로 볼 것인가"라는 판정 자체가 뒤집히기 때문입니다. NIST의 카페 사례가 이를 잘 보여 줍니다. 이벤트 단위에서는 거래 한 건만 다를 때만 이웃이라, 한 사람을 노리는 적의 두 가설은 서로 이웃이 아니게 되어 보장이 적용되지 않습니다. 반면 사용자 단위에서는 같은 두 상황이 이웃이 되어 보장이 살아납니다. **같은 ε, 다른 이웃 정의**가 정반대의 결론을 내놓습니다[^5].

실무 도구도 같은 개념을 그대로 드러냅니다. Google의 차등 프라이버시 라이브러리 문서는 privacy unit을 보호 대상 개체로 정의하면서, **contribution bounding**(기여 한정)을 하지 않으면 무한대의 노이즈가 필요하다고 경고합니다[^2].

> "Contribution bounding is a process of limiting contributions by a single individual … protecting unbounded contributions would require adding infinite noise."

쉽게 말하면, contribution bounding은 한 사람이 데이터에 남길 수 있는 흔적의 개수를 미리 상한으로 묶는 절차입니다. 한 사람이 줄을 몇 개든 마음대로 쓰게 두면, 그 사람을 가리는 데 필요한 노이즈가 무한대로 커져 차등 프라이버시 자체가 성립하지 않습니다.

> **용어 풀이**
> - **privacy unit(보호 단위)**: 차등 프라이버시로 한 단위로 묶어 지키려는 개체. 행·사용자·이벤트·복합 쌍 중 하나로 정합니다.
> - **이웃 데이터셋(neighboring datasets)**: 정확히 한 privacy unit만큼 차이 나는 두 데이터셋. 차등 프라이버시 정의의 전제입니다.
> - **contribution bounding(기여 한정)**: 한 사람의 기여 횟수를 상한 k로 묶어, 보호에 필요한 노이즈를 유한하게 만드는 절차입니다.

## 행 단위로 잡으면 한 사람이 여러 줄을 쓰는 순간 보장이 kε으로 무너집니다

privacy unit을 "행"으로 잡았는데 한 사용자가 줄을 여러 개 쓰면 어떻게 될까요. 이때 작동하는 정리가 **group privacy**(그룹 프라이버시)입니다. 이름 그대로, 한 단위가 아니라 여러 단위가 한꺼번에 바뀔 때 보장이 얼마나 약해지는지를 말해 줍니다. Dwork와 Roth의 정리 2.2는 그 답을 못박습니다[^3].

$$\Pr[M(x) \in S] \le e^{k\varepsilon}\,\Pr[M(y) \in S]$$

쉽게 말하면, $(\varepsilon, 0)$-차등 프라이버시 메커니즘은 크기 $k$인 그룹에 대해서는 $(k\varepsilon, 0)$만 보장한다는 뜻입니다. 한 사람이 k개의 줄을 함께 바꾸는 상황이면, 그 사람의 실질 보호가 ε이 아니라 **k배인 kε으로 약해집니다**. 비유하자면, 군중 속에 한 번 섞이면 잘 안 보이지만 같은 사람이 화면에 k번 등장하면 그만큼 눈에 더 잘 띄는 것과 같습니다.

NIST도 같은 결론을 카페 데이터로 보여 줍니다. 이벤트 단위에서 한 고객이 632건 중 610건의 거래를 차지하면, 그 고객의 구매량에 관한 두 가설은 더 이상 이웃 데이터셋이 아니므로 차등 프라이버시가 그를 지켜 주지 못합니다[^1]. 한 사람이 여러 줄을 쓰는 순간 행 단위 보호가 깨지는 구체적인 장면입니다.

복구하는 방법은 contribution bounding으로 사용자당 이벤트를 상한 k개로 묶는 것입니다. 다만 공짜가 아닙니다. NIST는 이 변환이 연산의 **민감도**(sensitivity)를 최대 k배로 키우므로, 같은 ε에서 더 많은 노이즈가 필요하다고 명시합니다[^1].

> "Bounding contributions transforms the unit of privacy from the event level to the user level, but it also scales up the sensitivity … by the upper bound k. As a result, user-level guarantees achieved by bounding contributions require more noise for the same value of ε."

쉽게 말하면, 민감도는 데이터에서 한 단위가 바뀌었을 때 결과가 최대 얼마나 출렁이는지의 상한값입니다. 한 사람을 최대 k개 줄까지 허용하면 그 사람이 빠질 때 결과가 최대 k만큼 움직일 수 있으니 민감도가 k배가 되고, 같은 ε을 지키려면 노이즈도 그만큼 더 부어야 합니다. 보호를 사람 단위로 끌어올리는 대가를 노이즈로 치르는 셈입니다.

이 비용은 탁상공론이 아닙니다. Amin, Kulesza, Medina, Vassilvitskii의 ICML 2019 연구는 사용자 단위 차등 프라이버시를 지키려면 사용자당 최대 기여를 반드시 정해 둬야 한다고 정량화합니다[^6].

> "the more data an individual can contribute, the more noise will need to be added to protect them. … limiting users to small contributions keeps noise levels low at the cost of potentially discarding significant amounts of excess data, thus introducing bias."

즉, 기여 상한을 크게 잡으면 보호에 필요한 노이즈가 커지고, 작게 잡으면 노이즈는 줄지만 넘치는 데이터를 잘라내 편향(bias)이 생깁니다. 다시 풀면, 기여 상한 k는 노이즈(분산)와 데이터 손실(편향) 사이를 조절하는 손잡이입니다. 어느 쪽으로 돌려도 대가가 따라옵니다.

## Apple의 이벤트 단위와 일일 리셋은 광고한 ε=4를 누적 16×일수로 벌렸습니다

보호 단위를 잘못 잡았을 때 무슨 일이 벌어지는지 가장 또렷하게 보여 주는 실제 사례가 Apple의 초기 배포입니다.

Apple의 공식 문서는 기능별 per-event ε만 내세웁니다. 이모지 추천(CMS)은 $m=1024$, $k=65{,}536$, $\varepsilon=4$로, Safari 리소스 모니터링(HCMS)은 $m=32{,}768$, $k=1024$, $\varepsilon=4$로 설정했다고 밝혔습니다[^7]. 쉽게 말하면, Apple이 외부에 내건 숫자는 "데이터 한 건당 ε=4"라는 이벤트 단위 값일 뿐이고, 하루에 몇 건을 받는지나 예산을 언제 다시 채우는지는 이 문서에 숫자로 나오지 않습니다.

그런데 Tang, Korolova 등의 분석은 시스템 전체로 보면 그림이 달라진다고 지적합니다. 우선 서버로 보내는 데이터 한 건당 프라이버시 손실은 ε=1 또는 2 수준입니다[^8].

> "the (differential) privacy loss per each datum submitted to its servers is 1 or 2"

즉, 한 건만 떼어 보면 손실이 작아 보입니다. 문제는 하루치를 다 합쳤을 때입니다. 처음 공개된 네 기능(Emojis, New words, Deeplinks, Lookup Hints)을 합치면 **하루 ε이 최대 16까지** 올라갑니다[^8].

> "the overall privacy loss permitted by the system is significantly higher, as high as 16 per day"

쉽게 말하면, 한 건은 작아도 하루를 다 더하면 ε이 16까지 쌓인다는 뜻입니다. 여기에 결정적인 함정이 하나 더 붙습니다. Apple은 프라이버시 예산을 매일 새로 채우기 때문에, 누적 손실은 사용자가 동의한 날부터 지난 **일수의 16배**(= 16 × 일수)로 불어납니다[^8].

> "a possible privacy loss of 16 times the number of days since user opt-in"

즉, "매일 새 예산"이라는 설계는 보호 단위를 "사용자-하루" 수준으로 잡은 것과 같습니다. 날짜가 지날수록 한 사람이 겪는 실질 ε이 한도 없이 쌓입니다. 광고한 per-event ε=4와 평생 누적되는 ε이 이렇게 벌어집니다.

아래 표는 같은 배포를 "어느 단위로 보느냐"에 따라 ε이 어떻게 달라지는지를 정리한 것입니다.

| 보는 단위 | 해당 ε(Apple 사례) | 출처 |
|---|---|---|
| per-event(기능별 광고 값) | ε = 4 | Apple 공식 문서[^7] |
| 제출 1건당 손실 | ε = 1 또는 2 | Tang et al.[^8] |
| 하루 전체(사용자-하루) | ε ≤ 16 | Tang et al.[^8] |
| 동의 이후 누적 | ε ≈ 16 × 일수 | Tang et al.[^8] |

핵심은 표의 맨 윗줄과 맨 아랫줄 사이의 거리입니다. 보호 단위를 "이벤트"나 "하루"로 잡으면 광고 숫자는 작게 유지되지만, 사용자가 실제로 겪는 누적 보호는 시간이 갈수록 무너집니다.

## 행이냐 사용자냐 이벤트냐는 "한 사람이 데이터에 몇 번 나타나는가"로 정합니다

그렇다면 실무에서 단위를 어떻게 골라야 할까요. NIST SP 800-226은 단계가 분명한 절차를 제시합니다[^9].

1. **사용자 단위에서 출발합니다.** 기본값을 일단 "한 사용자"로 잡습니다.
2. **막고 싶은 두 상황을 적습니다.** 적이 구별하려는 두 시나리오를 씁니다. 예를 들어 "X가 라떼를 30잔 미만 샀다" 대 "200잔 넘게 샀다"입니다.
3. **그 두 데이터셋이 고른 단위 기준으로 이웃인지 확인합니다.** 이웃이면 차등 프라이버시 보장이 그 손실에 적용되고, 이웃이 아니면 차등 프라이버시는 그 손실에 대해 아무것도 보장하지 않습니다.

> "If these two datasets are neighbors based on the chosen unit of privacy, then the differential privacy guarantee applies … If they are not, then differential privacy makes no direct guarantee about the privacy loss."

쉽게 말하면, "내가 막고 싶은 두 시나리오가 이 단위 기준으로 딱 한 단위 차이밖에 안 나는가"를 직접 따져 보라는 것입니다. 한 단위 차이가 아니면 그 위협은 차등 프라이버시 우산 밖에 있습니다.

NIST의 기본 권고는 분명합니다. 사용자 단위 보호는 속성 단위·사용자-하루 단위·이벤트 단위보다 강하므로, 가능하면 **최소한 한 명의 개별 사용자만큼 큰 단위**를 쓰라는 것입니다[^9]. 작아 보이는 단위의 위험도 숫자로 경고합니다. 사용자-하루 단위에서 ε=1이라도 1년을 누적하면 총 ε이 365까지 갈 수 있습니다. 앞 절 Apple 사례의 "16×일수" 누적과 정확히 같은 종류의 함정입니다.

이 선택은 추상적인 개념이 아니라 실제 코드 한 줄로 드러납니다. BigQuery의 차등 프라이버시 문서는 privacy unit을 보호 대상 개체로 정의하고, `privacy_unit_column`을 OPTIONS 절에서 지정한다고 설명합니다. 예를 들어 `OPTIONS (epsilon=10, delta=.01, privacy_unit_column=id)`처럼 적습니다[^10]. 즉, "행이냐 사용자냐"라는 결정이 쿼리 한 줄의 컬럼 지정으로 그대로 노출됩니다.

대조 사례로 미국 인구조사국의 2020 Census TopDown Algorithm을 보면, 단위 결정이 얼마나 명시적이어야 하는지가 드러납니다. 이 시스템은 차등 프라이버시를 프라이버시 손실 회계에 사용하면서, 출력으로 **조사된 각 사람당 한 레코드, 각 주거 단위당 한 레코드**를 가진 파일을 만듭니다[^11]. 정부의 대규모 배포가 보호 단위를 사람·주거 단위 수준으로 못박은 사례로, 행 단위·일일 리셋이 만든 실패와 정반대 방향의 결정입니다.

정리하면, privacy unit 선택의 실무 기준은 한 질문으로 압축됩니다. **"막으려는 위협에서 한 사람이 데이터에 몇 번, 어떤 형태로 나타나는가."** 한 번만 나타나면 행·이벤트 단위로도 충분하지만, 여러 번 나타나면 그 횟수만큼 group privacy의 kε이 작동하므로 사용자 단위로 올리고 contribution bounding으로 기여를 묶어야 합니다.

## 참고 문헌

[^1]: Near, J., Darais, D., Lefkovitz, N., Howarth, G. *Guidelines for Evaluating Differential Privacy Guarantees* — NIST SP 800-226, March 2025. §2.1.1 Key Takeaway / §2.4.2 Event Level. <https://csrc.nist.gov/pubs/sp/800/226/final>
[^2]: Google Differential Privacy Team. *differential_privacy.md — Privacy Unit / Contribution Bounding*, google/differential-privacy. <https://github.com/google/differential-privacy/blob/main/differential_privacy.md>
[^3]: Dwork, C., Roth, A. *The Algorithmic Foundations of Differential Privacy*, 2014. Definition 2.4 (§2.3, p.18) / Theorem 2.2 group privacy (§2.3, p.20). <https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf>
[^4]: Near, J., Darais, D., Lefkovitz, N. *NIST SP 800-226*, §1 / Fig. 1 differential privacy pyramid, March 2025. <https://csrc.nist.gov/pubs/sp/800/226/final>
[^5]: Near, J., Darais, D., Lefkovitz, N. *NIST SP 800-226*, §2.4 "The Unit of Privacy" (Event Level / User Level), March 2025. <https://csrc.nist.gov/pubs/sp/800/226/final>
[^6]: Amin, K., Kulesza, A., Medina, A. M., Vassilvitskii, S. *Bounding User Contributions: A Bias-Variance Trade-off in Differential Privacy*, ICML 2019 (Google Research). <https://research.google/pubs/bounding-user-contributions-a-bias-variance-trade-off-in-differential-privacy/>
[^7]: Apple Differential Privacy Team. *Learning with Privacy at Scale*, Apple Machine Learning Research, 2017. <https://machinelearning.apple.com/research/learning-with-privacy-at-scale>
[^8]: Tang, J., Korolova, A., Bai, X., Wang, X., Wang, X. *Privacy Loss in Apple's Implementation of Differential Privacy on MacOS 10.12*, arXiv:1709.02753, 2017. <https://arxiv.org/abs/1709.02753>
[^9]: Near, J., Darais, D., Lefkovitz, N. *NIST SP 800-226*, §2.4.2 "Evaluating the Unit of Privacy" / Key Takeaway, March 2025. <https://csrc.nist.gov/pubs/sp/800/226/final>
[^10]: Google Cloud. *Use differential privacy* — BigQuery DP documentation. <https://docs.cloud.google.com/bigquery/docs/differential-privacy>
[^11]: Abowd, J. M. et al. *The 2020 Census Disclosure Avoidance System TopDown Algorithm*, arXiv:2204.08986 (Census WP CED-WP-2022-002), 2022. <https://arxiv.org/abs/2204.08986>
