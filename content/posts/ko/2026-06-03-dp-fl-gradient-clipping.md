---
title: "연합학습 DP-SGD에서 그래디언트 클리핑은 민감도를 정하는 장치입니다"
description: "L2 norm clipping이 client update의 sensitivity를 정해 ε 보장의 전제를 만드는 원리와, threshold C가 노이즈·정확도 사이에서 만드는 trade-off를 짚습니다."
date: "2026-06-03"
category: "Technology"
author: "정현진(Hyunjin Jeong)"
thumbnail: "/images/blog/dp-fl-gradient-clipping.png"
tags: ["차등 프라이버시", "연합학습", "그래디언트 클리핑", "DP-SGD", "민감도"]
---

# 연합학습 DP-SGD에서 그래디언트 클리핑은 민감도를 정하는 장치입니다

> **TL;DR**: federated DP-SGD에서 gradient clipping은 정확도를 지키는 트릭이 아니라, 한 client의 update가 결과에 미칠 수 있는 최대 영향(=sensitivity)을 threshold C로 못 박는 장치입니다. C는 sensitivity가 되어 노이즈 크기 $\sigma = zC$를 결정하므로, C를 너무 작게 잡으면 정보가 잘려 정확도가 무너지고 너무 크게 잡으면 노이즈가 커져 학습이 안 됩니다. Andrew et al. 2021의 adaptive clipping은 C를 update norm 분포의 median에 맞춰 이 둘 사이를 자동으로 잡아 줍니다.

federated 학습에서 노이즈를 줄이려고 clipping threshold를 무작정 키웠더니, 같은 라운드에서 더해지는 Gaussian 노이즈의 표준편차가 $\sigma = zC$를 따라 함께 커져 정확도가 오히려 떨어지는 일이 흔합니다. Abadi et al. 2016의 MNIST 실험만 봐도 clipping norm을 $C=4$로 고정한 채 노이즈 배수만 $\sigma=2$에서 $\sigma=8$로 키우면 정확도가 97%에서 90%로 내려갑니다.[^1] 여기서 clipping은 노이즈를 줄이는 손잡이가 아니라, **per-client update의 sensitivity를 C로 못 박는 장치**입니다. 이 사실을 놓치면 threshold C를 왜 그 값으로 잡아야 하는지, 그리고 federated 환경에서 clip이 per-example이 아니라 per-client로 바뀌면 ε 보장이 정확히 무엇을 지키는지가 끝까지 헷갈립니다.

## gradient clipping은 정확도 보호가 아니라 sensitivity를 만드는 장치입니다

DP-SGD에서 clipping의 목적은 정확도 보호가 아닙니다. 각 example(또는 client)이 그래디언트에 미치는 영향을 한정해 차등 프라이버시 증명의 전제를 세우기 위한 장치입니다. Abadi et al.은 그 이유를 이렇게 적습니다.

> "Since there is no a priori bound on the size of the gradients, we clip each gradient in ℓ₂ norm."[^1]

쉽게 말하면, 그래디언트의 길이에는 미리 정해진 상한이 없습니다. 어떤 한 데이터가 비정상적으로 크면 그 영향도 무한정 커질 수 있습니다. 그래서 길이를 강제로 잘라 "한 사람이 결과를 최대 이만큼만 흔들 수 있다"는 상한을 사람 손으로 만들어 줍니다.

여기서 핵심 용어가 **민감도**(sensitivity)입니다. 민감도는 데이터에서 한 단위(한 사람 또는 한 client)가 바뀌었을 때 쿼리 결과가 최대 얼마나 달라질 수 있는지의 상한값입니다. 비유하자면, "한 명이 빠지거나 들어왔을 때 답이 얼마나 출렁이는가"의 최댓값입니다. 출렁임의 크기를 모르면 노이즈를 얼마나 섞어야 할지 정할 수 없으므로, DP는 민감도가 유한해야만 동작합니다.

clipping은 그래디언트 $g$를 다음처럼 치환합니다.

$$\bar{g} \leftarrow g \,/\, \max\!\left(1,\ \frac{\lVert g \rVert_2}{C}\right)$$

