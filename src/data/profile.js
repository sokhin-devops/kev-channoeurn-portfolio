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

export const aboutParagraphs = [
  "I'm a Computer Science student at the Royal University of Phnom Penh. I enjoy turning ideas into interfaces that are clean, responsive and easy to use.",
  "Right now I'm learning React by building small, practical projects. I'm looking for an internship where I can learn from experienced developers and contribute to real products.",
]

export const aboutFacts = [
  { label: 'Based in', value: 'Tuol Sangke 1, Phnom Penh' },
  { label: 'Studying', value: 'BSc Computer Science, RUPP' },
  { label: 'Languages', value: 'Khmer, English' },
  {
    label: 'Interests',
    value: 'New technologies, real-world projects, problem-solving, developer communities',
  },
]

export const skillGroups = [
  { title: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React.js'] },
  { title: 'Backend', skills: ['PHP', 'Postman'] },
  { title: 'Database', skills: ['MySQL', 'XAMPP'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Visual Studio Code'] },
  { title: 'Soft skills', skills: ['Problem-solving', 'Teamwork', 'Adaptability'] },
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
