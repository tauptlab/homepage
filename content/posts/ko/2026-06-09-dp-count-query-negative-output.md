---
title: "DP 카운트 쿼리에서 -3이 나왔는데, 이거 그냥 0으로 바꿔도 될까요?"
description: "Laplace 노이즈가 카운트를 음수로 만드는 수학적 이유와 0으로 자를 때 생기는 통계적 부작용을 정리했어요."
date: "2026-06-09"
category: "Technology"
author: "정현진(Hyunjin Jeong)"
thumbnail: "/images/blog/dp-count-query-negative-output.png"
tags: ["differential-privacy", "laplace-mechanism", "post-processing", "data-privacy"]
---

## "이 병원 당뇨 환자 수가 -3.7명이라고요?"

(가상 시나리오) 어느 헬스케어 데이터 분석 팀이 DP 라이브러리를 처음 도입하고 첫 쿼리를 돌렸다고 해보죠. 질문은 단순해요. "이 병원에서 작년에 당뇨 진단을 받은 환자 수." 그런데 ε=0.1로 카운트를 뽑았더니 화면에 `-3.7`이 떠요. 환자 수가 마이너스라니, 어디서 부호가 꼬인 걸까 의심하게 되죠.

먼저 결론부터 말씀드리면, 이건 버그가 아니에요. NIST 공식 용어집은 Laplace 메커니즘을 "쿼리 결과에 Laplace 분포에서 표집한 무작위 노이즈를 더하는 차등 프라이버시 algorithmic primitive"라고 정의해요[^1]. 정의 어디에도 "출력이 비음수여야 한다"는 제약이 없어요. 출력 부호는 메커니즘의 약속에 들어 있지 않은 거죠.

peer-reviewed DP 연구도 같은 사실을 명시적으로 적어두고 있어요. Holohan 외(IBM Research)의 논문은 "Laplace 메커니즘은 무한한 정의역 때문에 음수 카운트 같은 의미상 불가능한 값을 반환할 수 있다"고 직접 언급해요[^2]. 즉, 음수 출력은 라이브러리의 결함이 아니라 분포의 정의가 만들어내는 정상 산출물이에요.

심지어 산업 표준 라이브러리도 이 동작을 그대로 인정해요. OpenDP의 `make_laplace`는 "Laplace(scale) 분포에서 뽑은 노이즈를 입력에 더하는 Measurement를 만든다"고만 명시돼 있고, 비음수 제약은 어디에도 없어요[^3]. 그러니 -3.7이라는 결과를 보고 가장 먼저 해야 할 일은 "어떻게 0으로 바꿀까"가 아니라 "왜 이런 결과가 정상인지" 이해하는 것부터예요.

## Laplace 분포가 음수를 만들 수밖에 없는 이유

Laplace 메커니즘이 쓰는 노이즈는 평균이 0이고 스케일이 $b$인 Laplace 분포에서 추출돼요. 확률밀도는 이렇게 생겼어요.

$$\mathrm{Lap}(x \mid b) = \frac{1}{2b} e^{-|x|/b}$$

쉽게 말하면, 0을 정점으로 좌우 대칭으로 떨어지는 종 모양인데 가우시안보다 꼬리가 두꺼워요. 그리고 핵심은 이 분포의 정의역이 $(-\infty, +\infty)$ 라는 거예요[^4]. 어떤 음수 값도 0이 아닌 확률 밀도를 갖고 있어요.

여기서 스케일 $b$는 $\Delta f / \varepsilon$ 로 정해져요. $\Delta f$는 민감도(데이터 한 명이 바뀌었을 때 결과가 최대 얼마나 변하는지), $\varepsilon$은 프라이버시 예산이에요. 카운트 쿼리는 $\Delta f = 1$ 이니까 $b = 1/\varepsilon$ 이고요. ε이 작을수록(=강한 프라이버시) 스케일이 커지면서 노이즈가 거칠어져요[^4].

또 한 가지, $|x|$로 표현된 지수 부분 때문에 분포가 0을 중심으로 완벽히 대칭이에요. 그러니까 노이즈 $Z$ 자체가 음수일 확률은 정확히 0.5예요. 참 카운트 $c$가 0이라면 출력 $c + Z$가 음수일 확률도 0.5. $c$가 작을수록(0~5 정도) 음수 출력 확률이 빠르게 50%에 다가가요. 작은 카운트를 다룰 때 음수가 흔하게 나오는 게 직관에 어긋나 보이지만, 사실 분포 모양이 그렇게 생겨서 어쩔 수 없는 결과예요.