쉽게 말하면, 그래디언트의 길이가 $C$ 이하면 그대로 두고, $C$를 넘으면 길이가 정확히 $C$가 되도록 줄입니다. 여기서 $\lVert g \rVert_2$는 벡터의 길이(L2 norm), $C$는 우리가 정하는 상한선(clipping threshold)입니다. **L2 norm clipping**(L2 노름 클리핑)은 이렇게 벡터의 유클리드 길이를 $C$ 이하로 깎아 내는 연산입니다.

이렇게 길이를 $C$로 묶고 나면, clip된 그래디언트들의 합에 Gaussian 노이즈를 더합니다. 더해지는 노이즈의 공분산이 $\sigma^2 C^2 \mathbf{I}$ 형태라는 점이 결정적입니다.[^1]

$$\tilde{g}_t \leftarrow \frac{1}{L}\!\left(\sum_i \bar{g}_t(x_i) + \mathcal{N}(0,\ \sigma^2 C^2 \mathbf{I})\right)$$

쉽게 말하면, 노이즈의 표준편차가 clipping threshold $C$에 그대로 비례합니다. **Gaussian mechanism**(가우시안 메커니즘)은 결과에 정규분포 노이즈를 더해 프라이버시를 보장하는 부품인데, 더할 노이즈의 양은 민감도에 맞춰 정해집니다. 즉 clip이 sensitivity를 $C$로 정하면, 그 $C$ 위에 Gaussian mechanism이 얹혀 노이즈가 $C$만큼 따라 커지는 구조입니다. clipping은 노이즈를 줄이는 손잡이가 아니라, 노이즈의 기준점을 만드는 자입니다.

## federated로 넘어가면 보호 단위가 example에서 client로 바뀝니다

central DP-SGD는 한 example을 보호 단위로 삼습니다. 그런데 federated 환경에서는 인접 데이터셋의 정의 자체가 달라집니다.

> "d and d′ are adjacent if d′ can be formed by adding or removing all of the examples associated with a single user from d."[^2]

쉽게 말하면, "데이터 하나가 바뀌었다"가 아니라 "한 사용자에게 딸린 모든 데이터가 통째로 들어오거나 빠졌다"를 한 단위로 봅니다. 한 사람이 스마트폰에 가진 수천 개의 타이핑 기록 전체가 하나의 보호 단위입니다. 이것이 **user-level DP**(사용자 단위 차등 프라이버시)입니다. user-level DP는 특정 사용자의 데이터가 학습셋에 있든 없든 모델 파라미터 분포가 사실상 구별되지 않도록 보장하는 차등 프라이버시입니다.

보호 단위가 바뀌면 clip을 거는 위치도 바뀝니다. federated에서는 per-example이 아니라 각 client의 전체 update 벡터 $\Delta$에 clip을 겁니다.

$$\pi(\Delta, S) = \Delta \cdot \min\!\left(1,\ \frac{S}{\lVert \Delta \rVert}\right)$$

쉽게 말하면, 한 client가 로컬에서 여러 번 학습해 만든 update 전체의 길이를 $S$ 이하로 깎습니다. 여기서 $S$는 client update에 거는 clipping bound이고, central DP-SGD의 $C$와 같은 역할입니다. 한 사람이 회의에서 아무리 길게 말해도 발언 시간을 정해진 분량으로 잘라 내는 것과 같습니다.

그 결과 sensitivity가 client 단위로 정의됩니다. McMahan et al.의 Lemma 1은, 모든 사용자 $k$에 대해 가중된 update의 norm $\lVert w_k \Delta_k \rVert_2$가 $S$ 이하이면 추정량의 sensitivity가 $S/qW$로 위에서 묶인다는 것을 보입니다.[^2]

쉽게 말하면, client update에 건 clip threshold $S$가 곧 user-level sensitivity가 됩니다. 한 사람이 결과를 흔들 수 있는 최대치를 $S$로 손수 정한 셈입니다. 그래서 client-level DP는 집계된 global model에 "어떤 단일 client의 update든 가릴 수 있을 만큼"의 Gaussian 노이즈를 더해 달성됩니다.[^3]

