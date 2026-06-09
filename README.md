## 완료된 세팅

### 프로젝트 구조 (FSD)

```
src/
├── app/          # 부트스트랩, 글로벌 스타일, 테마
├── pages/home/   # 홈 페이지
├── widgets/      # header, footer
├── features/     # (비어있음, 기능 추가 예정)
├── entities/     # (비어있음, 엔티티 추가 예정)
└── shared/       # ui/Button, store(Zustand), config, lib, api
```

### 레이어 import 별칭

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

### Cloudflare Pages 배포

- `public/_redirects` — SPA 라우팅 fallback
- `.github/workflows/deploy.yml` — main 브랜치 push 시 자동 배포

---

### Cloudflare Pages 연동을 위한 마지막 수동 작업

1. **Cloudflare Dashboard**에서 Pages 프로젝트 생성 (`taupt-official`)
2. **GitHub Secrets** 2개 등록 (Settings > Secrets and variables > Actions):
    - `CLOUDFLARE_API_TOKEN` — Cloudflare > My Profile > API Tokens > "Edit Cloudflare Workers" 템플릿
    - `CLOUDFLARE_ACCOUNT_ID` — Cloudflare 대시보드 우측 사이드바

이후 `main`에 push하면 자동으로 빌드 → 배포됩니다.