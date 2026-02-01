// 이력서 데이터 - 유지보수를 위해 중앙 집중식으로 관리
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
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
}

export const personalInfo: PersonalInfo = {
  name: "홍길동",
  title: "풀스택 개발자",
  email: "hong@example.com",
  phone: "010-1234-5678",
  location: "서울, 대한민국",
  bio: "열정적인 개발자로서 사용자 경험을 중시하며, 최신 기술 트렌드를 학습하고 적용하는 것을 즐깁니다. 팀과의 협업을 통해 더 나은 솔루션을 만들어가는 것을 목표로 합니다.",
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "테크 스타트업",
    position: "시니어 프론트엔드 개발자",
    period: "2022.01 - 현재",
    description: [
      "React와 Next.js를 활용한 웹 애플리케이션 개발 및 유지보수",
      "팀 리드로서 코드 리뷰 및 기술적 의사결정 참여",
      "성능 최적화를 통한 페이지 로딩 속도 40% 개선",
      "TypeScript 도입으로 타입 안정성 향상",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    company: "웹 에이전시",
    position: "프론트엔드 개발자",
    period: "2020.06 - 2021.12",
    description: [
      "다양한 클라이언트 프로젝트의 프론트엔드 개발 담당",
      "반응형 웹 디자인 구현 및 크로스 브라우저 호환성 확보",
      "RESTful API 연동 및 상태 관리 구현",
    ],
    technologies: ["React", "Vue.js", "JavaScript", "SCSS"],
  },
];

export const skills: Skill[] = [
  {
    category: "프론트엔드",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "백엔드",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    category: "도구",
    items: ["Git", "Docker", "AWS", "Figma", "VS Code"],
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

export const education: Education[] = [
  {
    school: "서울대학교",
    degree: "컴퓨터공학과 학사",
    period: "2016.03 - 2020.02",
    description: "컴퓨터 과학 기초 이론 및 소프트웨어 공학을 전공했습니다.",
  },
];
