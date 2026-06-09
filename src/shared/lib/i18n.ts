export type Lang = 'ko' | 'en'

const translations = {
  ko: {
    // ── Header ──
    nav: {
      whoWeAre: 'Who we are',
      work: 'Work',
      products: 'Products',
      technology: 'Technology',
      contact: 'Contact',
      blog: 'Blog',
    },
    // ── Hero ──
    hero: {
      label: '차등 프라이버시 전문 기업',
      words: ['보호합니다.', '분석합니다.', '보장합니다.', '증명합니다.'],
      headline: '데이터는\n활용하되,\n개인정보를\n',
      desc: 'TaupT는 차등 프라이버시(Differential Privacy) 기술로\n데이터 활용과 개인정보 보호를 동시에 실현합니다.',
      scroll: 'Scroll',
    },
    // ── About ──
    about: {
      keywords: [
        'Privacy', '차등 프라이버시', 'Federated Learning', 'Data Safety',
        '연합학습', 'AI Security', '합성 데이터', 'Compliance',
        '프라이버시 감사', 'DP Engine',
      ],
      theme: 'Theme',
      teamLabel: 'Team',
      teamTitle: 'Our Team',
      memberCount: '9 Members',
      workNumber: '50+',
      workTitle: 'Work',
      cultureNumber: '8+',
      cultureTitle: 'Our Culture',
      stackCards: [
        { title: 'Career', desc: '함께 성장할 인재를 찾습니다' },
        { title: 'Contact', desc: '프로젝트를 시작해보세요' },
        { title: 'Service', desc: '다양한 서비스를 제공합니다' },
        { title: 'About Us', desc: 'TaupT를 소개합니다' },
      ],
    },
    // ── Work ──
    work: {
      label: 'Our Work',
      title: 'Selected Projects',
    },
    // ── Contact ──
    contact: {
      label: 'Contact',
      title: '함께 만들어\n볼까요?',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      nameField: '이름',
      namePlaceholder: '홍길동',
      phoneField: '연락처',
      phonePlaceholder: '010-0000-0000',
      emailField: '이메일',
      emailPlaceholder: 'hello@example.com',
      typeField: '문의 유형',
      typePlaceholder: '통계 분석 / 연합학습 / API 연동 / 기타',
      messageField: '메시지',
      messagePlaceholder: '프로젝트에 대해 자세히 알려주세요.',
      submit: '보내기 →',
    },
    // ── Blog ──
    blog: {
      label: 'Blog',
      title: 'Insights &\nStories',
      desc: 'TaupT 팀이 차등 프라이버시, 연합학습, 통계, 데이터 보안에 대해 이야기합니다.',
      allCategory: '전체',
      empty: '해당 카테고리에 포스트가 없습니다.',
      back: '← 블로그로 돌아가기',
      related: '관련 포스트',
      infoLabel: '포스트 정보',
      authorLabel: '작성자',
      dateLabel: '날짜',
      categoryLabel: '카테고리',
      tagsLabel: '태그',
    },
    // ── Products ──
    products: {
      heroLabel: 'PRODUCT',
      heroTitle: '데이터 프라이버시,\n수학으로 증명합니다.',
      heroDesc: 'DP-Engine은 차등 프라이버시(Differential Privacy) 기술을 적용하여\n개인정보를 수학적으로 보호하면서도 데이터의 통계적 가치를 유지하는\n통합 프라이버시 플랫폼입니다.',
      problemLabel: 'WHY DP-ENGINE',
      problemTitle: '기존 익명화,\n왜 안전하지 않을까요?',
      problemDesc: '마스킹, K-익명성 등 기존 익명화 기법은 보조 데이터와 결합하면 개인을 재식별할 수 있습니다. DP-Engine은 수학적 증명으로 재식별을 원천 차단합니다.',
      problemCases: [
        { title: 'Netflix Prize', year: '2006', desc: '익명화된 영화 평점 데이터에서 IMDB 보조 데이터로 17,000명 이상 재식별' },
        { title: 'AOL 검색 유출', year: '2006', desc: '65,000건의 익명 검색 기록에서 뉴욕타임스가 10일 만에 실제 사용자 특정' },
        { title: '의료정보 재식별', year: '1997', desc: '우편번호 + 생년월일 + 성별만으로 미국인 87%를 고유 식별 가능' },
      ],
      featuresLabel: 'FEATURES',
      featuresTitle: '핵심 기능',
      features: [
        { title: '자동 클리핑', desc: '전문가 개입 없이 AI가 자동으로 최적의 노이즈 밸런스를 찾아 정확도와 프라이버시를 동시에 확보합니다.' },
        { title: '실시간 감사', desc: '추가 프라이버시 비용 없이 24시간 시스템 정확성을 자동 검증하여 구현 오류를 즉시 탐지합니다.' },
        { title: '고차원 데이터 지원', desc: 'AI/ML 모델 학습 시 50차원 이상의 그래디언트 방향을 보존하여 연합학습을 실용화합니다.' },
        { title: '합성 데이터 생성', desc: '원본과 통계적으로 동일하지만 개인정보가 없는 합성 데이터를 생성하여 안전한 데이터 공유를 지원합니다.' },
        { title: '프라이버시 예산 관리', desc: '세션 기반으로 프라이버시 예산(ε)을 정밀 추적하여 예산 소진 시점을 정확히 파악합니다.' },
        { title: '규제 준수', desc: 'GDPR, 개인정보보호법(PIPA), HIPAA 등 주요 규제에 대한 수학적 증빙을 자동 생성합니다.' },
      ],
      useCasesLabel: 'USE CASES',
      useCasesTitle: '산업별 활용 사례',
      useCases: [
        {
          industry: '의료·헬스케어',
          title: '병원 간 협력 AI 개발',
          points: ['환자 데이터 없이 암호화된 학습 방향만 공유', '법적 협의 18개월 → 3개월로 단축', 'HIPAA Expert Determination 기준 충족'],
        },
        {
          industry: '금융·핀테크',
          title: '이상거래 탐지 고도화',
          points: ['은행 간 거래 패턴 통계만 공유', '사기 탐지 정확도 15-30% 향상', '규제 준수하며 모델 정확도 개선'],
        },
        {
          industry: '공공·정부',
          title: '공정한 통계 분석',
          points: ['소수 집단 통계 왜곡 30배 개선', '인구조사 데이터 프라이버시 보호', '정책 수립을 위한 정확한 분석'],
        },
        {
          industry: '유통·마케팅',
          title: 'GDPR 준수 개인화',
          points: ['개인 식별 없는 집단 인사이트 도출', '연령·시간대별 선호도 분석', '컴플라이언스 리스크 제로'],
        },
        {
          industry: 'AI·ML 플랫폼',
          title: '안전한 모델 학습',
          points: ['합성 데이터로 원본 95%+ 정확도 달성', '파트너 데이터 공유 없이 협력 학습', '모델 프라이버시 리스크 검증'],
        },
      ],
      metricsLabel: 'PERFORMANCE',
      metrics: [
        { value: '13', suffix: '×', label: '오류 감소', desc: '전문가 수동 설정 대비 자동 클리핑의 오류 감소율' },
        { value: '30', suffix: '×', label: '공정성 개선', desc: '소수 집단에 대한 통계 편향 개선율' },
        { value: '3', suffix: '개월', label: '배포 기간', desc: '의료 데이터 협력 프로젝트 배포 기간 (기존 18개월)' },
      ],
      ctaTitle: '데이터를 보호할\n준비가 되셨나요?',
      ctaButton: '문의하기 →',
    },
    // ── Technology ──
    technology: {
      heroLabel: 'TECHNOLOGY',
      heroTitle: '3개의 특허 기술이\nDP-Engine을 구동합니다.',
      heroDesc: 'TaupT는 차등 프라이버시 분야의 핵심 난제를 해결하는 3개의 독자적 특허 기술을 보유하고 있습니다.\n이론적 완결성과 실용성을 동시에 갖춘 엔터프라이즈급 프라이버시 엔진입니다.',
      patentsLabel: 'PATENTS',
      patentsTitle: '특허 기술',
      patents: [
        {
          badge: 'Patent 01',
          title: '적응형 클리핑',
          subtitle: 'Adaptive Clipping',
          desc: '기존 차등 프라이버시 시스템은 전문가가 데이터를 직접 확인하여 클리핑 임계값을 수동으로 설정해야 했습니다. 이 과정은 주관적이고, 재현이 어려우며, 데이터를 열람하는 행위 자체가 프라이버시를 침해할 수 있습니다. AC-PQ 알고리즘은 수학적 품질 함수를 통해 데이터를 열람하지 않고도 최적의 임계값을 자동으로 선택합니다.',
          keyPoints: [
            '전문가 개입 없는 완전 자동 임계값 선택',
            '의료 데이터 기준 오류 46.73 → 3.47로 13배 감소',
            'LCP-FCL로 소수 집단 통계 편향 30배 개선',
            '데이터 열람 없이 프라이버시 원칙 완벽 준수',
          ],
          metric: '13',
          metricLabel: '오류 감소',
        },
        {
          badge: 'Patent 02',
          title: '실시간 감사 시스템',
          subtitle: 'Zero-Cost Audit',
          desc: '수학적 증명이 완벽해도 코드에 버그가 있으면 프라이버시가 깨집니다. 기존에는 감사를 위해 추가 프라이버시 예산(ε)을 소모해야 했지만, TaupT의 감사 시스템은 합성 데이터와 시스템 메트릭만 활용하여 프라이버시 비용 제로(ε=0)로 24시간 자동 검증합니다.',
          keyPoints: [
            '자기상쇄 쿼리로 노이즈 분포 정확성 검증',
            '슬라이딩 윈도우로 프라이버시 예산 누적 모니터링',
            '타이밍 상관관계 분석으로 사이드채널 탐지',
            '실제 데이터 접근 없이 검증 → ε=0 비용',
          ],
          metric: 'ε=0',
          metricLabel: '감사 비용',
        },
        {
          badge: 'Patent 03',
          title: '방향 보존 L2-노름 클리핑',
          subtitle: 'High-Dimensional DP',
          desc: '현대 AI는 50차원 이상의 고차원 데이터를 다룹니다. 기존 차등 프라이버시는 각 차원을 독립적으로 클리핑하여 벡터의 방향이 왜곡되고, 50차원에서는 방향 유사도가 거의 0에 수렴하여 실질적으로 사용이 불가능했습니다. L2-노름 클리핑은 벡터의 전체 크기만 제한하고 방향은 완벽히 보존합니다.',
          keyPoints: [
            'L2-노름 기반 클리핑으로 벡터 방향 완벽 보존',
            '50차원 방향 유사도: 기존 ~0 → TaupT 0.88',
            '차원 수와 무관한 감도(sensitivity) 설계',
            '연합학습(Federated Learning) 실용화 달성',
          ],
          metric: '0.88',
          metricLabel: '방향 유사도',
        },
      ],
      compLabel: 'COMPARISON',
      compTitle: '경쟁사 비교',
      compHeaders: ['기능', 'TaupT DP-Engine', 'Google DP Library', 'Apple DP'],
      compRows: [
        { feature: '자동 클리핑', taupt: '자동 (AC-PQ)', google: '수동 설정', apple: '수동 설정' },
        { feature: '실시간 감사', taupt: '24/7 자동 (ε=0)', google: '외부 테스트 필요', apple: '미제공' },
        { feature: '고차원 지원', taupt: '방향 보존 (0.88)', google: '차원별 독립 처리', apple: '로컬 전용' },
        { feature: '공정성 보장', taupt: '자동 (LCP-FCL)', google: '미제공', apple: '미제공' },
        { feature: '엔터프라이즈 지원', taupt: 'API + 대시보드', google: '라이브러리만', apple: '디바이스 전용' },
        { feature: '배포 형태', taupt: '통합 플랫폼', google: '개발자 도구', apple: '내장 기능' },
      ],
      ctaTitle: '엔터프라이즈급 차등 프라이버시를\n경험하세요.',
      ctaButton: '기술 문의 →',
    },
    // ── Footer ──
    footer: {
      rights: 'All rights reserved.',
      desc: '차등 프라이버시(DP) 기술로 데이터 활용과 개인정보 보호를 동시에 실현합니다.',
      links: [
        { label: 'Products', href: '/products' },
        { label: 'Technology', href: '/technology' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  },

  en: {
    // ── Header ──
    nav: {
      whoWeAre: 'Who we are',
      work: 'Work',
      products: 'Products',
      technology: 'Technology',
      contact: 'Contact',
      blog: 'Blog',
    },
    // ── Hero ──
    hero: {
      label: 'Differential Privacy Company',
      words: ['Protected.', 'Analyzed.', 'Guaranteed.', 'Proven.'],
      headline: 'Use your data,\nkeep privacy \n',
      desc: 'TaupT applies Differential Privacy to achieve\nboth data utility and personal data protection.',
      scroll: 'Scroll',
    },
    // ── About ──
    about: {
      keywords: [
        'Privacy', 'Differential Privacy', 'Federated Learning', 'Data Safety',
        'AI Security', 'Synthetic Data', 'Compliance', 'DP Audit',
        'Zero Trust', 'DP Engine',
      ],
      theme: 'Theme',
      teamLabel: 'Team',
      teamTitle: 'Our Team',
      memberCount: '9 Members',
      workNumber: '50+',
      workTitle: 'Work',
      cultureNumber: '8+',
      cultureTitle: 'Our Culture',
      stackCards: [
        { title: 'Career', desc: 'Join our growing team' },
        { title: 'Contact', desc: 'Start your project with us' },
        { title: 'Service', desc: 'Explore our services' },
        { title: 'About Us', desc: 'Meet TaupT' },
      ],
    },
    // ── Work ──
    work: {
      label: 'Our Work',
      title: 'Selected Projects',
    },
    // ── Contact ──
    contact: {
      label: 'Contact',
      title: "Let's build\ntogether.",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      nameField: 'Name',
      namePlaceholder: 'Jane Doe',
      phoneField: 'Phone',
      phonePlaceholder: '+82 10-0000-0000',
      emailField: 'Email',
      emailPlaceholder: 'hello@example.com',
      typeField: 'Inquiry Type',
      typePlaceholder: 'Stats Analysis / Federated Learning / API / Other',
      messageField: 'Message',
      messagePlaceholder: 'Tell us about your project.',
      submit: 'Send →',
    },
    // ── Blog ──
    blog: {
      label: 'Blog',
      title: 'Insights &\nStories',
      desc: 'The TaupT team writes about Differential Privacy, Federated Learning, and data security.',
      allCategory: 'All',
      empty: 'No posts in this category.',
      back: '← Back to Blog',
      related: 'Related Posts',
      infoLabel: 'Post Info',
      authorLabel: 'Author',
      dateLabel: 'Date',
      categoryLabel: 'Category',
      tagsLabel: 'Tags',
    },
    // ── Products ──
    products: {
      heroLabel: 'PRODUCT',
      heroTitle: 'Data privacy,\nmathematically proven.',
      heroDesc: 'DP-Engine is an integrated privacy platform that applies Differential Privacy\nto mathematically protect personal data while preserving statistical value.',
      problemLabel: 'WHY DP-ENGINE',
      problemTitle: 'Why traditional\nanonymization fails.',
      problemDesc: 'Traditional techniques like masking and K-anonymity can be reversed when combined with auxiliary data. DP-Engine blocks re-identification with mathematical proof.',
      problemCases: [
        { title: 'Netflix Prize', year: '2006', desc: 'Over 17,000 users re-identified from anonymized movie ratings using IMDB data' },
        { title: 'AOL Search Leak', year: '2006', desc: 'NY Times identified a real user from 65,000 anonymized search records in 10 days' },
        { title: 'Medical Records', year: '1997', desc: '87% of Americans uniquely identifiable by ZIP code + birth date + gender alone' },
      ],
      featuresLabel: 'FEATURES',
      featuresTitle: 'Core Capabilities',
      features: [
        { title: 'Auto Clipping', desc: 'AI automatically finds the optimal noise balance without expert intervention, securing both accuracy and privacy.' },
        { title: 'Real-time Audit', desc: 'Automatically verifies system accuracy 24/7 at zero additional privacy cost, detecting implementation errors instantly.' },
        { title: 'High-Dimensional Support', desc: 'Preserves gradient direction for 50+ dimensions during AI/ML training, making federated learning practical.' },
        { title: 'Synthetic Data Generation', desc: 'Creates statistically identical datasets without personal information for safe data sharing with partners.' },
        { title: 'Privacy Budget Management', desc: 'Precisely tracks privacy budget (ε) on a session basis so you know exactly when the budget is exhausted.' },
        { title: 'Regulatory Compliance', desc: 'Automatically generates mathematical proof for GDPR, PIPA, HIPAA and other major regulatory requirements.' },
      ],
      useCasesLabel: 'USE CASES',
      useCasesTitle: 'Industry Applications',
      useCases: [
        {
          industry: 'Healthcare',
          title: 'Cross-Hospital AI Development',
          points: ['Share only encrypted learning gradients, not patient data', 'Reduce legal negotiation from 18 months to 3 months', 'Meet HIPAA Expert Determination standards'],
        },
        {
          industry: 'Finance',
          title: 'Advanced Fraud Detection',
          points: ['Share only transaction pattern statistics between banks', 'Improve fraud detection accuracy by 15-30%', 'Enhance model accuracy while maintaining compliance'],
        },
        {
          industry: 'Public Sector',
          title: 'Fair Statistical Analysis',
          points: ['30x improvement in minority group statistical bias', 'Census data privacy protection', 'Accurate analysis for policy development'],
        },
        {
          industry: 'Retail & Marketing',
          title: 'GDPR-Compliant Personalization',
          points: ['Derive group insights without individual identification', 'Analyze preferences by age and time demographics', 'Zero compliance risk'],
        },
        {
          industry: 'AI/ML Platforms',
          title: 'Secure Model Training',
          points: ['Achieve 95%+ accuracy with synthetic data', 'Collaborative learning without sharing partner data', 'Model privacy risk verification'],
        },
      ],
      metricsLabel: 'PERFORMANCE',
      metrics: [
        { value: '13', suffix: '×', label: 'Error Reduction', desc: 'Compared to expert manual clipping configuration' },
        { value: '30', suffix: '×', label: 'Fairness Improvement', desc: 'Statistical bias reduction for minority groups' },
        { value: '3', suffix: 'mo', label: 'Deployment', desc: 'Healthcare collaboration deployment (from 18 months)' },
      ],
      ctaTitle: 'Ready to protect\nyour data?',
      ctaButton: 'Contact Us →',
    },
    // ── Technology ──
    technology: {
      heroLabel: 'TECHNOLOGY',
      heroTitle: 'Three patented technologies\npowering DP-Engine.',
      heroDesc: 'TaupT holds three proprietary patents solving core challenges in differential privacy.\nAn enterprise-grade privacy engine with both theoretical completeness and practical applicability.',
      patentsLabel: 'PATENTS',
      patentsTitle: 'Patented Technologies',
      patents: [
        {
          badge: 'Patent 01',
          title: 'Adaptive Clipping',
          subtitle: 'AC-PQ + LCP-FCL',
          desc: 'Traditional DP systems required experts to manually inspect data and set clipping thresholds — a process that is subjective, non-reproducible, and inherently privacy-violating. The AC-PQ algorithm uses a mathematical quality function to automatically select optimal thresholds without ever viewing the data.',
          keyPoints: [
            'Fully automatic threshold selection without expert intervention',
            'Error reduced from 46.73 to 3.47 (13x improvement) in medical data',
            'LCP-FCL corrects minority group statistical bias by 30x',
            'Perfect compliance with DP principles — no data viewing required',
          ],
          metric: '13×',
          metricLabel: 'Error Reduction',
        },
        {
          badge: 'Patent 02',
          title: 'Real-time Audit System',
          subtitle: 'Zero-Cost Audit',
          desc: 'Even perfect mathematical proofs break if the code has bugs. Previously, auditing required spending additional privacy budget (ε). TaupT\'s audit system uses only synthetic data and system metrics to verify correctness 24/7 at zero privacy cost (ε=0).',
          keyPoints: [
            'Self-canceling queries verify noise distribution accuracy',
            'Sliding window monitors privacy budget accumulation',
            'Timing correlation analysis detects side-channel attacks',
            'No real data access for verification → ε=0 cost',
          ],
          metric: 'ε=0',
          metricLabel: 'Audit Cost',
        },
        {
          badge: 'Patent 03',
          title: 'Direction-Preserving L2-Norm Clipping',
          subtitle: 'High-Dimensional DP',
          desc: 'Modern AI works with 50+ dimensional data. Traditional DP clips each dimension independently, distorting vector direction — at 50 dimensions, directional similarity approaches zero, making it practically unusable. L2-norm clipping constrains only the vector\'s total magnitude while perfectly preserving direction.',
          keyPoints: [
            'L2-norm based clipping perfectly preserves vector direction',
            '50D directional similarity: existing ~0 → TaupT 0.88',
            'Dimension-independent sensitivity design',
            'Makes Federated Learning practical at scale',
          ],
          metric: '0.88',
          metricLabel: 'Directional Similarity',
        },
      ],
      compLabel: 'COMPARISON',
      compTitle: 'How We Compare',
      compHeaders: ['Feature', 'TaupT DP-Engine', 'Google DP Library', 'Apple DP'],
      compRows: [
        { feature: 'Auto Clipping', taupt: 'Automatic (AC-PQ)', google: 'Manual Setup', apple: 'Manual Setup' },
        { feature: 'Real-time Audit', taupt: '24/7 Auto (ε=0)', google: 'External Testing', apple: 'Not Available' },
        { feature: 'High-Dim Support', taupt: 'Direction-Preserving (0.88)', google: 'Per-Dimension', apple: 'Local Only' },
        { feature: 'Fairness', taupt: 'Automatic (LCP-FCL)', google: 'Not Available', apple: 'Not Available' },
        { feature: 'Enterprise', taupt: 'API + Dashboard', google: 'Library Only', apple: 'Device Only' },
        { feature: 'Deployment', taupt: 'Integrated Platform', google: 'Developer Tool', apple: 'Built-in Feature' },
      ],
      ctaTitle: 'Experience enterprise-grade\ndifferential privacy.',
      ctaButton: 'Technical Inquiry →',
    },
    // ── Footer ──
    footer: {
      rights: 'All rights reserved.',
      desc: 'Mathematically proven data privacy through Differential Privacy technology.',
      links: [
        { label: 'Products', href: '/products' },
        { label: 'Technology', href: '/technology' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  },
} as const

// Use a mapped type so both ko and en satisfy the same interface
export type Translations = {
  nav: { whoWeAre: string; work: string; products: string; technology: string; contact: string; blog: string }
  hero: { label: string; words: readonly string[]; headline: string; desc: string; scroll: string }
  about: {
    keywords: readonly string[]
    theme: string
    teamLabel: string
    teamTitle: string
    memberCount: string
    workNumber: string
    workTitle: string
    cultureNumber: string
    cultureTitle: string
    stackCards: readonly { title: string; desc: string }[]
  }
  work: { label: string; title: string }
  contact: {
    label: string; title: string
    emailLabel: string; phoneLabel: string; addressLabel: string
    nameField: string; namePlaceholder: string
    phoneField: string; phonePlaceholder: string
    emailField: string; emailPlaceholder: string
    typeField: string; typePlaceholder: string
    messageField: string; messagePlaceholder: string
    submit: string
  }
  blog: {
    label: string; title: string; desc: string
    allCategory: string; empty: string; back: string; related: string
    infoLabel: string; authorLabel: string; dateLabel: string
    categoryLabel: string; tagsLabel: string
  }
  products: {
    heroLabel: string; heroTitle: string; heroDesc: string
    problemLabel: string; problemTitle: string; problemDesc: string
    problemCases: readonly { title: string; year: string; desc: string }[]
    featuresLabel: string; featuresTitle: string
    features: readonly { title: string; desc: string }[]
    useCasesLabel: string; useCasesTitle: string
    useCases: readonly { industry: string; title: string; points: readonly string[] }[]
    metricsLabel: string
    metrics: readonly { value: string; suffix: string; label: string; desc: string }[]
    ctaTitle: string; ctaButton: string
  }
  technology: {
    heroLabel: string; heroTitle: string; heroDesc: string
    patentsLabel: string; patentsTitle: string
    patents: readonly {
      badge: string; title: string; subtitle: string; desc: string
      keyPoints: readonly string[]; metric: string; metricLabel: string
    }[]
    compLabel: string; compTitle: string
    compHeaders: readonly string[]
    compRows: readonly { feature: string; taupt: string; google: string; apple: string }[]
    ctaTitle: string; ctaButton: string
  }
  footer: {
    rights: string
    desc: string
    links: readonly { label: string; href: string }[]
  }
}

export function getT(lang: Lang): Translations {
  return translations[lang] as Translations
}
