/**
 * All personal information used across the portfolio lives here.
 * Update this file to change contact details, education, skills or links.
 */

export const profile = {
  name: 'Kev Channoeurn',
  role: 'Front-End Developer',
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

  // Kev's GitHub profile. While it is `null`, no GitHub icon is shown in the navigation.
  links: {
    github: null,
  },
}

// About: one large statement (from Kev's own words), then a short paragraph.
export const aboutStatement = {
  before: 'I enjoy turning ideas into interfaces that are ',
  highlight: 'clean, responsive',
  after: ' and easy to use.',
}

export const aboutParagraph =
  "I'm a Computer Science student at the Royal University of Phnom Penh, learning React by building small, practical projects. I'm looking for an internship where I can learn from experienced developers and contribute to real products."

// `icon` names are mapped to icons in src/components/ui/Icon.jsx.
export const aboutFacts = [
  { label: 'Based in', value: 'Tuol Sangke 1, Phnom Penh', icon: 'map-pin' },
  { label: 'Studying', value: 'BSc Computer Science, RUPP', icon: 'graduation-cap' },
  { label: 'Languages', value: 'Khmer, English', icon: 'languages' },
  { label: 'Looking for', value: 'Front-End internship', icon: 'target' },
]

export const interests = [
  { label: 'New technologies', icon: 'compass' },
  { label: 'Real-world projects', icon: 'hammer' },
  { label: 'Problem-solving', icon: 'lightbulb' },
  { label: 'Developer communities', icon: 'users' },
]

// `logo` refers to a brand logo in src/data/techIcons.js; `icon` is used when there is no logo.
export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'layout',
    skills: [
      { name: 'HTML', logo: 'html' },
      { name: 'CSS', logo: 'css' },
      { name: 'JavaScript', logo: 'javascript' },
      { name: 'React.js', logo: 'react' },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      { name: 'PHP', logo: 'php' },
      { name: 'Postman', logo: 'postman' },
    ],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: [
      { name: 'MySQL', logo: 'mysql' },
      { name: 'XAMPP', logo: 'xampp' },
    ],
  },
  {
    title: 'Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', logo: 'git' },
      { name: 'GitHub', logo: 'github' },
      { name: 'VS Code', icon: 'code' },
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
    summary: 'Served customers at the checkout and handled payments in a retail store.',
    skills: ['Customer communication', 'Responsibility', 'Teamwork', 'Attention to detail', 'Working under pressure'],
  },
]

export const education = [
  {
    degree: "Bachelor's of Computer Science",
    school: 'Royal University of Phnom Penh',
    period: '2023 – Present',
  },
  {
    degree: 'High School',
    school: 'Rongkor High School',
    period: '2020 – 2023',
  },
]