이 파이프라인은 일반 프레임워크로도 형식화돼 있습니다. 각 기여 벡터를 $\pi_S(x) = x \cdot \min(1, S/\lVert x \rVert_2)$로 clip해 합한 뒤 노이즈를 더하며, mechanism의 프라이버시 비용은 sampling rate $q$와 tuple $(S, \sigma)$로 완전히 결정됩니다. 여기서 $S$가 합산되는 벡터의 L2 norm 상한, 즉 sensitivity입니다.[^4]

> **용어 풀이**
> - **민감도**(sensitivity): 한 단위(사람·client)가 추가/제거됐을 때 결과가 최대 얼마나 달라지는지의 상한. clip threshold $C$(또는 $S$)가 곧 이 값이 됩니다.
> - **user-level DP**: 보호 단위를 example 하나가 아니라 한 사용자의 데이터 전체로 잡는 차등 프라이버시.
> - **noise multiplier**($z$): 노이즈 표준편차를 sensitivity로 나눈 비율. 실제 노이즈 크기는 $\sigma = zC$입니다.

## 워크드 예제 — C, σ, client update norm 분포를 숫자로 봅니다

trade-off를 숫자로 보겠습니다. **noise multiplier**(노이즈 배수, $z$)는 더하는 Gaussian 노이즈의 표준편차를 sensitivity로 나눈 값이라, 실제 노이즈 크기는 $\sigma = zC$로 결정됩니다. 쉽게 말하면, 노이즈의 절대 크기는 "배수 $z$"와 "clip 상한 $C$"의 곱입니다. $C$를 키우면 노이즈도 같은 비율로 커집니다.

Abadi et al.의 MNIST 실험은 이 trade-off를 실제 수치로 보여 줍니다. clipping norm을 $C=4$, lot 크기를 $L=600$으로 고정한 채 노이즈 배수만 바꾼 결과입니다.[^1]

| noise 배수 $\sigma$ | 정확도 | 프라이버시 $(\varepsilon, \delta)$ |
|---|---|---|
| $\sigma = 2$ | 97% | $(\varepsilon=8,\ \delta=10^{-5})$ |
| $\sigma = 4$ | 95% | $(\varepsilon=2,\ \delta=10^{-5})$ |
| $\sigma = 8$ | 90% | $(\varepsilon=0.5,\ \delta=10^{-5})$ |

정리하면, 노이즈 배수를 키울수록 $\varepsilon$이 작아져(=보호가 강해져) 좋지만, 정확도는 97%에서 90%로 깎입니다. 여기서 $\varepsilon$(엡실론)은 프라이버시 보호 강도를 나타내는 값으로, 작을수록 강하게 보호하고 그만큼 노이즈가 큽니다. $\delta = 10^{-5}$는 이 보장이 아주 드물게(10만분의 1 확률로) 깨질 수 있다는 허용 오차입니다.

그렇다면 $C$ 자체를 어떻게 정해야 하는지가 다음 질문입니다. 여기서 양방향 함정이 보입니다.

1. **$C$를 너무 작게** 잡으면 대부분의 update가 잘려 나가 정보가 사라집니다. 한 사람의 긴 발언을 한 문장으로 줄여 버리는 셈이라, 모델이 배울 신호가 무너집니다.
2. **$C$를 너무 크게** 잡으면 $\sigma = zC$를 따라 노이즈가 커집니다. 신호 대비 노이즈 비율(SNR)이 붕괴해 학습이 안개 속에 묻힙니다.

> **예: (가상 시나리오)** client update norm의 median이 약 3.0인 작업에서 $C=1$로 잡으면 절반 이상의 update가 3분의 1 이하로 잘려 bias가 커지고, $C=10$으로 잡으면 노이즈 $\sigma=zC$가 3배 이상 커져 SNR이 무너집니다. 이 3.0/1/10 수치는 직관을 위한 예시일 뿐, 특정 논문의 실측값이 아닙니다.

이 딜레마의 처방이 **adaptive clipping**(적응형 클리핑)입니다. adaptive clipping은 고정된 clip norm 대신 client update norm 분포의 특정 분위수(quantile) 위치 값으로 $C$를 잡되, 그 분위수 값 자체를 차등 프라이버시를 지키며 온라인으로 추정하는 방법입니다.[^5]

