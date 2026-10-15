// All portfolio content lives here. Edit this file to update the site.
// Links set to null are simply hidden on the page.

export const profile = {
  name: 'Jyotish Kumar',
  location: 'Indore, Madhya Pradesh',
  email: 'jyotishkumarjhar@gmail.com',
  github: 'https://github.com/Jyotishkumar-dev',
  linkedin: 'https://www.linkedin.com/in/jyotish-kr-verma-0601bb387/',
  leetcode: 'https://leetcode.com/u/SlODyP2b3e/',
  // Put your PDF in /public (for example /public/Jyotish_Kumar_Resume.pdf) and set the path here.
  resume: null,
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const education = [
  {
    school: 'SAGE University, Indore (Alta School of Technology)',
    degree: 'B.Tech in Computer Science and Technology',
    period: 'Aug 2025 to present',
    score: 'CGPA 7.8',
  },
  {
    school: 'Kishan Mazdoor Inter College, Giddi C',
    degree: '12th, Science',
    period: '2022 to 2024',
    score: '72.5%',
  },
  {
    school: 'High School Petarwar, Bokaro',
    degree: '10th, Science',
    period: '2021 to 2022',
    score: '69.8',
  },
]

export const projects = [
  {
    title: 'SmartAttend',
    tagline: 'Attendance management for a whole college',
    description:
      'A role-based system for Students, Faculty, HODs, Admins and Super Admins, with a dashboard built for each role.',
    points: [
      'JWT authentication with refresh tokens, bcrypt password hashing and role-based authorization',
      'CRUD modules for academic data and attendance analytics per role',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Drizzle ORM', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/Jyotishkumar-dev/Attendance-Management-System-Project',
    live: 'https://attendance-management-system-projec-steel.vercel.app',
  },
  {
    title: 'KrishiFleet AI',
    tagline: 'Farm equipment hire, matched to the job',
    description:
      'A platform that connects farmers with Custom Hiring Centre (CHC) operators to find and book farm equipment. Built as the technical lead at SQUidHACK 2026.',
    points: [
      'Explainable recommendations from crop, task, land size, availability, distance and price',
      'Booking workflows with availability, demand, pricing, fleet utilization and maintenance signals, plus alternative equipment suggestions',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'React Hook Form', 'Zod', 'Recharts'],
    github: 'https://github.com/Jyotishkumar-dev/SquidHack--Project-_KrishiFleet-AI',
    live: 'https://squid-hack-project-krishi-fleet-ai.vercel.app',
  },
  {
    title: 'RESTOCK AI',
    tagline: 'Giving electronic waste a second life',
    description:
      'A resource recovery and e-waste reuse platform that connects businesses with authorized recyclers.',
    points: ['Deployed on Vercel', 'Repository name: DEAD-STOCK'],
    stack: ['TypeScript', 'Vite', 'Node.js', 'Firebase'],
    github: 'https://github.com/Jyotishkumar-dev/DEAD-STOCK-',
    live: 'https://dead-stock-eta.vercel.app',
  },
  {
    title: 'Campus Resolve',
    tagline: 'From hostel and mess feedback to a verified fix',
    description:
      'A service management platform where feedback is reported, prioritised, acted on by staff, verified by the student who raised it, and fed back into analytics. Student, admin and staff portals are in place; the Supabase backend is the next phase.',
    points: [
      'Role portals with issue registers, status timelines and analytics charts',
      'Typed forms validated with Zod, and a shared design system for statuses and priorities',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Zod', 'Recharts'],
    github: 'https://github.com/Jyotishkumar-dev/Hostel-Mess-Service-Management-Platform',
    live: 'https://hostel-mess-service-management-plat.vercel.app',
  },
]

export const experience = [
  {
    role: 'Core Member',
    org: 'Social Media & Tech Club, Alta School of Technology',
    period: 'Aug 2026 to present',
    points: ['Contributing to the club’s technical and community activities.'],
  },
  {
    role: 'College Ambassador',
    org: 'Techfest, IIT Bombay',
    period: '2026 to present',
    points: [
      'Representing Techfest at my college and supporting outreach and event activities.',
      'Helping coordinate a planned robotics workshop.',
    ],
  },
  {
    role: 'Technical Lead',
    org: 'SQUidHACK 2026',
    period: 'Aug 2026',
    points: [
      'Led the technical development of KrishiFleet AI in a 24-hour hackathon.',
      'Owned architecture decisions, debugging, feature integration and prototype delivery.',
    ],
  },
  {
    role: 'Graphic Designer and Organizing Committee Member',
    org: 'Arkfest ’26',
    period: '2026 to present',
    points: ['Creating graphics and visual communication for the event as part of the organizing committee.'],
  },
  {
    role: 'Graphic Designer and Organizing Committee Member',
    org: 'UDBHAV AI Sprint’26',
    period: '2026 to present',
    points: ['Creating graphics and visual communication for the event as part of the organizing committee.'],
  },
]

export const skills = [
  { group: 'Languages', icon: 'code', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++'] },
  { group: 'Frontend', icon: 'layout', items: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { group: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { group: 'Databases', icon: 'database', items: ['PostgreSQL', 'MongoDB', 'SQL'] },
  { group: 'Tools', icon: 'wrench', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'JWT', 'Drizzle ORM'] },
  {
    group: 'Core concepts',
    icon: 'brain',
    items: ['OOP', 'Data Structures & Algorithms', 'DBMS', 'Authentication', 'Role-Based Access Control'],
  },
]

export const certifications = [
  { name: 'TCS iON Career Edge: Young Professional', issuer: 'TCS iON' },
  { name: 'C++ Essentials 1', issuer: 'Cisco Networking Academy' },
  { name: 'Introduction to Generative AI Studio', issuer: 'Simplilearn SkillUP' },
  { name: 'AI & ML Workshop', issuer: 'PHN Technology with IIT Patna' },
]

export const achievement = {
  count: 55,
  text: 'programming problems solved on LeetCode, focused on problem solving and core data structures.',
}