> **용어 풀이**
> - **민감도(Δf, sensitivity)**: 데이터셋에서 한 사람이 추가/제거됐을 때 쿼리 결과가 최대로 달라질 수 있는 양. 단순 카운트면 1이에요.
> - **ε(엡실론)**: 프라이버시 보호 강도. 작을수록 강하게 보호하고, 그만큼 노이즈가 커져요.

## 숫자로 직접 보는 음수 발생 확률

추상적인 이야기는 이쯤 하고, 실제 숫자를 넣어볼게요. 참 카운트가 5이고 ε에 따라 음수가 얼마나 자주 나오는지 계산해보면 감이 잡혀요.

Laplace 분포의 대칭성과 PDF로부터 닫힌 형태가 나와요. $Y \sim \mathrm{Lap}(0, b)$ 일 때 양수 $t$에 대해

$$P(Y \leq -t) = \frac{1}{2} e^{-t/b}$$

참 카운트 5가 음수가 되려면 노이즈가 -5 이하로 떨어져야 하니까, $t = 5$를 대입하면 되죠. 카운트 쿼리는 $b = 1/\varepsilon$ 이므로 다음 표가 나와요.

| ε | b = 1/ε | P(noise ≤ -5) | 결과가 음수일 대략적 빈도 |
|---|---|---|---|
| 1.0 | 1 | 0.5 · exp(-5) ≈ 0.337% | 300번에 1번 |
| 0.5 | 2 | 0.5 · exp(-2.5) ≈ 4.10% | 25번에 1번 |
| 0.1 | 10 | 0.5 · exp(-0.5) ≈ 30.3% | 3번에 1번 |

ε=0.1에서는 참 카운트가 5인데 결과가 음수일 확률이 30%에 달해요. 한 자릿수 카운트를 강한 프라이버시로 보호하려고 하면, 결과의 1/3이 음수로 나온다는 뜻이에요. ε=0.5만 돼도 4% 정도로 떨어지지만, 여전히 25번에 한 번은 음수가 보여요.

실제 라이브러리에서도 이게 그대로 재현돼요. OpenDP의 typical-workflow 튜토리얼은 `context.query().count().laplace()`로 카운트를 뽑는 예제를 보여주는데, 출력 요약에 `scale = 3.0`, `accuracy = 9.44`가 찍혀요[^5]. 스케일 3은 $\varepsilon \approx 1/3$, 민감도 1에 해당하고요. 이런 ε 수준에서는 위 표의 ε=0.5와 ε=0.1 사이라서 음수 발생 확률이 한 자릿수 후반%까지 충분히 가요.

Google의 오픈소스 DP 라이브러리도 마찬가지예요. C++ Count 알고리즘 헤더(`cc/algorithms/count.h`)를 열어보면 `int64_t countWithNoise = mechanism_->AddNoise(count_);` 한 줄로 노이즈를 더하고 그 결과를 그대로 반환해요. `std::max(0, …)` 같은 클리핑은 어디에도 없고요[^6]. 산업 표준 구현 자체가 음수 출력을 정상으로 취급하는 거예요.

## 0으로 자르는 게 왜 "프라이버시 측면에선 공짜"인가

자, 그럼 음수가 정상 산출물이라는 건 알겠어요. 그런데 환자 수가 -3.7이라는 결과를 그대로 BI 대시보드에 띄울 수는 없잖아요. 자연스러운 욕구는 `max(0, x)`로 음수를 0으로 자르는 거예요. 이걸 흔히 clip-to-zero, 혹은 boundary-inflated truncation(BIT)라고 불러요.

여기서 중요한 사실 하나. 이 clipping은 ε 보장을 깨지 않아요. 그 근거가 바로 post-processing immunity 정리예요. OpenDP 공식 이론 문서는 이 성질을 이렇게 형식화해요. "임의의 함수 $f$에 대해 $D(M(u), M(v)) \geq D(f(M(u)), f(M(v)))$ — 출시 결과에 후속 계산을 아무리 적용해도 두 분포를 구분하기는 더 쉬워지지 않는다"[^7].

쉽게 말하면, DP 메커니즘 $M$이 만들어낸 출력에 데이터에 의존하지 않는 함수를 한 번 더 씌워도 프라이버시 손실은 추가되지 않아요. $\max(0, x)$는 입력 $x$만 보고 결정되는 결정적 함수이고, 원본 데이터를 다시 들여다보지 않으니까 이 조건을 정확히 만족해요. 그러니 ε는 그대로 유지돼요. 호출자가 별도로 비음수 처리를 하면 그때부터는 post-processing 영역으로 넘어가는 거예요 — 메커니즘 단계와 후처리 단계가 깔끔하게 분리돼 있는 셈이에요.