> "one clips to a value at a specified quantile of the update norm distribution, where the value at the quantile is itself estimated online, with differential privacy."[^5]

쉽게 말하면, $C$를 사람이 미리 고정하지 않고 "지금 들어오는 update 길이의 가운데 값"에 자동으로 맞춥니다. 분위수 $\gamma$를 median(중앙값, $\gamma=0.5$)으로 두면 현실적인 federated 작업 대부분에서 잘 동작합니다. 즉 절반은 잘리고 절반은 그대로 통과하는 지점에 $C$를 맞추는 셈입니다.

$C$를 그 목표 분위수로 끌고 가는 갱신 규칙은 곱셈 형태입니다.

$$C \leftarrow C \cdot \exp\!\big(-\eta_C(\bar{b} - \gamma)\big)$$

쉽게 말하면, 지금 $C$ 이하인 update 비율 $\bar{b}$가 목표 $\gamma$보다 크면 $C$를 줄이고, 작으면 키웁니다. 너무 많이 통과하면 기준을 낮추고, 너무 많이 잘리면 기준을 올리는 자동 조절기입니다. 여기서 $\eta_C$는 조절 속도(clip learning rate)로 실험에서 $\eta_C = 0.2$, 초기값 $C^0 = 0.1$을 씁니다. 이 규칙은 초기값이 정답에서 자릿수 단위로 틀려도 빠르게 수렴합니다.[^5]

다만 공짜는 아닙니다. 분위수를 프라이버시를 지키며 추정하려면 예산 일부를 그쪽에 써야 합니다. update 합에 더하는 노이즈는 $\sigma_\Delta = z_\Delta \cdot C^t$, 분위수 추정 카운트에 더하는 노이즈는 $\sigma_b$이며, 전체 배수 $z$와는 $z_\Delta = (z^{-2} - (2\sigma_b)^{-2})^{-1/2}$로 연결됩니다.[^5] 쉽게 말하면, 같은 프라이버시 예산을 update 보호와 분위수 추정에 나눠 쓰는 것이라, 추정에 노이즈를 적게 쓰면 update에 쓸 몫이 줄어듭니다. 권장 기본값 $\sigma_b = m/20$이면 추정 오차가 0.1 미만일 확률이 95.4%입니다.[^5]

## C가 ε 보장의 전제를 깨는 순간 — 흔한 실수 3가지

$C$를 잘못 잡으면 정확도만 떨어지는 게 아니라 ε 회계 자체가 무효가 되는 경우가 있습니다. 세 가지가 대표적입니다.

**첫째, clip 순서가 어긋나 실효 sensitivity가 $C$와 달라지는 경우입니다.** 표준 파이프라인은 per-sample gradient를 계산하고, 그 L2 norm을 clip한 뒤, 배치로 합산하고, 마지막에 노이즈를 더하는 순서입니다.[^6]

> "a DP-SGD implementation computes per-sample gradients, clips their ℓ₂ norm, aggregates them into a batch gradient, and adds Gaussian noise."[^6]

쉽게 말하면, "먼저 자르고, 그다음 합치고, 마지막에 노이즈"의 순서를 지켜야 합니다. clip 전에 평균을 내거나 정규화하면 실제로 한 사람이 결과를 흔드는 최대치가 $C$와 달라집니다. 회계기는 sensitivity가 $C$라고 믿고 노이즈를 계산했는데 실제 sensitivity가 더 크다면, 약속한 ε이 거짓이 됩니다.

여기에 더해, per-sample gradient를 아예 정의할 수 없게 만드는 레이어도 있습니다. Opacus는 BatchNorm처럼 배치 안에서 샘플끼리 정보를 섞는 모듈을 금지합니다.[^7] 쉽게 말하면, 한 사람의 그래디언트를 깔끔히 떼어 낼 수 없으면 "한 사람을 $C$로 자른다"는 전제 자체가 성립하지 않습니다.

**둘째, secure aggregation의 모듈러 합 가정과 clip 범위가 어긋나는 경우입니다.** **secure aggregation**(보안 집계)은 서버가 개별 client의 update를 보지 못한 채 합계만 얻게 하는 암호 기법입니다. 그런데 이 기법은 입력의 모든 원소가 알려진 $R$에 대해 $[0, R)$ 범위의 정수라고 가정하고 모듈러 $R$ 합을 계산합니다.[^8]

