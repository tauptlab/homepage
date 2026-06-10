---
title: "DP 카운트 쿼리의 음수 출력: Laplace 메커니즘 원리와 clip-to-zero 편향"
description: "차등 프라이버시 Laplace 메커니즘이 카운트 쿼리에서 음수를 만드는 수학적 원인과, 0으로 자를 때 발생하는 통계적 편향을 정리합니다."
date: "2026-06-09"
category: "Technology"
author: "정현진(Hyunjin Jeong)"
thumbnail: "/images/blog/dp-count-query-negative-output.png"
tags: ["differential-privacy", "laplace-mechanism", "post-processing", "data-privacy"]
---

## 음수 카운트는 버그가 아니라 정상 출력입니다

(가상 시나리오) 헬스케어 데이터 분석 팀이 DP 라이브러리를 처음 도입하고 첫 쿼리를 실행했다고 가정해 봅니다.

질문은 단순합니다. "이 병원에서 작년에 당뇨 진단을 받은 환자 수."

그런데 ε=0.1로 카운트를 뽑았더니 화면에 `-3.7`이 출력됐습니다. 환자 수가 음수라는 결과는 어디서 부호가 꼬인 것처럼 보입니다.

> **TL;DR**
>
> Laplace 메커니즘은 정의상 음수 출력을 만들 수 있습니다. `max(0, x)` 같은 clip-to-zero는 ε 보장을 깨지 않지만(post-processing 정리), 비음수 강제 자체가 양의 편향(positive bias)을 만들어 누적됩니다. 단순 BI 표시에는 clip-to-zero를 써도 되지만, 합·비율 통계에는 consistency post-processing 같은 더 정교한 후처리가 필요합니다.

결론부터 정리하면, 이 결과는 버그가 아닙니다.

NIST 공식 용어집은 Laplace 메커니즘을 "쿼리 결과에 Laplace 분포에서 표집한 무작위 노이즈를 더하는 차등 프라이버시 algorithmic primitive"라고 정의합니다[^1]. 정의 어디에도 "출력이 비음수여야 한다"는 제약은 없습니다.

peer-reviewed DP 연구도 같은 사실을 명시합니다. Holohan 외(IBM Research)의 논문은 "Laplace 메커니즘은 무한한 정의역 때문에 음수 카운트 같은 의미상 불가능한 값을 반환할 수 있다"고 직접 언급합니다[^2].

산업 표준 라이브러리도 이 동작을 그대로 유지합니다. OpenDP의 `make_laplace`는 "Laplace(scale) 분포에서 뽑은 노이즈를 입력에 더하는 Measurement를 만든다"고만 명시하며 비음수 제약은 어디에도 없습니다[^3].

즉, 음수 출력은 라이브러리의 결함이 아니라 분포의 정의가 만들어내는 정상 산출물입니다. `-3.7`이라는 결과를 보고 가장 먼저 해야 할 일은 "어떻게 0으로 바꿀까"가 아니라 "왜 이 결과가 정상인지" 이해하는 일입니다.

## Laplace 분포가 음수를 만드는 수학적 원인

Laplace 메커니즘이 더하는 노이즈는 평균이 0, 스케일이 $b$인 Laplace 분포에서 추출됩니다.

확률밀도함수는 다음과 같습니다.

$$\mathrm{Lap}(x \mid b) = \frac{1}{2b} e^{-|x|/b}$$

쉽게 말하면, 0을 정점으로 좌우 대칭으로 떨어지는 종 모양이지만 가우시안보다 꼬리가 두껍습니다.

핵심은 이 분포의 정의역이 $(-\infty, +\infty)$ 라는 점입니다[^4]. 어떤 음수 값에도 0이 아닌 확률 밀도가 부여됩니다.

스케일 $b$는 $b = \Delta f / \varepsilon$ 로 정해집니다.

- $\Delta f$: 민감도. 데이터 한 명이 바뀌었을 때 결과가 최대 얼마나 변하는지의 상한.
- $\varepsilon$: 프라이버시 예산. 작을수록 강한 보호.

