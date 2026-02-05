// 이력서 데이터 - 유지보수를 위해 중앙 집중식으로 관리
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage?: string;
  typingTexts?: string[];
  personalDetails?: {
    birthDate: string;
    gender: string;
    introduction: string;
    mbti?: string;
    traits?: string[];
    values?: string[];
    audioUrl?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
  logo?: string; // 회사 로고 이미지 경로 (선택사항)
  link?: string; // 회사 웹사이트 링크 (선택사항)
}

export interface SkillItem {
  name: string;
  image?: string;
  link?: string;
}

export interface Skill {
  category: string;
  items: (string | SkillItem)[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description?: string;
  type?: "education" | "military"; // 학력 또는 군복무 구분
}

export interface Certification {
  id: string;
  name: string;
  image: string;
  acquiredDate: string; // 취득월 (예: "2024.01")
  type: "certification" | "award"; // 자격증 또는 수상
}

export const personalInfo: PersonalInfo = {
  name: "조성만",
  title: "풀스택 개발자",
  email: "sungman93.dev@gmail.com",
  phone: "010-5094-5763",
  location: "수원시 영통구",
  bio: "다양한 업무 중, 성향에 맞는 영역에서 기여하고 싶어요.",
  profileImage: "/profile.jpg",
  // typingTexts: [
  //   "유지보수",
  //   "PC조립",
  //   "모니터링",
  //   "웹 개발자",
  //   "전산보조",
  // ],
  typingTexts: [
    "기본을 중시",
    "책임감 기반",
    "성실함",
    "업무 몰입형",
    "지속성"
  ],
  personalDetails: {
    birthDate: "1993.02.05",
    gender: "남자",
    introduction: "Java, Python, Next.js 기반의 웹 구축 경험이 있으며, 반복적인 업무를 통해 완성도를 높여가는 데 강점이 있어 개발 직무에만 국한하지 않고 다양한 업무 방향을 열어두고 있습니다. 연봉보다는 직무 적합성과 지속 가능성을 기준으로 지원하고 있습니다 :D",
    audioUrl: "/audio/introduction.mp3", // public 폴더 기준 경로 (샘플파일)
    mbti: "INFP",
    traits: ["묵묵한 실행력", "맡은 역할에 대한 책임감"],
    values: ["작은 일이라도 도움이 되었다고 느낄때"],
  },
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "우아한정리",
    position: "웹·자동화 개발",
    period: "2023.01 - 2026-02-10",
    description: [
      "고객 입력폼 기반 웹사이트 구축을 통해 접수 및 관리 업무 효율화",
      "네이버 지식인 자동 답변 시스템 구축",
      "네이버 블로그 콘텐츠 자동 생성·등록 시스템 개발",
      "고객 예약금 실시간 확인 웹사이트 개발",
    ],
    technologies: ["Python","Flask", "React", "Next.js", "TypeScript"],
    logo: "/company-logos/ecolife-balance.png", // 회사 로고 이미지 경로 (선택사항)
    link: "https://www.woowarhanclean.com/", // 회사 웹사이트 링크 (선택사항)
  },
  {
    id: "exp-2",
    company: "메타빌드",
    position: "웹 개발·구축 및 유지보수",
    period: "2020.04 - 2023.01",
    description: [
      "여수 통합플랫폼 구축, 스마트 버스정류장 장비 업체 연계 개발",
      "안산 통합플랫폼 구축, 공공데이터 포털(무더위쉼터) 연계 개발",
      "의정부 통합플랫폼 구축, 스쿨존 장비 업체 연계 개발",
    ],
    technologies: ["Java", "Spring Boot", "Angular"],
    logo: "/company-logos/metabuild.png", // 회사 로고 이미지 경로 (선택사항)
    link: "https://www.metabuild.co.kr/", // 회사 웹사이트 링크 (선택사항)
  },
  {
    id: "exp-3",
    company: "삼성전자",
    position: "PL 서포트",
    period: "2011.01 - 2019-09",
    description: [
      "모바일 시료 배송·회수 및 이력 관리",
      "양산 전 모바일 시료 승인 테스트 수행 및 결과 정리",
    ],
    technologies: [],
    logo: "/company-logos/samsung.png", // 회사 로고 이미지 경로 (선택사항)
    link: "https://www.samsungcareers.com/", // 회사 웹사이트 링크 (선택사항)
  },
];

