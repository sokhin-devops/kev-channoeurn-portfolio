/**
 * All personal information used across the portfolio lives here.
 * Update this file to change contact details, education, skills or links.
 */

export const profile = {
  name: 'Kev Channoeurn',
  firstName: 'Kev',
  initials: 'KC',
  role: 'Front-End Developer',
  subtitle: 'Computer Science Student',
  tagline: 'Building, learning, and improving one project at a time.',
  heroDescription:
    'Computer Science student passionate about building clean, responsive and user-friendly web experiences with React and modern web technologies.',
  availability: 'Open to internship opportunities',

  location: 'Tuol Sangke 1, Phnom Penh, Cambodia',
  city: 'Phnom Penh, Cambodia',
  email: 'channoeurnkeo@gmail.com',
  phone: '086 471 820',
  // International format for the tel: link (Cambodia country code +855).
  phoneHref: 'tel:+85586471820',

  languages: ['Khmer', 'English'],

  // Add real URLs here later. `null` shows a "Coming Soon" placeholder instead of a link.
  links: {
    github: null,
  },
}

export const aboutParagraphs = [
  "I'm a Computer Science student at the Royal University of Phnom Penh with a strong interest in Front-End Development. I enjoy turning ideas into interfaces that are clean, responsive and easy to use.",
  "Right now I'm focused on learning React and modern web development. I build small, practical projects, like a task manager, a shop dashboard and a weather app, so I can practise real-world patterns such as state management, working with APIs and responsive layouts.",
  "Every project helps me improve my problem-solving skills. I'm looking for an internship where I can learn from experienced developers, contribute to real products and keep growing as a developer.",
]

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Building interfaces and interactions',
    icon: 'layout',
    skills: [
      { name: 'HTML', icon: 'file-code', note: 'Semantic markup' },
      { name: 'CSS', icon: 'palette', note: 'Responsive layouts' },
      { name: 'JavaScript', icon: 'braces', note: 'ES6+ fundamentals' },
      { name: 'React.js', icon: 'atom', note: 'Components & hooks' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Server-side basics and APIs',
    icon: 'server',
    skills: [
      { name: 'PHP', icon: 'code', note: 'Server-side scripting' },
      { name: 'Postman', icon: 'send', note: 'Testing API requests' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Storing and querying data',
    icon: 'database',
    skills: [
      { name: 'MySQL', icon: 'database', note: 'Relational databases' },
      { name: 'XAMPP', icon: 'hard-drive', note: 'Local server setup' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Version control & editor',
    icon: 'wrench',
    skills: [
      { name: 'Git', icon: 'git-branch', note: 'Version control' },
      { name: 'GitHub', icon: 'github', note: 'Code hosting' },
      { name: 'Visual Studio Code', icon: 'terminal', note: 'Code editor' },
    ],
  },
]

export const softSkills = [
  { name: 'Problem-solving', icon: 'puzzle' },
  { name: 'Teamwork', icon: 'users' },
  { name: 'Adaptability', icon: 'refresh' },
]

export const experience = [
  {
    role: 'Cashier',
    organization: 'Zebra Mart',
    period: '2024 – 2025',
    type: 'Retail',
    summary:
      'Worked at the checkout, serving customers and handling payments in a retail store.',
    transferableSkills: [
      'Customer communication',
      'Responsibility',
      'Teamwork',
      'Attention to detail',
      'Working under pressure',
    ],
  },
]

export const education = [
  {
    degree: "Bachelor's of Computer Science",
    school: 'Royal University of Phnom Penh',
    period: '2023 – Present',
    current: true,
    summary:
      'Studying the foundations of computer science, programming and problem-solving, alongside self-directed Front-End projects.',
  },
  {
    degree: 'High School',
    school: 'Rongkor High School',
    period: '2020 – 2023',
    current: false,
    summary: 'Completed high school education.',
  },
]

export const interests = [
  {
    title: 'Exploring new technologies',
    description: 'Trying new tools and ideas in the web ecosystem.',
    icon: 'compass',
  },
  {
    title: 'Building real-world projects',
    description: 'Learning by making apps that solve everyday problems.',
    icon: 'hammer',
  },
  {
    title: 'Improving problem-solving skills',
    description: 'Breaking problems down and finding clear solutions.',
    icon: 'lightbulb',
  },
  {
    title: 'Participating in developer communities',
    description: 'Learning from and sharing with other developers.',
    icon: 'message-circle',
  },
]