단순 카운트 쿼리는 $\Delta f = 1$ 이므로 $b = 1/\varepsilon$ 입니다. ε이 작을수록(=강한 프라이버시) 스케일이 커지면서 노이즈가 거칠어집니다[^4].

또 한 가지 중요한 성질이 있습니다. $|x|$가 들어간 지수 형태 때문에 분포는 0을 중심으로 완벽히 대칭입니다.

따라서 노이즈 $Z$ 자체가 음수일 확률은 정확히 0.5입니다. 참 카운트 $c$가 0이라면 출력 $c + Z$가 음수일 확률도 0.5입니다. $c$가 작을수록(0~5 정도) 음수 출력 확률은 빠르게 50%에 가까워집니다.

작은 카운트에서 음수가 흔하게 나오는 것은 직관에 어긋나 보이지만, 사실 분포 모양 자체가 만드는 필연적인 결과입니다.

> **용어 풀이**
> - **민감도(Δf, sensitivity)**: 데이터셋에서 한 사람이 추가/제거됐을 때 쿼리 결과가 최대 얼마나 달라질 수 있는지의 상한. 단순 카운트는 1입니다.
> - **ε(엡실론)**: 프라이버시 보호 강도. 작을수록 강하게 보호하며, 그만큼 노이즈가 커집니다.

## ε별 음수 발생 확률 — 워크드 예제

추상적인 설명은 이쯤 하고, 실제 숫자로 감을 잡아 봅니다.

Laplace 분포의 대칭성과 PDF에서 닫힌 형태가 나옵니다. $Y \sim \mathrm{Lap}(0, b)$ 일 때 양수 $t$에 대해

$$P(Y \leq -t) = \frac{1}{2} e^{-t/b}$$

참 카운트 5가 음수로 출력되려면 노이즈가 -5 이하로 떨어져야 합니다. $t = 5$를 대입하고, 카운트 쿼리는 $b = 1/\varepsilon$ 이므로 다음 표가 나옵니다.

| ε | b = 1/ε | P(noise ≤ -5) | 결과가 음수일 빈도 |
|---|---|---|---|
| 1.0 | 1 | 0.5 · exp(-5) ≈ 0.337% | 300번에 1번 |
| 0.5 | 2 | 0.5 · exp(-2.5) ≈ 4.10% | 25번에 1번 |
| 0.1 | 10 | 0.5 · exp(-0.5) ≈ 30.3% | 3번에 1번 |

ε=0.1에서는 참 카운트가 5인데 결과가 음수일 확률이 30%입니다. 한 자릿수 카운트를 강한 프라이버시로 보호하려고 하면, 결과의 1/3이 음수로 나옵니다.

ε=0.5만 돼도 4% 정도로 떨어지지만, 여전히 25번에 한 번은 음수가 보입니다.

실제 라이브러리에서도 이 동작이 그대로 재현됩니다.

OpenDP의 typical-workflow 튜토리얼은 `context.query().count().laplace()`로 카운트를 뽑는 예제를 보여주며, 출력 요약에 `scale = 3.0`, `accuracy = 9.44`가 찍혀 있습니다[^5]. 스케일 3은 민감도 1, $\varepsilon \approx 1/3$에 해당합니다. 이 수준이면 위 표의 ε=0.5와 ε=0.1 사이라서 음수 발생 확률이 한 자릿수 후반%까지 충분히 갑니다.

Google의 오픈소스 DP 라이브러리도 마찬가지입니다.

C++ Count 알고리즘 헤더(`cc/algorithms/count.h`)를 열어 보면 `int64_t countWithNoise = mechanism_->AddNoise(count_);` 한 줄로 노이즈를 더하고 그 결과를 그대로 반환합니다. `std::max(0, …)` 같은 클리핑은 어디에도 없습니다[^6].

산업 표준 구현 자체가 음수 출력을 정상으로 취급합니다.

## clip-to-zero가 ε을 깨지 않는 이유 — post-processing 정리

음수가 정상 산출물이라는 사실은 확인했습니다. 그러나 환자 수가 -3.7이라는 결과를 그대로 BI 대시보드에 띄울 수는 없습니다.

