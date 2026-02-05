# 이력서 포트폴리오 v1

인터랙티브하고 다이나믹한 이력서 포트폴리오 웹사이트입니다.

## 📋 작업 기록

### 2026년 작업 내역

#### 1. 프로젝트 초기 설정
- Next.js 16 + React 19 + TypeScript 기반 프로젝트
- Tailwind CSS 4 스타일링 설정
- 다크 모드 지원

#### 2. 라이브러리 설치
- **framer-motion**: 부드러운 애니메이션 효과
- **react-intersection-observer**: 스크롤 기반 인터랙션 감지
- **lucide-react**: 모던한 아이콘 라이브러리
- **Prisma**: ORM (데이터베이스 관리)
- **PostgreSQL**: 데이터베이스 (방문 카운터 저장)

#### 3. 프로젝트 구조
```
resume-v1/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 레이아웃 설정
│   ├── globals.css       # 전역 스타일 및 애니메이션
│   └── api/              # API 라우트
│       ├── visits/       # 방문 카운터 API
│       │   ├── route.ts  # 오늘의 방문 카운트 (GET, POST)
│       │   ├── total/    # 전체 방문 카운트 (GET)
│       │   └── daily/    # 일자별 방문 카운트 (GET)
│       └── contact/      # 연락처 폼 API
│           └── route.ts  # 메시지 전송 (POST)
├── components/
│   ├── sections/         # 페이지 섹션 컴포넌트들
│   │   ├── Hero.tsx      # 히어로 섹션 (메인 소개)
│   │   ├── Experience.tsx # 경력 섹션
│   │   ├── Skills.tsx    # 기술 스택 섹션
│   │   ├── Projects.tsx  # 프로젝트 섹션
│   │   ├── EducationAndMilitary.tsx # 학력 및 병적 섹션
│   │   ├── Certifications.tsx # 자격 및 수상 섹션
│   │   └── Contact.tsx   # 연락처 섹션
│   ├── layout/           # 레이아웃 관련 컴포넌트
│   │   └── Navigation.tsx # 네비게이션 바
│   └── ui/               # 재사용 가능한 UI 컴포넌트
│       ├── Section.tsx   # 재사용 가능한 섹션 래퍼
│       ├── ThemeToggle.tsx # 다크 모드 토글 버튼
│       ├── BaseModal.tsx # 공통 모달 컴포넌트 (재사용)
│       ├── PersonalInfoModal.tsx # 인적사항 모달
│       ├── ImageModal.tsx # 이미지 확대 모달
│       ├── VisitCounter.tsx # 방문 카운터 디스플레이
│       ├── VisitCounterModal.tsx # 방문 카운터 상세 모달
│       └── modal-animations.ts # 모달 애니메이션 variants
├── hooks/                # 커스텀 React 훅
│   └── useSectionInView.ts # 섹션 뷰포트 감지 훅
├── utils/                # 유틸리티 함수
│   ├── api.ts            # API 에러 핸들링
│   ├── date.ts           # 날짜 포맷팅 함수
│   ├── image.ts          # 이미지 에러 핸들링
│   └── scroll.ts         # 스크롤 유틸리티
├── constants/            # 상수 정의
│   └── animations.ts     # 애니메이션 duration 상수
├── contexts/             # React Context
│   └── ThemeContext.tsx  # 다크 모드 테마 관리
├── data/
│   └── resume-data.ts    # 이력서 데이터 (중앙 집중식 관리)
├── lib/
│   └── prisma.ts         # Prisma 클라이언트 설정
├── prisma/
│   ├── schema.prisma     # 데이터베이스 스키마
│   └── migrations/       # 데이터베이스 마이그레이션
└── public/
    ├── audio/            # 오디오 파일 (자기소개 음성)
    ├── tech-icons/       # 기술 스택 아이콘
    └── certifications/   # 자격증/수상 이미지
```