export const skills: Skill[] = [
  {
    category: "프론트엔드",
    items: [
      { name: "React", image: "/tech-icons/react.svg", link: "https://react.dev" },
      { name: "Angular", image: "/tech-icons/angular.svg", link: "https://angular.io" },
      { name: "Next.js", image: "/tech-icons/nextjs.svg", link: "https://nextjs.org" },
    ],
  },
  {
    category: "백엔드",
    items: [
      { name: "Flask", image: "/tech-icons/flask.svg", link: "https://flask.palletsprojects.com" },
      { name: "Next.js", image: "/tech-icons/nextjs.svg", link: "https://nextjs.org" },
      { name: "Spring Boot", image: "/tech-icons/spring.svg", link: "https://spring.io/projects/spring-boot" },
    ],
  },
  {
    category: "인프라·운영",
    items: [
      { name: "Git", image: "/tech-icons/git.svg", link: "https://git-scm.com" },
      { name: "GCP", image: "/tech-icons/gcp.svg", link: "https://cloud.google.com" },
      { name: "Apache", image: "/tech-icons/apache.svg", link: "https://httpd.apache.org" },
      { name: "Linux", image: "/tech-icons/linux.svg", link: "https://www.linux.org" },
      { name: "Windows Server", image: "/tech-icons/windows.svg", link: "https://www.microsoft.com/windows-server" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "E-Commerce 플랫폼",
    description: "전자상거래 플랫폼을 Next.js와 TypeScript로 구축했습니다. 실시간 재고 관리, 결제 시스템 연동, 관리자 대시보드 등 다양한 기능을 구현했습니다.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe API"],
    link: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: "proj-2",
    title: "실시간 채팅 애플리케이션",
    description: "Socket.io를 활용한 실시간 채팅 애플리케이션입니다. 그룹 채팅, 파일 공유, 이모지 반응 등 다양한 기능을 제공합니다.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/example",
  },
  {
    id: "proj-3",
    title: "날씨 대시보드",
    description: "날씨 API를 활용한 인터랙티브한 대시보드입니다. 애니메이션과 차트를 통해 직관적인 데이터 시각화를 제공합니다.",
    technologies: ["React", "Chart.js", "OpenWeather API"],
    link: "https://example.com",
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "2종보통",
    image: "/certifications/drivers_license.png",
    acquiredDate: "2012.06",
    type: "certification",
  },
  {
    id: "cert-1",
    name: "정보처리산업기사",
    image: "/certifications/info_processor.png",
    acquiredDate: "2013.06",
    type: "certification",
  },
  {
    id: "cert-2",
    name: "컴퓨터활용능력1급",
    image: "/certifications/computer_specialist.png",
    acquiredDate: "2008.09",
    type: "certification",
  },
  {
    id: "cert-2",
    name: "정보기기기능사",
    image: "/certifications/info_equipment_operation_certificate.png",
    acquiredDate: "2006.12",
    type: "certification",
  },
  // {
  //   id: "cert-2",
  //   name: "E-Test(1등급)",
  //   image: "/certifications/sqld.jpg",
  //   acquiredDate: "2016.10",
  //   type: "certification",
  // },
  {
    id: "cert-2",
    name: "ITQ(A등급)",
    image: "/certifications/itq.png",
    acquiredDate: "2006.04~12",
    type: "certification",
  },
  {
    id: "award-1",
    name: "지방기능대회(금)",
    image: "/certifications/Skills_Competition_Gold_Award.png",
    acquiredDate: "2010",
    type: "award",
  },
  {
    id: "award-1",
    name: "전국기능대회(은)",
    image: "/certifications/Skills_Competition_Silver_Award.png",
    acquiredDate: "2010",
    type: "award",
  },
];

export const education: Education[] = [
  {
    school: "대전동아고등학교 졸업",
    degree: "전자정보과",
    period: "2008.03 - 2011.02",
    description: "전자·IT 전반의 기초 지식을 배우며 컴퓨터 활용 역량을 쌓았습니다.",
  },
  {
    school: "육군 병장 만기 복무",
    degree: "행정/PC운용",
    period: "2012.06 - 2014.03",
    description: "행정 업무 지원과 PC·전산 장비 운용을 수행했습니다.",
    type: "military",
  },
];