가장 자연스러운 해결책은 `max(0, x)`로 음수를 0으로 자르는 방법입니다. 이를 흔히 **clip-to-zero**, 또는 **boundary-inflated truncation(BIT)** 이라고 부릅니다.

여기서 중요한 사실 하나. 이 clipping은 ε 보장을 깨지 않습니다.

그 근거가 바로 **post-processing immunity 정리**입니다. OpenDP 공식 이론 문서는 이 성질을 이렇게 형식화합니다.

> "임의의 함수 $f$에 대해 $D(M(u), M(v)) \geq D(f(M(u)), f(M(v)))$ — 출시 결과에 후속 계산을 아무리 적용해도 두 분포를 구분하기는 더 쉬워지지 않는다."[^7]

쉽게 말하면, DP 메커니즘 $M$이 만들어낸 출력에 데이터에 의존하지 않는 함수를 추가로 적용해도 프라이버시 손실은 누적되지 않습니다.

$\max(0, x)$는 입력 $x$만 보고 결정되는 결정적 함수입니다. 원본 데이터를 다시 들여다보지 않으므로 위 조건을 정확히 만족합니다. 결과적으로 ε는 그대로 유지됩니다.

호출자가 별도로 비음수 처리를 하면 그때부터는 post-processing 영역으로 넘어가는 셈입니다. 메커니즘 단계와 후처리 단계가 깔끔하게 분리되는 구조입니다.

다만 "공짜"라는 표현은 어디까지나 **프라이버시 보장**에 한정된 이야기입니다. ε 예산을 더 쓰지 않는다는 의미일 뿐, 통계적으로도 공짜라는 의미는 아닙니다.

peer-reviewed 정리 중에는 이 이중성을 한 편의 논문 안에서 형식적으로 다룬 결과도 있습니다 — "프라이버시 측면 공짜, 통계 측면 비-공짜"라는 두 측면이 같은 정리(theorem) 안에서 동시에 보장된다는 사실입니다[^9].

## clipping이 만드는 양의 편향과 실무 권장 후처리

clip-to-zero를 적용하면 무슨 일이 벌어지는지 직관부터 정리합니다.

원래 노이즈는 평균 0인 대칭 분포라서 양수 오차와 음수 오차가 평균적으로 상쇄됩니다. 그런데 음수 쪽을 잘라서 0으로 밀어 버리면, 음의 오차는 사라지고 양의 오차만 남습니다.

결과의 기댓값이 위로 들려 올라갑니다. 이를 **양의 편향(positive bias)** 이라고 부릅니다.

이는 정성적 직관에 그치는 이야기가 아닙니다.

McGlinchey & Mason(2021)은 "Laplace 메커니즘에 비음수 쿼리에 대한 BIT(즉 clip-to-zero)나 truncation을 적용하면 **엄격하게 양의 편향**이 생긴다"는 사실을 peer-reviewed 결과로 보였습니다[^9].

더 일반적으로는 단순 clipping에만 국한되는 문제가 아닙니다. 같은 논문은 "Laplace 출력에 적용되는 모든 제곱 가적분 post-processing 함수가 엄격하게 양의 최대 절댓값 편향을 만든다"는 정리도 보였습니다[^9].

어떤 우회로를 쓰더라도 **비음수 강제** 자체가 편향을 만든다는 의미입니다.

작은 카운트가 많을수록 이 편향이 누적됩니다. 수십~수백 개 카운트의 합이나 비율을 구해야 하는 상황(지역별 환자 수 합계, 진단명별 비율 등)에서 한 카운트당 작은 편향이 모이면 전체 통계가 위로 들립니다.

ε이 작을수록 음수 발생 확률이 높아지므로 clipping이 더 자주 발동되고, 편향도 함께 커지는 악순환이 따라옵니다.

실무에서는 단순 clip-to-zero 대신 다른 후처리를 권하는 경우가 많습니다.

Hay, Rastogi, Miklau, Suciu의 VLDB 2010 논문은 단순 noisy 히스토그램 대신 "비음수 + 부모-자식 합 일관성" 같은 제약을 만족하는 사후 추정을 쓰면 같은 ε에서 정확도가 크게 향상된다는 점을 보였습니다[^10]. clip-to-zero보다 우월한 후처리의 원형으로 볼 수 있습니다.

