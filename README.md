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

#### 3. 프로젝트 구조
```
resume-v1/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 레이아웃 설정
│   └── globals.css       # 전역 스타일 및 애니메이션
├── components/
│   ├── sections/         # 페이지 섹션 컴포넌트들
│   │   ├── Hero.tsx      # 히어로 섹션 (메인 소개)
│   │   ├── Experience.tsx # 경력 섹션
│   │   ├── Skills.tsx    # 기술 스택 섹션
│   │   ├── Projects.tsx  # 프로젝트 섹션
│   │   ├── Education.tsx # 학력 섹션
│   │   ├── Certifications.tsx # 자격 및 수상 섹션
│   │   └── Contact.tsx   # 연락처 섹션
│   ├── layout/           # 레이아웃 관련 컴포넌트
│   │   └── Navigation.tsx # 네비게이션 바
│   └── ui/               # 재사용 가능한 UI 컴포넌트
│       ├── Section.tsx   # 재사용 가능한 섹션 래퍼
│       ├── ThemeToggle.tsx # 다크 모드 토글 버튼
│       ├── PersonalityModal.tsx # 성향 정보 모달
│       ├── ImageModal.tsx # 이미지 확대 모달
│       └── modal-animations.ts # 모달 애니메이션 variants (재활용)
├── contexts/            # React Context
│   └── ThemeContext.tsx # 다크 모드 테마 관리
└── data/
    └── resume-data.ts    # 이력서 데이터 (중앙 집중식 관리)
```

**구조화 특징:**
- **sections/**: 페이지의 주요 섹션 컴포넌트들을 그룹화
- **layout/**: 레이아웃 관련 컴포넌트 (네비게이션, 헤더, 푸터 등)
- **ui/**: 재사용 가능한 범용 UI 컴포넌트
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
- ✅ 성향 정보 모달 팝업 (클릭 시 카드 뒤집기 애니메이션)

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
1. **Hero**: 이름, 직책, 소개, 연락처 버튼, 타이핑 애니메이션, 성향 정보 모달
2. **Experience**: 경력 사항 (타임라인 형식)
3. **Skills**: 기술 스택 (카테고리별, 그라데이션 태그, 아이콘 이미지, 링크)
4. **Projects**: 프로젝트 포트폴리오
5. **Education**: 학력 사항
6. **Certifications**: 자격 및 수상 (이미지 슬라이드, 무한 루프, 이미지 확대)
7. **Contact**: 연락처 및 메시지 폼

#### 7. 성향 정보 모달 기능 (최신)
- ✅ Hero 섹션의 "성향" 텍스트 클릭 시 모달 표시
- ✅ MBTI, 특성, 가치관 정보 표시
- ✅ 카드 뒤집기 애니메이션 (3D 회전 효과, 0.7초 duration)
- ✅ 80% 반투명 배경 + 블러 효과
- ✅ 텍스트 그림자 효과로 가독성 향상
- ✅ Info 아이콘 포함
- ✅ 배경 클릭 또는 X 버튼으로 닫기
- ✅ `data/resume-data.ts`의 `personality` 객체로 데이터 관리

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
- ✅ PersonalityModal과 ImageModal에서 동일한 애니메이션 사용
- ✅ 코드 중복 제거 및 유지보수성 향상
- ✅ 향후 새로운 모달 추가 시 쉽게 재사용 가능

## 🚀 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📝 데이터 수정 방법

이력서 내용을 수정하려면 `data/resume-data.ts` 파일을 편집하세요:

- `personalInfo`: 개인 정보
  - `typingTexts`: 타이핑 애니메이션에 사용될 텍스트 배열
  - `personality`: 성향 정보 (MBTI, 특성, 가치관)
- `experiences`: 경력 사항
- `skills`: 기술 스택 (이미지 및 링크 포함)
- `projects`: 프로젝트
- `education`: 학력
- `certifications`: 자격 및 수상 (이미지, 이름, 취득월, 타입)

데이터만 수정하면 자동으로 페이지에 반영됩니다.

### 성향 정보 수정 예시
```typescript
personality: {
  mbti: "INFP",
  traits: ["묵묵한 실행력", "끈기"],
  values: ["작은 일이라도 도움이 되었다고 느낄때"],
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

**이미지 파일 위치**: 
- 기술 스택 아이콘: `public/tech-icons/` 폴더에 SVG 파일을 추가하세요
- 자격증/수상 이미지: `public/certifications/` 폴더에 이미지 파일을 추가하세요

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
- `components/ui/modal-animations.ts`의 `modalCardVariants.transition.duration`으로 모달 애니메이션 속도 조정 (모든 모달에 일괄 적용)
- `components/sections/Certifications.tsx`의 `speed` 변수로 슬라이드 이동 속도 조정

### 컴포넌트 추가/수정
- **새 섹션 추가**: `components/sections/` 폴더에 새 컴포넌트 생성 후 `app/page.tsx`에 import
- **레이아웃 수정**: `components/layout/` 폴더의 컴포넌트 수정
- **UI 컴포넌트 추가**: `components/ui/` 폴더에 재사용 가능한 컴포넌트 추가
- **모달 추가**: `components/ui/modal-animations.ts`의 variants를 import하여 새로운 모달 컴포넌트 생성 (예: `ImageModal.tsx`, `PersonalityModal.tsx` 참고)

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

## 📦 사용된 기술 스택

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Scroll Detection**: React Intersection Observer

## ✨ 최신 기능 (2026년)

### 성향 정보 모달
- Hero 섹션의 "성향" 텍스트를 클릭하면 모달이 나타납니다
- MBTI, 특성, 가치관 정보를 카드 형식으로 표시
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

## 🔄 향후 개선 사항

- [ ] 이미지 업로드 및 관리 기능
- [ ] 다국어 지원
- [ ] PDF 다운로드 기능
- [ ] 블로그/아티클 섹션 추가
- [ ] 소셜 미디어 링크 통합
- [ ] 성능 최적화 (이미지 lazy loading 등)
- [ ] 성향 정보 모달에 추가 정보 섹션 확장 가능

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