> "We assume that all elements of both x_u and ∑ x_u are integers on the range [0,R) for some known R."[^8]

쉽게 말하면, 보안 집계는 정해진 범위의 정수만 다룹니다. clip된 update가 이 고정 범위·양자화 가정과 맞지 않으면, 합이 범위를 넘어 한 바퀴 돌아오는 wrap-around가 생겨 결과가 오염됩니다. 그러면 sensitivity 가정이 깨져 ε 보장도 함께 무너집니다.

**셋째, sampling rate $q$를 노이즈 회계와 다르게 잡는 경우입니다.** 많은 ε 회계는 "전체에서 일부만 무작위로 뽑힌다"는 amplification에 기대 ε을 줄여 잡습니다. 그런데 federated에서는 매 라운드 참여 가능한 client 모집단이 크게 변동해 균일 sampling이 사실상 불가능합니다. 그래서 DP-FTRL은 어떤 형태의 amplification도 쓰지 않습니다.[^9]

> "In distributed settings like federated learning (FL), uniform sampling/shuffling may be infeasible to achieve because of widely varying available population at each time step."[^9]

쉽게 말하면, "무작위로 뽑힌다"는 가정이 없는데도 그 가정으로 ε을 깎아 잡으면, 실제 ε은 회계가 말하는 값보다 큽니다. 보호가 장부보다 약해지는 것입니다. Abadi et al.의 **moments accountant**(모먼트 어카운턴트)는 바로 이 랜덤 부분집합에 적용된 Gaussian mechanism의 privacy loss를 여러 호출에 걸쳐 추적하는 내부 도구라, sampling 구조와 회계가 일치해야만 ε이 유효합니다.[^10] 쉽게 말하면, moments accountant는 라운드마다 새는 프라이버시를 합산해 주는 누적 계량기인데, 입력으로 가정한 sampling 방식이 실제와 다르면 계량값 자체가 틀립니다.

## 처방 — federated DP-SGD에서 C를 정하는 의사결정 흐름입니다

앞의 함정을 피하는 순서를 한 페이지로 정리하면 다음과 같습니다.

1. **clip은 client update에 한 번만 겁니다.** 한 client의 전체 update를 $\pi(\Delta, S) = \Delta \cdot \min(1, S/\lVert\Delta\rVert)$로 norm $S$ 이하로 묶고, 이 sensitivity에 비례한 노이즈 $\sigma = z \cdot S$를 집계 update에 더합니다.[^11] 쉽게 말하면, 자르는 지점은 "한 사람의 update 전체" 한 곳이며, 그 자른 길이 $S$가 노이즈 크기를 정합니다.
2. **$C$(또는 $S$)는 adaptive quantile로 추적합니다.** update norm 분포의 median($\gamma=0.5$)에 자동으로 맞춰, 고정값을 손으로 더듬는 수고를 없앱니다.[^5]
3. **노이즈 배수 $z$를 고정한 뒤 ε을 사전 설계 변수로 씁니다.** 라이브러리가 목표 $\varepsilon$에서 거꾸로 $z$를 계산해 줍니다.
4. **secure aggregation·sampling 가정과 정합성을 확인합니다.** clip 범위가 모듈러 합의 정수 범위와 맞는지, 회계가 가정한 sampling이 실제와 같은지 점검합니다.

라이브러리 파라미터로 옮기면 매핑이 분명해집니다. Opacus에서 `max_grad_norm`은 per-sample gradient의 최대 norm으로 이를 넘는 그래디언트를 이 값으로 clip하니 곧 $C$입니다. `noise_multiplier`는 노이즈 표준편차를 함수의 L2-sensitivity로 나눈 비율이라 곧 $z$입니다.[^12] 쉽게 말하면, `max_grad_norm`은 "얼마나 자를지", `noise_multiplier`는 "자른 길이에 몇 배의 노이즈를 더할지"입니다. 실제 노이즈는 두 값의 곱 $z \cdot C$입니다.