다만 "공짜"라는 말은 어디까지나 프라이버시 보장 한정이에요. ε 예산을 더 쓰지 않는다는 의미일 뿐, 통계적으로도 공짜라는 뜻은 절대 아니에요. 그리고 사실 이 차이가 다음 절의 핵심이기도 해요. peer-reviewed 정리 중에는 이 이중성을 한 편의 논문 안에서 형식적으로 다루는 결과도 있어요 — "프라이버시 측면 공짜, 통계 측면 비-공짜"라는 두 측면이 같은 한 편의 정리(theorem)로 동시에 보장된다는 사실이요[^9].

## 그런데 통계는 망가져요 — clipping이 만드는 편향

clip-to-zero를 적용하면 무슨 일이 벌어지는지 생각해보면 직관적이에요. 원래 노이즈는 평균 0인 대칭 분포라서 양수 오차와 음수 오차가 평균적으로 상쇄돼요. 그런데 음수 쪽을 잘라서 0으로 밀어버리면, 음의 오차는 사라지고 양의 오차만 남아요. 결과의 기댓값이 위로 들려 올라가는 거예요.

이게 정성적 직관에 그치는 이야기가 아니에요. McGlinchey & Mason(2021)은 "Laplace 메커니즘에 비음수 쿼리에 대한 BIT(즉 clip-to-zero)나 truncation을 적용하면 *엄격하게 양의 편향*이 생긴다"는 사실을 peer-reviewed 결과로 보였어요[^9]. 게다가 이는 단순 clipping에만 국한되는 문제가 아니에요. 같은 논문은 "Laplace 출력에 적용되는 모든 제곱 가적분 post-processing 함수가 엄격하게 양의 최대 절댓값 편향을 만든다"는 더 일반적 정리도 보였어요[^9]. 어떤 우회로를 쓰든 비음수 강제 자체가 편향을 만든다는 뜻이에요.

작은 카운트가 많을수록 이 편향이 누적돼요. 수십~수백 개 카운트의 합이나 비율을 구해야 하는 상황(예: 지역별 환자 수의 전체 합, 진단명별 비율 등)에서 한 카운트당 작은 편향이 모이면 전체 통계가 위로 들려요. ε이 작을수록 음수 발생 확률이 높아지니까 clipping이 더 자주 발동되고, 편향도 더 커지는 악순환이 따라와요.

그래서 실무에서는 단순 clip-to-zero 대신 다른 후처리를 권하는 경우가 많아요. Hay, Rastogi, Miklau, Suciu의 VLDB 2010 논문은 단순 noisy 히스토그램 대신 "비음수 + 부모-자식 합 일관성" 같은 제약을 만족하는 사후 추정을 쓰면 같은 ε에서 정확도가 크게 향상된다는 걸 보였어요[^10]. clip-to-zero보다 우월한 후처리의 원형이라고 보시면 돼요.

대규모 사례로는 2020 미국 인구조사의 TopDown 알고리즘이 대표적이에요. Census Bureau는 노이즈 측정치를 그대로 공개하지 않고, 비음수·정수·계층 합일관성 제약을 강제하는 대규모 최적화 후처리를 적용했어요. 그런데 외부 평가에서 "이 후처리가 작은 인구 지역에서 체계적 양의 편향을, 주 인구 합이 invariant로 고정돼 있어 큰 지역에서는 반대로 음의 편향을 만든다"는 사실이 확인됐어요[^11]. 비음수 강제는 어떤 형태로 하든 통계적 대가가 따라온다는 점을 산업 규모에서 보여주는 사례예요.

그래서 실무 권장 흐름을 정리하면 대략 이런 모양이에요. 첫째, ε과 민감도, 그리고 다루는 카운트 크기를 함께 고려해서 음수 발생 빈도를 미리 추정해보세요(위의 P(Y≤-t) 식이 이때 쓰여요). 둘째, 단순 BI 대시보드 표시처럼 부호만 정상화해도 되는 곳이면 max(0, x)로 충분하지만 편향이 누적되는 합/비율 계산에는 쓰지 마세요. 셋째, 합 일관성이나 히스토그램 전체 정확도가 중요하면 consistency post-processing 같은 더 정교한 방법을 쓰세요. 넷째, ε을 키울 여유가 있으면 늘리는 것도 정직한 해법이에요 — 음수 발생 확률 자체가 줄어드니까요. 무엇보다 "음수가 나왔으니 그냥 잘라버리자"가 가장 위험한 선택이에요. ε는 안전해 보여도 통계가 조용히 망가져 있을 수 있거든요.

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