대규모 사례로는 2020 미국 인구조사의 **TopDown 알고리즘**이 대표적입니다.

Census Bureau는 노이즈 측정치를 그대로 공개하지 않고, 비음수·정수·계층 합일관성 제약을 강제하는 대규모 최적화 후처리를 적용했습니다. 그런데 외부 평가에서 "이 후처리가 작은 인구 지역에서 체계적 양의 편향을, 주 인구 합이 invariant로 고정돼 있어 큰 지역에서는 반대로 음의 편향을 만든다"는 사실이 확인됐습니다[^11].

비음수 강제는 어떤 형태로 하든 통계적 대가가 따라온다는 점을 산업 규모에서 보여 주는 사례입니다.

### 실무 권장 의사결정 흐름

정리하면 다음 흐름을 권장합니다.

1. **사전 추정**: ε, 민감도, 다루는 카운트 크기를 함께 보고 음수 발생 빈도를 미리 추정합니다. 위의 $P(Y \leq -t) = \frac{1}{2} e^{-t/b}$ 식이 이때 쓰입니다.
2. **단순 표시**: BI 대시보드처럼 부호만 정상화해도 되는 위치라면 `max(0, x)`로 충분합니다.
3. **합·비율 통계**: 편향이 누적되는 합·비율 계산에는 `max(0, x)`를 쓰지 않습니다. consistency post-processing, hierarchical constraint 같은 더 정교한 방법을 사용합니다.
4. **ε 재조정**: ε을 키울 여유가 있다면 키우는 쪽도 정직한 해법입니다. 음수 발생 확률 자체가 줄어듭니다.

가장 위험한 선택은 "음수가 나왔으니 그냥 잘라 버린다"입니다. ε는 안전해 보여도 통계가 조용히 망가져 있을 수 있습니다.

## 참고 문헌

[^1]: NIST Computer Security Resource Center, Glossary entry "Laplace mechanism" (source: NIST SP 800-226), 2025. <https://csrc.nist.gov/glossary/term/laplace_mechanism>

[^2]: Holohan, Antonatos, Braghin, Mac Aonghusa, "The Bounded Laplace Mechanism in Differential Privacy," arXiv:1808.10410, 2018. <https://arxiv.org/abs/1808.10410>

[^3]: OpenDP Library, `opendp.measurements.make_laplace` API reference (Harvard/MIT/Microsoft OpenDP Project). <https://docs.opendp.org/en/stable/api/python/opendp.measurements.html>

[^4]: Pejó & Desfontaines (eds.), "Differential Privacy Overview and Fundamental Techniques," arXiv:2411.04710, §4.3. <https://arxiv.org/html/2411.04710v1>

[^5]: OpenDP "Typical workflow" getting-started guide — count query example. <https://docs.opendp.org/en/stable/getting-started/typical-workflow.html>

[^6]: google/differential-privacy GitHub — `cc/algorithms/count.h` (Count algorithm header). <https://github.com/google/differential-privacy/blob/main/cc/algorithms/count.h>

[^7]: OpenDP Documentation, "A Framework to Understand DP" — Distance Between Distributions / Divergence section. <https://docs.opendp.org/en/stable/theory/a-framework-to-understand-dp.html>

[^9]: McGlinchey & Mason, "Observations on the Bias of Nonnegative Mechanisms for Differential Privacy," AIMS Foundations of Data Science, 2020 / arXiv:2101.02957. <https://arxiv.org/abs/2101.02957>

[^10]: Hay, Rastogi, Miklau, Suciu, "Boosting the Accuracy of Differentially-Private Histograms Through Consistency," VLDB 2010 / arXiv:0904.0942. <https://arxiv.org/abs/0904.0942>

[^11]: Kenny, Kuriwaki, McCartan, Rosenman, Simko, Imai, "Evaluating Bias and Noise Induced by the U.S. Census Bureau's Privacy Protection Methods," Science Advances, 2024 / arXiv:2306.07521. <https://arxiv.org/abs/2306.07521v2>