ε을 사후가 아니라 사전 변수로 쓰려면 Opacus의 `make_private_with_epsilon`을 씁니다. 목표 $\varepsilon$·$\delta$와 epoch 수를 주면, 끝까지 예산을 만족하도록 적절한 sigma(=noise multiplier)를 역산하고, `get_epsilon`으로 지금까지 소진한 $(\varepsilon, \delta)$를 확인합니다.[^12] 쉽게 말하면, "노이즈를 얼마나 줄지"가 아니라 "프라이버시를 얼마나 쓸지"를 먼저 정하면 나머지는 라이브러리가 계산합니다.

TensorFlow Privacy도 같은 계약을 따릅니다. `l2_norm_clip`은 "optimizer가 개별 학습 데이터 포인트에 대해 갖는 sensitivity를 bound"하는 역할이고, `compute_dp_sgd_privacy`가 데이터 크기·batch 크기·noise multiplier·epoch·delta로부터 ε을 계산합니다.[^13] 한 예로 sampling rate 0.417%, $z=1.3$, 720 step이면 $\varepsilon=0.563$, $\delta=10^{-5}$가 나옵니다.[^13] 쉽게 말하면, clip 값으로 sensitivity를 정하고, 노이즈·반복 횟수를 넣으면 최종 ε이 한 숫자로 떨어집니다.

정리하면, federated DP-SGD에서 $C$는 노이즈를 줄이는 손잡이가 아니라 sensitivity를 정하는 계약서입니다. 그 계약을 client update 한 곳에 걸고, median 분위수로 자동 추적하며, 노이즈 회계가 가정한 sampling·집계 구조와 맞춰 두면, ε은 사후에 빌어 보는 숫자가 아니라 처음부터 손에 쥔 설계 변수가 됩니다.

## 참고 문헌

[^1]: Abadi, Chu, Goodfellow, McMahan, Mironov, Talwar, Zhang, "Deep Learning with Differential Privacy", ACM CCS 2016. <https://arxiv.org/abs/1607.00133>
[^2]: McMahan, Ramage, Talwar, Zhang, "Learning Differentially Private Recurrent Language Models", ICLR 2018. <https://arxiv.org/abs/1710.06963>
[^3]: Kairouz, McMahan, et al., "Advances and Open Problems in Federated Learning", Foundations and Trends in ML, 2021. <https://arxiv.org/abs/1912.04977>
[^4]: McMahan, Andrew, et al., "A General Approach to Adding Differential Privacy to Iterative Training Procedures", 2018. <https://arxiv.org/abs/1812.06210>
[^5]: Andrew, Thakkar, McMahan, Ramaswamy, "Differentially Private Learning with Adaptive Clipping", NeurIPS 2021. <https://arxiv.org/abs/1905.03871>
[^6]: Yousefpour et al., "Opacus: User-Friendly Differential Privacy Library in PyTorch", 2021. <https://arxiv.org/abs/2109.12298>
[^7]: Yousefpour et al., "Opacus", 2021, §2 (Model Validation). <https://arxiv.org/abs/2109.12298>
[^8]: Bonawitz et al., "Practical Secure Aggregation for Privacy-Preserving Machine Learning", ACM CCS 2017. <https://arxiv.org/abs/1611.04482>
[^9]: Kairouz, McMahan, Song, Thakkar, Thakurta, Xu, "Practical and Private (Deep) Learning without Sampling or Shuffling (DP-FTRL)", ICML 2021. <https://arxiv.org/abs/2103.00039>
[^10]: Mironov, "Rényi Differential Privacy", IEEE CSF 2017. <https://arxiv.org/abs/1702.07476>
[^11]: McMahan, Ramage, Talwar, Zhang, "Learning Differentially Private Recurrent Language Models", ICLR 2018, §2. <https://arxiv.org/abs/1710.06963>
[^12]: Opacus 공식 API 문서, PrivacyEngine (max_grad_norm, noise_multiplier, make_private_with_epsilon). <https://opacus.ai/api/privacy_engine.html>
[^13]: TensorFlow Privacy 공식 튜토리얼, "Implement differential privacy with TensorFlow Privacy". <https://www.tensorflow.org/responsible_ai/privacy/tutorials/classification_privacy>