**구조화 특징:**
- **sections/**: 페이지의 주요 섹션 컴포넌트들을 그룹화
- **layout/**: 레이아웃 관련 컴포넌트 (네비게이션, 헤더, 푸터 등)
- **ui/**: 재사용 가능한 범용 UI 컴포넌트
- **hooks/**: 커스텀 React 훅 (재사용 가능한 로직)
- **utils/**: 유틸리티 함수 (날짜, 이미지, API, 스크롤 등)
- **constants/**: 상수 정의 (애니메이션 duration 등)
- 역할별로 명확하게 분리되어 확장성과 유지보수성이 향상됨

#### 4. 주요 기능 구현

##### 인터랙티브 요소
- ✅ 스크롤 기반 애니메이션 (fade-in, slide-up)
- ✅ 호버 효과 (scale, rotate, shadow)
- ✅ 스크롤 인디케이터
- ✅ 네비게이션 바 스크롤 감지 및 활성 섹션 하이라이트
- ✅ 부드러운 스크롤 이동
- ✅ 반응형 모바일 메뉴
- ✅ 타이핑 애니메이션 (Hero 섹션)
- ✅ 인적사항 모달 팝업 (성향 정보 포함, 오디오 재생 기능)

##### 다이나믹 스크롤 효과
- ✅ 섹션별 스크롤 진입 시 애니메이션 트리거
- ✅ 스태거 애니메이션 (순차적 등장)
- ✅ 히어로 섹션 배경 블롭 애니메이션
- ✅ 카드 호버 시 3D 효과
- ✅ 모달 카드 뒤집기 애니메이션 (3D 회전 효과)

##### 유지보수성
- ✅ 데이터와 컴포넌트 분리
- ✅ TypeScript 인터페이스로 타입 안정성 확보
- ✅ 일관된 컴포넌트 구조 및 네이밍
- ✅ 재사용 가능한 Section 컴포넌트
- ✅ 구조화된 폴더 구조 (sections/, layout/, ui/)
- ✅ 역할별 컴포넌트 분류로 확장성 향상

#### 5. 디자인 특징
- 그라디언트 배경 및 텍스트
- 카드 기반 레이아웃
- 다크 모드 지원
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 모던한 UI/UX

#### 6. 섹션 구성
1. **Hero**: 이름, 직책, 소개, 연락처 버튼, 타이핑 애니메이션, 인적사항 모달, 방문 카운터
2. **Experience**: 경력 사항 (타임라인 형식)
3. **Skills**: 기술 스택 (카테고리별, 그라데이션 태그, 아이콘 이미지, 링크)
4. **Projects**: 프로젝트 포트폴리오
5. **EducationAndMilitary**: 학력 및 병적 사항
6. **Certifications**: 자격 및 수상 (이미지 슬라이드, 무한 루프, 이미지 확대)
7. **Contact**: 연락처 및 메시지 폼 (Resend를 통한 이메일 전송)

#### 7. 인적사항 모달 기능 (최신)
- ✅ Hero 섹션의 인적사항 버튼 클릭 시 모달 표시
- ✅ 이름, 생년월일, 성별을 한 줄에 균등 분할로 표시 (`grid-cols-3`)
- ✅ MBTI와 특징을 한 줄에 균등 분할로 표시 (`grid-cols-2`)
- ✅ 생년월일과 특징이 같은 세로 줄에 정렬 (`grid-cols-3` 레이아웃)
- ✅ MBTI, 특성, 가치관 정보 표시 (personalDetails 내부)
- ✅ 자기소개 텍스트 표시
- ✅ 자기소개와 가치관에 좌측 초록색 세로줄 스타일 적용 (`border-teal-400`)
- ✅ 자기소개 오디오 재생 기능 (재생/일시정지 버튼)
- ✅ 카드 뒤집기 애니메이션 (3D 회전 효과)
- ✅ 80% 반투명 배경 + 블러 효과
- ✅ 텍스트 그림자 효과로 가독성 향상
- ✅ 배경 클릭 또는 X 버튼으로 닫기
- ✅ 모달 닫을 때 오디오 자동 정지
- ✅ `data/resume-data.ts`의 `personalDetails` 객체로 데이터 관리

#### 8. 컴포넌트 구조화
- ✅ 컴포넌트를 역할별로 폴더 구조화
  - `sections/`: 페이지 섹션 컴포넌트들
  - `layout/`: 레이아웃 관련 컴포넌트
  - `ui/`: 재사용 가능한 UI 컴포넌트
- ✅ 명확한 파일 구조로 유지보수성 향상
- ✅ 확장 가능한 구조로 향후 기능 추가 용이

#### 9. 자격 및 수상 섹션 (최신)
- ✅ 이미지 슬라이드 형식으로 자격증 및 수상 내역 표시
- ✅ 좌에서 우로 무한 루프 자동 스크롤 (requestAnimationFrame 기반)
- ✅ 반응형 디스플레이 (모바일 2개, 태블릿 3개, 데스크톱 4-5개)
- ✅ 마우스 호버 시 일시정지 기능
- ✅ 일시정지 툴팁 표시 ("일시정지 중 · 마우스를 떼면 재생")
- ✅ 툴팁 깜빡임 애니메이션 효과
- ✅ 모바일 최적화 (모바일에서는 툴팁 미표시, 이미지 클릭 시에도 슬라이드 계속 진행)
- ✅ 이미지 클릭 시 확대 모달 표시
- ✅ 자격증/수상 태그에 이모지 추가 (📜 자격증, 🏆 수상)
- ✅ `data/resume-data.ts`의 `certifications` 배열로 데이터 관리
- ✅ 각 항목에 이미지, 이름, 취득월, 타입(자격증/수상) 정보 표시

#### 10. 이미지 확대 모달 (최신)
- ✅ 자격 및 수상 섹션의 이미지 클릭 시 확대 모달 표시
- ✅ 성향 모달과 동일한 카드 뒤집기 애니메이션 적용
- ✅ 이미지 제목 표시
- ✅ 반응형 레이아웃 (최대 너비 4xl)
- ✅ 배경 클릭 또는 X 버튼으로 닫기

#### 11. 모달 애니메이션 재활용 구조화 (최신)
- ✅ `components/ui/modal-animations.ts` 파일 생성
- ✅ 공통 애니메이션 variants 추출:
  - `modalBackdropVariants`: 배경 오버레이 애니메이션
  - `modalContainerVariants`: 컨테이너 애니메이션
  - `modalCardVariants`: 카드 뒤집기 애니메이션 (rotateY, scale, opacity)
  - `modalCardStyle`: 3D 변환 스타일
- ✅ `BaseModal` 컴포넌트 생성으로 모든 모달 통합
- ✅ PersonalityModal, ImageModal, VisitCounterModal에서 BaseModal 사용
- ✅ 코드 중복 제거 및 유지보수성 향상
- ✅ 향후 새로운 모달 추가 시 쉽게 재사용 가능

#### 12. 방문 카운터 기능 (최신)
- ✅ Prisma ORM을 사용한 데이터베이스 연동
- ✅ PostgreSQL 데이터베이스 사용 (Supabase 호스팅)
- ✅ 날짜별 방문 카운트 추적 (`VisitCount` 모델)
- ✅ API 엔드포인트:
  - `POST /api/visits`: 오늘의 방문 카운트 증가
  - `GET /api/visits`: 오늘의 방문 카운트 조회
  - `GET /api/visits/total`: 전체 방문 카운트 조회
  - `GET /api/visits/daily`: 일자별 방문 카운트 조회 (최근 30일)
- ✅ `VisitCounter` 컴포넌트: 디지털 디스플레이 스타일 카운터
  - 숫자별 개별 애니메이션 (fade-in + slide-up)
  - 4자리 숫자 표시 (앞자리 0으로 패딩)
  - 변경된 숫자만 애니메이션 적용
- ✅ `VisitCounterModal` 컴포넌트: 방문 통계 상세 모달
  - 전체 방문 수 표시
  - 일자별 방문 수 목록 (최근 30일)
  - 로딩 스피너 표시
- ✅ Hero 섹션에 방문 카운터 통합
- ✅ 실시간 업데이트 (4초마다 자동 갱신)
- ✅ 페이지 로드 시 자동 카운트 증가
- ✅ 방문 카운터 클릭 시 상세 통계 모달 표시

#### 13. Hero 섹션 버튼 기능 개선 (최신)
- ✅ 연락처 버튼 클릭 시 연락처 섹션으로 부드러운 스크롤 이동 (`utils/scroll.ts` 사용)
- ✅ 인적사항 버튼 추가 (청록-시안 그라데이션)
- ✅ 모바일 반응형 디자인:
  - 모바일: 아이콘만 표시 (공간 절약)
  - 데스크톱: 아이콘 + 텍스트 표시
- ✅ 버튼 타입 변경: `motion.a` → `motion.button` (스크롤 이동 기능)
- ✅ 프로필 이미지 툴팁 제거
- ✅ 스크롤 인디케이터 애니메이션 재추가 (화살표 아래로 이동)

#### 14. 인적사항 모달 개선 (최신)
- ✅ personality 데이터를 personalDetails로 통합
- ✅ 이름, 생년월일, 성별을 한 줄에 균등 분할로 표시 (grid-cols-3)
- ✅ MBTI 색상을 이름과 동일한 파란색으로 통일
- ✅ 자기소개를 맨 아래로 이동
- ✅ 중간 구분선 제거
- ✅ 자기소개 오디오 재생 기능 추가:
  - 재생/일시정지 버튼 (자기소개 제목 옆)
  - 오디오 종료 시 자동 정지
  - 모달 닫을 때 오디오 자동 정지 및 초기화
  - `personalDetails.audioUrl`로 오디오 파일 경로 지정

#### 15. 코드 리팩토링 및 구조화 (최신)
- ✅ **커스텀 훅 추출**: `hooks/useSectionInView.ts` - 섹션 뷰포트 감지 로직 통합
- ✅ **유틸리티 함수 통합**:
  - `utils/date.ts`: 날짜 포맷팅 함수 (`getTodayDateString`, `formatDate`)
  - `utils/image.ts`: 이미지 에러 핸들링 함수 (`handleImageError`)
  - `utils/scroll.ts`: 스크롤 유틸리티 함수 (`scrollToSection`)
  - `utils/api.ts`: API 에러 핸들링 함수 (`handleApiError`)
- ✅ **상수 정의**: `constants/animations.ts` - 애니메이션 duration 상수화 (FAST, NORMAL, SLOW)
- ✅ **공통 모달 컴포넌트**: `components/ui/BaseModal.tsx` - 모든 모달의 공통 로직 통합
- ✅ **코드 정리**:
  - 사용하지 않는 패키지 제거 (`@libsql/client`, `@prisma/adapter-libsql`)
  - 주석 처리된 코드 제거
  - 개발용 `console.log` 제거
  - 불필요한 import 제거
  - 인라인 스타일 제거
  - 불필요한 변수 제거
- ✅ **메모이제이션**: `Certifications.tsx`의 `duplicatedCerts` 배열에 `useMemo` 적용
- ✅ **애니메이션 통일**: 모든 섹션 컴포넌트에서 `ANIMATION_DURATION` 상수 사용
- ✅ **모달 배경 색상 통일**: `BaseModal`에서 일관된 스타일 적용
- ✅ **geistMono 폰트 제거**: 사용하지 않는 폰트 제거
- ✅ **VisitCounter 개선**: `label` prop 제거로 인터페이스 단순화

#### 16. 네비게이션 바 개선 (최신)
- ✅ **배경 투명도 조정**: 모든 섹션에서 네비게이션 바 배경을 반투명 40%로 통일 (`bg-gray-900/40 dark:bg-gray-800/40`)
- ✅ **스무스 스크롤 개선**: PC 화면에서 네비게이션 바 버튼 클릭 시 네비게이션 바 높이를 고려한 스무스 스크롤 적용
- ✅ **모바일 네비게이션 바 높이 문제 해결**: `transition-all`을 `transition-colors`로 변경하여 높이 변화 애니메이션 제거
- ✅ **모바일 메뉴 최적화**: 섹션 이동 시 모바일 메뉴가 즉시 제거되도록 개선하여 레이아웃 재계산 시 높이 변화 방지

#### 17. 연락처 섹션 개선 (최신)
- ✅ **이메일 버튼 기능 추가**: 연락처 섹션의 이메일 버튼 클릭 시 메시지 보내기 폼으로 자동 스크롤
- ✅ **메시지 폼 ID 추가**: 메시지 보내기 폼에 `id="contact-form"` 추가하여 스크롤 타겟 지정

#### 18. 방문 카운터 UI 개선 (최신)
- ✅ **테두리 색상 조정**: 라이트 모드에서 방문 카운터 테두리 색상을 `border-gray-200`으로 변경하여 더 연한 색상 적용

#### 19. 자격 및 수상 섹션 개선 (최신)
- ✅ **일시정지 툴팁 추가**: 마우스 호버 시 슬라이드가 일시정지되며 "일시정지 중 · 마우스를 떼면 재생" 툴팁 표시
- ✅ **툴팁 깜빡임 효과**: 툴팁이 깜빡이는 애니메이션으로 사용자 주의 유도
- ✅ **모바일 최적화**: 모바일에서는 툴팁이 표시되지 않으며, 이미지 클릭 시에도 슬라이드가 계속 진행됨
- ✅ **툴팁 스타일**: 반투명 70% 배경, 블러 효과, 그림자 적용

#### 20. 학력 및 병적 섹션 개선 (최신)
- ✅ **타입 구분 추가**: `Education` 인터페이스에 `type?: "education" | "military"` 필드 추가
- ✅ **아이콘 분리**: 
  - 학력 항목: `GraduationCap` 아이콘 (학사 모자)
  - 군복무 항목: `Shield` 아이콘 (방패)
- ✅ **조건부 아이콘 렌더링**: 데이터의 `type` 필드에 따라 적절한 아이콘 자동 표시

#### 21. 프로젝트 섹션 개선 (최신)
- ✅ **썸네일 이미지 지원**: 프로젝트에 썸네일 이미지 추가 가능 (`image` 필드)
- ✅ **GIF 이미지 지원**: GIF 파일을 썸네일로 사용 가능
- ✅ **유튜브 링크 추가**: 프로젝트에 유튜브 링크 필드 추가 (`youtube` 필드)
- ✅ **유튜브 아이콘**: 빨간색 계열의 유튜브 아이콘으로 시각적 구분
- ✅ **링크 레이아웃**: 여러 링크(사이트, 코드, 유튜브)가 있을 때 자동 줄바꿈 지원

#### 22. 인적사항 모달 레이아웃 개선 (최신)
- ✅ **MBTI와 특징 한 줄 표시**: MBTI와 특징을 `grid-cols-2`로 한 줄에 균등 분할 표시
- ✅ **생년월일과 특징 줄 맞춤**: 생년월일과 특징이 같은 세로 줄에 정렬되도록 `grid-cols-3` 레이아웃 적용
- ✅ **자기 소개 스타일 통일**: 자기 소개에도 가치관과 동일한 좌측 초록색 세로줄 (`border-teal-400`) 추가
- ✅ **일관된 디자인**: 가치관과 자기 소개가 동일한 스타일로 통일되어 시각적 일관성 향상

## 🚀 실행 방법

### 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
RESEND_API_KEY="re_your_api_key_here"
```

**⚠️ 중요: `.env` 파일 인코딩**
- `.env` 파일은 **반드시 UTF-8 인코딩**으로 저장해야 합니다.
- UTF-16으로 저장하면 환경 변수를 읽지 못하거나 한자로 깨져 보일 수 있습니다.
- **인코딩 확인 방법:**
  - Windows 메모장: "다른 이름으로 저장" → 인코딩을 "UTF-8"로 선택
  - VS Code/Cursor: 우측 하단 인코딩 표시 클릭 → "Save with Encoding" → "UTF-8" 선택
  - 파일이 이미 UTF-16으로 저장된 경우: "Reopen with Encoding" → "UTF-16 LE" 선택 후 내용 확인 → "Save with Encoding" → "UTF-8"로 재저장
- **파일 형식:**
  - 각 줄은 `KEY=VALUE` 형식 (공백 없이, 따옴표는 선택사항)
  - 주석은 `#`으로 시작
  - 예: `DATABASE_URL=postgresql://...` 또는 `DATABASE_URL="postgresql://..."`

### 데이터베이스 마이그레이션
```bash
# Prisma 마이그레이션 실행
npx prisma migrate dev

# Prisma Client 생성
npx prisma generate
```

### 개발 서버 실행
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 데이터베이스 관리
```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio
```

## 📝 데이터 수정 방법

이력서 내용을 수정하려면 `data/resume-data.ts` 파일을 편집하세요:

- `personalInfo`: 개인 정보
  - `typingTexts`: 타이핑 애니메이션에 사용될 텍스트 배열
  - `personalDetails`: 인적사항 정보
    - `birthDate`: 생년월일
    - `gender`: 성별
    - `introduction`: 자기소개 텍스트
    - `audioUrl`: 자기소개 오디오 파일 경로 (선택사항)
    - `mbti`: MBTI (선택사항)
    - `traits`: 특징 배열 (선택사항)
    - `values`: 가치관 배열 (선택사항)
- `experiences`: 경력 사항
- `skills`: 기술 스택 (이미지 및 링크 포함)
- `projects`: 프로젝트
- `education`: 학력
- `certifications`: 자격 및 수상 (이미지, 이름, 취득월, 타입)

데이터만 수정하면 자동으로 페이지에 반영됩니다.

### 인적사항 수정 예시
```typescript
personalDetails: {
  birthDate: "1993.02.05",
  gender: "남자",
  introduction: "자기소개 텍스트...",
  audioUrl: "/audio/introduction.mp3", // 선택사항: 오디오 파일 경로
  mbti: "INFP", // 선택사항
  traits: ["묵묵한 실행력", "맡은 역할에 대한 책임감"], // 선택사항
  values: ["작은 일이라도 도움이 되었다고 느낄때"], // 선택사항
}
```

### 기술 스택 수정 예시
```typescript
skills: [
  {
    category: "프론트엔드",
    items: [
      { 
        name: "React", 
        image: "/tech-icons/react.svg",  // 선택사항
        link: "https://react.dev"        // 선택사항
      },
    ],
  },
]
```

**파일 위치**: 
- 기술 스택 아이콘: `public/tech-icons/` 폴더에 SVG 파일을 추가하세요
- 자격증/수상 이미지: `public/certifications/` 폴더에 이미지 파일을 추가하세요
- 오디오 파일: `public/audio/` 폴더에 MP3 파일을 추가하세요 (예: `introduction.mp3`)

### 자격 및 수상 수정 예시
```typescript
certifications: [
  {
    id: "cert-1",
    name: "정보처리기사",
    image: "/certifications/info-processor.png",
    acquiredDate: "2024.01",
    type: "certification", // 또는 "award"
  },
]
```

## 🎨 커스터마이징

### 색상 테마 변경
- `app/globals.css`에서 CSS 변수 수정
- 컴포넌트에서 Tailwind 클래스 색상 변경

### 애니메이션 조정
- `framer-motion`의 `transition` 속성 수정
- `app/globals.css`의 `@keyframes blob` 수정
- `app/globals.css`의 `@keyframes blink-fast`로 커서 깜빡임 속도 조정
- `constants/animations.ts`의 `ANIMATION_DURATION` 상수로 애니메이션 속도 통일 관리
  - `ANIMATION_DURATION.FAST` (0.3초)
  - `ANIMATION_DURATION.NORMAL` (0.6초)
  - `ANIMATION_DURATION.SLOW` (1.0초)
- `components/ui/modal-animations.ts`의 `modalCardVariants.transition.duration`으로 모달 애니메이션 속도 조정 (모든 모달에 일괄 적용)
- `components/sections/Certifications.tsx`의 `speed` 변수로 슬라이드 이동 속도 조정

### 컴포넌트 추가/수정
- **새 섹션 추가**: `components/sections/` 폴더에 새 컴포넌트 생성 후 `app/page.tsx`에 import
  - `useSectionInView` 훅 사용 권장 (`hooks/useSectionInView.ts`)
  - `ANIMATION_DURATION` 상수 사용 권장 (`constants/animations.ts`)
- **레이아웃 수정**: `components/layout/` 폴더의 컴포넌트 수정
- **UI 컴포넌트 추가**: `components/ui/` 폴더에 재사용 가능한 컴포넌트 추가
- **모달 추가**: `components/ui/BaseModal.tsx`를 사용하여 새로운 모달 컴포넌트 생성
  - 예: `PersonalInfoModal.tsx`, `ImageModal.tsx`, `VisitCounterModal.tsx` 참고
  - `BaseModal`의 `title`, `titleIcon`, `maxWidth` props 활용
- **유틸리티 함수 사용**: 
  - 날짜 포맷팅: `utils/date.ts`의 `formatDate` 함수
  - 이미지 에러 핸들링: `utils/image.ts`의 `handleImageError` 함수
  - 스크롤 이동: `utils/scroll.ts`의 `scrollToSection` 함수
  - API 에러 핸들링: `utils/api.ts`의 `handleApiError` 함수

### 파비콘 설정
- `app/icon.png` 파일을 추가하면 자동으로 파비콘으로 인식됩니다
- Next.js 13+ App Router에서는 `app/icon.png`가 자동으로 `/icon` 경로로 제공됩니다
- 권장 크기: 최소 512x512px, 불투명 배경 사용

### 기술 스택 아이콘 추가
- `public/tech-icons/` 폴더에 SVG 아이콘 파일을 추가하세요
- 파일명은 `data/resume-data.ts`의 `image` 필드와 일치해야 합니다
- 예: `react.svg`, `angular.svg`, `nextjs.svg` 등
- 이미지가 없어도 텍스트만으로 표시됩니다

### 자격증/수상 이미지 추가
- `public/certifications/` 폴더에 이미지 파일을 추가하세요
- 파일명은 `data/resume-data.ts`의 `image` 필드와 일치해야 합니다
- 권장 형식: PNG, JPG (최적화된 이미지 권장)
- 이미지가 없으면 기본 placeholder가 표시됩니다

### 오디오 파일 추가
- `public/audio/` 폴더에 오디오 파일을 추가하세요
- 파일명은 `data/resume-data.ts`의 `personalDetails.audioUrl` 필드와 일치해야 합니다
- 권장 형식: MP3 (최적화된 오디오 권장)
- `audioUrl`이 설정되면 인적사항 모달의 자기소개 옆에 재생 버튼이 표시됩니다

## 📦 사용된 기술 스택

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Scroll Detection**: React Intersection Observer
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7
- **Database Adapter**: @prisma/adapter-pg
- **Email Service**: Resend
- **Environment Variables**: dotenv

## ✨ 최신 기능 (2026년)

### 인적사항 모달
- Hero 섹션의 인적사항 버튼을 클릭하면 모달이 나타납니다
- 이름, 생년월일, 성별, MBTI, 특성, 가치관, 자기소개 정보를 표시
- 자기소개 오디오 재생 기능 (재생/일시정지)
- 3D 카드 뒤집기 애니메이션 효과
- 반투명 배경과 텍스트 그림자로 가독성 향상

### 타이핑 애니메이션
- Hero 섹션에 동적 타이핑 애니메이션 추가
- `typingTexts` 배열의 텍스트가 순환하며 타이핑/삭제 효과
- 커서 깜빡임 애니메이션 (0.8초 주기)

### UI 개선
- "스크롤하여 더 보기" 텍스트 크기 반응형 조정 (PC에서 더 크게)
- 파비콘 자동 인식 (`app/icon.png`)
- 기술 태그 그라데이션 효과 (Skills 섹션)
- 기술 스택 아이콘 이미지 지원 (좌측에 표시)
- 기술 스택 클릭 시 공식 사이트로 이동 기능
- 경력 섹션 태그 스타일 통일 (Projects 섹션과 동일, rounded-lg)
- 자격 및 수상 섹션 추가 (이미지 슬라이드, 무한 루프, 호버 일시정지)
- 자격증/수상 태그에 이모지 추가 (📜 자격증, 🏆 수상)
- 이미지 확대 모달 기능 (자격 및 수상 섹션)
- 모달 애니메이션 재활용 구조화 (`modal-animations.ts`)
- Hero 섹션 연락처 버튼 모바일 반응형 (아이콘만 표시)
- Hero 섹션 버튼 클릭 시 연락처 섹션으로 스크롤 이동
- 인적사항 모달 레이아웃 개선 (이름/생년월일/성별 한 줄, 자기소개 맨 아래)
- 인적사항 모달에 오디오 재생 기능 추가
- 방문 카운터 숫자 애니메이션 개선 (변경된 숫자만 애니메이션)

### 방문 카운터 기능
- 실시간 방문 카운트 추적 (날짜별)
- 디지털 디스플레이 스타일 카운터 UI
- 변경된 숫자만 애니메이션 효과 (위에서 아래로 페이드)
- 자동 카운트 증가 및 실시간 업데이트 (4초마다)
- PostgreSQL 데이터베이스 연동
- 방문 카운터 클릭 시 일자별 통계 모달 표시
- 라이트 모드에서 연한 테두리 색상 적용 (`border-gray-200`)

### 네비게이션 바 기능
- 모든 섹션에서 반투명 40% 배경 유지
- PC 화면에서 섹션 이동 시 스무스 스크롤 (네비게이션 바 높이 고려)
- 모바일 메뉴 최적화로 높이 변화 문제 해결
- 활성 섹션 하이라이트

### 연락처 메시지 전송 기능
- Resend를 통한 이메일 전송
- 연락처 폼에서 이름, 이메일, 메시지 입력
- 입력 검증 (필수 필드, 이메일 형식)
- 선택적 데이터베이스 저장 (Prisma)
- 전송 상태 표시 (로딩, 성공, 에러)
- 에러 핸들링 통합 (`utils/api.ts`)

### 코드 구조화 및 리팩토링
- 커스텀 훅 추출 (`hooks/useSectionInView.ts`)
- 유틸리티 함수 통합 (`utils/` 폴더)
- 상수 정의 (`constants/animations.ts`)
- 공통 모달 컴포넌트 (`components/ui/BaseModal.tsx`)
- 코드 중복 제거 및 유지보수성 향상
- 타입 안정성 강화

## 🔄 향후 개선 사항

- [ ] 이미지 업로드 및 관리 기능
- [ ] 다국어 지원
- [ ] PDF 다운로드 기능
- [ ] 블로그/아티클 섹션 추가
- [ ] 소셜 미디어 링크 통합
- [ ] 성능 최적화 (이미지 lazy loading 등)
- [ ] 인적사항 모달에 추가 정보 섹션 확장 가능

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
