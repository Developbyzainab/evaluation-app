export function getSkillIcon(skillName, category) {
  const skillIcons = {
    // Frontend - Brand Icons
    "HTML": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L4.5 6.5v11l7.5 4.5V17l-7.5-4.5v-8.5L12 4.5z"/>
        <path fill="#fff" d="M12 4.5L4.5 7v11l7.5 4.5V17l-7.5-4.5V7.5L12 4.5zM8 11h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"/>
      </svg>
    ),
    "HTML5": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#E34F26">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L4.5 6.5v11l7.5 4.5V17l-7.5-4.5v-8.5L12 4.5z"/>
        <path fill="#fff" d="M12 4.5L4.5 7v11l7.5 4.5V17l-7.5-4.5V7.5L12 4.5zM8 11h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"/>
      </svg>
    ),
    "CSS": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1572B6">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L4.5 6.5v11l7.5 4.5V17l-7.5-4.5v-8.5L12 4.5z"/>
        <path fill="#fff" d="M12 4.5L4.5 7v11l7.5 4.5V17l-7.5-4.5V7.5L12 4.5zM8 11h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"/>
      </svg>
    ),
    "CSS3": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1572B6">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L4.5 6.5v11l7.5 4.5V17l-7.5-4.5v-8.5L12 4.5z"/>
        <path fill="#fff" d="M12 4.5L4.5 7v11l7.5 4.5V17l-7.5-4.5V7.5L12 4.5zM8 11h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"/>
      </svg>
    ),
    "JavaScript": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#F7DF1E">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12.5h2v2h-2zM11 18h2v-6h-2v6z"/>
      </svg>
    ),
    "TypeScript": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3178C6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "React": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#61DAFB">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.05 14.61L6.7 15.34a.75.75 0 010-1.06l3.24-3.24a.75.75 0 111.06 1.06l-2.34 2.34c-.3.3-.3.78 0 1.06l3.54 3.54a.75.75 0 11-1.06 1.06l-3.54-3.54a.75.75 0 01-1.06 0zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ),
    "Next.js": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Vue.js": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#42B883">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Nuxt.js": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#00C58E">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Angular": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#DD0031">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Svelte": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF3E00">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Tailwind CSS": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),

    // Backend - Brand Icons
    "Node.js": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Express.js": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Python": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Django": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Flask": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "FastAPI": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Java": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Spring Boot": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Go": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Rust": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "C#": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    ".NET": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "PHP": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Laravel": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),

    // Databases - Brand Icons
    "MongoDB": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "PostgreSQL": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "MySQL": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Redis": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Firebase": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),

    // Cloud
    "AWS": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Docker": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Kubernetes": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "Git": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),
    "GitHub": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-2v-6h2v6zm4-6h-2v-4h2v6zm4-2v-4h2v4h-2z"/>
      </svg>
    ),

    // Default category icons (fallback)
    "Frontend": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11m3 5l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    "Backend": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "Database": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 4.667a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V4.667zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm9.667-3.333a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V1.334zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm9.667 3.333a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V4.667zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333z" />
      </svg>
    ),
  };

  // First try exact skill name match
  if (skillIcons[skillName]) {
    return skillIcons[skillName];
  }

  // Fallback to category-based icons
  const categoryIcons = {
    Frontend: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11m3 5l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    Backend: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Database: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 4.667a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V4.667zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm9.667-3.333a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V1.334zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm9.667 3.333a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333zm0 0v14.667a2.4 2.4 0 010 1.333 2.4 2.4 0 010-1.333V4.667zm0 0a2.4 2.4 0 010-1.333 2.4 2.4 0 010 1.333z" />
      </svg>
    ),
    Cloud: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    DevOps: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "Version Control": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182C10.464 6.781 11.232 7 12 7c.725 0 1.45.22 2.003.659 1.172.879 1.172 2.303 0 3.182z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "AI/ML": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    Mobile: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    "UI/UX": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  };

  return categoryIcons[category] || categoryIcons.Frontend;
}

export function getSkillColor(skillName, category) {
  // Brand-specific colors for individual skills
  const brandColors = {
    // Frontend
    "HTML": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "HTML5": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "CSS": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "CSS3": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "JavaScript": "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    "TypeScript": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "React": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "Next.js": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "Vue.js": "border-green-500/30 bg-green-500/10 text-green-400",
    "Nuxt.js": "border-green-500/30 bg-green-500/10 text-green-400",
    "Angular": "border-red-500/30 bg-red-500/10 text-red-400",
    "Svelte": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "SvelteKit": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Astro": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "jQuery": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Bootstrap": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Tailwind CSS": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "Material UI": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Chakra UI": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "Shadcn UI": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "SASS": "border-pink-500/30 bg-pink-500/10 text-pink-400",
    "SCSS": "border-pink-500/30 bg-pink-500/10 text-pink-400",
    "Less": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Web Components": "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    "Responsive Web Design": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "Web Accessibility": "border-green-500/30 bg-green-500/10 text-green-400",
    "Web Performance": "border-amber-500/30 bg-amber-500/10 text-amber-400",
    "SEO": "border-green-500/30 bg-green-500/10 text-green-400",
    "PWA": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Three.js": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "WebGL": "border-red-500/30 bg-red-500/10 text-red-400",
    "Nuxt.js": "border-green-500/30 bg-green-500/10 text-green-400",
    "Astro": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "jQuery": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Bootstrap": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Tailwind CSS": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "Material UI": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Chakra UI": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "Shadcn UI": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "SASS": "border-pink-500/30 bg-pink-500/10 text-pink-400",
    "SCSS": "border-pink-500/30 bg-pink-500/10 text-pink-400",
    "Less": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Web Components": "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    "Responsive Web Design": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "Web Accessibility": "border-green-500/30 bg-green-500/10 text-green-400",
    "Web Performance": "border-amber-500/30 bg-amber-500/10 text-amber-400",
    "SEO": "border-green-500/30 bg-green-500/10 text-green-400",
    "PWA": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Three.js": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "WebGL": "border-red-500/30 bg-red-500/10 text-red-400",

    // Backend
    "Node.js": "border-green-500/30 bg-green-500/10 text-green-400",
    "Express.js": "border-slate-600/30 bg-slate-600/10 text-slate-300",
    "Python": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Django": "border-green-600/30 bg-green-600/10 text-green-300",
    "Flask": "border-slate-600/30 bg-slate-600/10 text-slate-300",
    "FastAPI": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "Java": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Spring Boot": "border-green-600/30 bg-green-600/10 text-green-300",
    "Go": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "Rust": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "C#": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    ".NET": "border-purple-600/30 bg-purple-600/10 text-purple-300",
    "PHP": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Laravel": "border-red-500/30 bg-red-500/10 text-red-400",

    // Databases
    "MongoDB": "border-green-500/30 bg-green-500/10 text-green-400",
    "PostgreSQL": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "MySQL": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Redis": "border-red-500/30 bg-red-500/10 text-red-400",
    "Firebase": "border-orange-400/30 bg-orange-400/10 text-orange-300",
    "Supabase": "border-green-500/30 bg-green-500/10 text-green-400",
    "Prisma": "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",

    "AWS": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Amazon EC2": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Amazon S3": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS Lambda": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS RDS": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS CloudFormation": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS IAM": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS VPC": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS SQS": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS SNS": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "AWS CloudWatch": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Microsoft Azure": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "Azure Functions": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "Azure DevOps": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "Google Cloud": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Google Cloud Platform": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Google Cloud Run": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Google Cloud Functions": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Firebase": "border-orange-400/30 bg-orange-400/10 text-orange-300",
    "Vercel": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "Netlify": "border-teal-500/30 bg-teal-500/10 text-teal-400",
    "DigitalOcean": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Docker": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Docker Compose": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Kubernetes": "border-blue-600/30 bg-blue-600/10 text-blue-300",
    "Jenkins": "border-red-500/30 bg-red-500/10 text-red-400",
    "GitHub Actions": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "GitLab CI/CD": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "CI/CD": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Terraform": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Ansible": "border-red-500/30 bg-red-500/10 text-red-400",
    "Nginx": "border-green-500/30 bg-green-500/10 text-green-400",
    "Apache": "border-red-500/30 bg-red-500/10 text-red-400",
    "Linux": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Ubuntu": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Shell Scripting": "border-green-500/30 bg-green-500/10 text-green-400",
    "Bash": "border-green-500/30 bg-green-500/10 text-green-400",
    "PowerShell": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Monitoring": "border-amber-500/30 bg-amber-500/10 text-amber-400",
    "Infrastructure as Code": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "DevOps": "border-amber-400/20 text-amber-200",

    // Mobile
    "React Native": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "Flutter": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Dart": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Kotlin": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Swift": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Android Development": "border-green-500/30 bg-green-500/10 text-green-400",
    "iOS Development": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "Jetpack Compose": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "SwiftUI": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Dart": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Kotlin": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Swift": "border-orange-500/30 bg-orange-500/10 text-orange-400",

    // AI/ML
    "Artificial Intelligence": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",
    "Machine Learning": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",
    "Deep Learning": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",
    "Generative AI": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "OpenAI API": "border-green-500/30 bg-green-500/10 text-green-400",
    "Prompt Engineering": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Large Language Models": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "LLMs": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Natural Language Processing": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Computer Vision": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Speech Recognition": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "TensorFlow": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "PyTorch": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Scikit-learn": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Pandas": "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    "NumPy": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Matplotlib": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "Hugging Face": "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    "LangChain": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "LlamaIndex": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "RAG": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Fine Tuning": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "AI Agents": "border-purple-500/30 bg-purple-500/10 text-purple-400",
    "Machine Learning Engineering": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",
    "MLOps": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",

    // Version Control
    "Git": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "GitHub": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "GitLab": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "Bitbucket": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    "GitHub Actions": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "GitFlow": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "GitHub Actions": "border-slate-700/30 bg-slate-700/10 text-slate-300",
    "GitLab CI/CD": "border-orange-500/30 bg-orange-500/10 text-orange-400",

    // Other categories fallback
    "Frontend": "border-violet-400/20 text-violet-200",
    "Backend": "border-cyan-400/20 text-cyan-200",
    "Database": "border-emerald-400/20 text-emerald-200",
    "Cloud": "border-orange-400/20 text-orange-200",
    "DevOps": "border-amber-400/20 text-amber-200",
    "Version Control": "border-slate-400/20 text-slate-200",
    "AI/ML": "border-fuchsia-400/20 text-fuchsia-200",
    "Automation": "border-pink-400/20 text-pink-200",
    "Mobile": "border-rose-400/20 text-rose-200",
    "CMS/Ecommerce": "border-lime-400/20 text-lime-200",
    "UI/UX": "border-purple-400/20 text-purple-200",
    "Testing": "border-green-400/20 text-green-200",
    "Security": "border-red-400/20 text-red-200",
    "Software Engineering": "border-indigo-400/20 text-indigo-200",
    "Data": "border-blue-400/20 text-blue-200",
    "Other": "border-white/10 text-zinc-300",
    "Full Stack": "border-violet-400/20 text-violet-200",
  };

  // Check exact skill name first
  if (brandColors[skillName]) {
    return brandColors[skillName];
  }

  // Fallback to category
  const categoryColors = {
    Frontend: "border-violet-400/20 text-violet-200",
    Backend: "border-cyan-400/20 text-cyan-200",
    Database: "border-emerald-400/20 text-emerald-200",
    Cloud: "border-orange-400/20 text-orange-200",
    DevOps: "border-amber-400/20 text-amber-200",
    "Version Control": "border-slate-400/20 text-slate-200",
    "AI/ML": "border-fuchsia-400/20 text-fuchsia-200",
    Automation: "border-pink-400/20 text-pink-200",
    Mobile: "border-rose-400/20 text-rose-200",
    "CMS/Ecommerce": "border-lime-400/20 text-lime-200",
    "UI/UX": "border-purple-400/20 text-purple-200",
    Testing: "border-green-400/20 text-green-200",
    Security: "border-red-400/20 text-red-200",
    "Software Engineering": "border-indigo-400/20 text-indigo-200",
    Data: "border-blue-400/20 text-blue-200",
    Other: "border-white/10 text-zinc-300",
    "Full Stack": "border-violet-400/20 text-violet-200",
  };

  return categoryColors[category] || "border-white/10 text-zinc-300";
}

export function getBrandColor(skillName, category) {
  // Brand-specific hex colors for ALL individual skills
  const brandColorsHex = {
    // Frontend
    "HTML": "#e34f26",
    "HTML5": "#e34f26",
    "CSS": "#1572b6",
    "CSS3": "#1572b6",
    "JavaScript": "#f7df1e",
    "TypeScript": "#3178c6",
    "React": "#61dafb",
    "Next.js": "#ffffff",
    "Vue.js": "#42b883",
    "Nuxt.js": "#00c58e",
    "Angular": "#dd0031",
    "Svelte": "#ff3e00",
    "SvelteKit": "#ff3e00",
    "Astro": "#bc52ee",
    "jQuery": "#0769ad",
    "Bootstrap": "#7952b3",
    "Tailwind CSS": "#06b6d4",
    "Material UI": "#007fff",
    "Chakra UI": "#319795",
    "Shadcn UI": "#ffffff",
    "SASS": "#cc6699",
    "SCSS": "#cc6699",
    "Less": "#3d6b99",
    "Web Components": "#6366f1",
    "Responsive Web Design": "#14b8a6",
    "Web Accessibility": "#22c55e",
    "Web Performance": "#f59e0b",
    "SEO": "#22c55e",
    "PWA": "#a855f7",
    "Three.js": "#f05536",
    "WebGL": "#990000",

    // Backend
    "Node.js": "#339933",
    "Express.js": "#6e6e6e",
    "NestJS": "#e0234e",
    "PHP": "#777bb4",
    "Laravel": "#ff2d20",
    "CodeIgniter": "#ef4223",
    "Python": "#3776ab",
    "Django": "#0d4429",
    "Flask": "#6e6e6e",
    "FastAPI": "#009688",
    "Java": "#ed8b00",
    "Spring Boot": "#6db33f",
    "Spring Framework": "#6db33f",
    "C#": "#239120",
    ".NET": "#512bd4",
    "ASP.NET": "#512bd4",
    "Ruby": "#cc342d",
    "Ruby on Rails": "#cc0000",
    "Go": "#00add8",
    "Rust": "#dea584",
    "C": "#a8b9cc",
    "C++": "#00599c",
    "Scala": "#dc322f",
    "Kotlin": "#7f52ff",

    // Full Stack & APIs
    "MERN Stack": "#007acc",
    "MEAN Stack": "#007acc",
    "Full Stack Development": "#8b5cf6",
    "REST API": "#ff6c37",
    "GraphQL": "#e10098",
    "WebSockets": "#00add8",
    "API Development": "#ff6c37",
    "Microservices": "#326ce5",
    "Serverless": "#ff9900",
    "API Security": "#ff6c37",
    "API Testing": "#ff6c37",

    // Databases
    "MongoDB": "#47a248",
    "PostgreSQL": "#4169e1",
    "MySQL": "#f29111",
    "Redis": "#dc382d",
    "SQLite": "#008bcd",
    "MariaDB": "#00a64a",
    "Oracle Database": "#f80000",
    "Microsoft SQL Server": "#cc2927",
    "Firebase": "#ffca28",
    "Supabase": "#3ecf8e",
    "DynamoDB": "#ff9900",
    "Cassandra": "#1287b1",
    "Neo4j": "#008cc1",
    "Elasticsearch": "#00bfa5",
    "Prisma": "#5a67d8",
    "Mongoose": "#e03e3e",
    "Sequelize": "#52b0e7",

    // Cloud
    "AWS": "#ff9900",
    "Amazon EC2": "#ff9900",
    "Amazon S3": "#ff9900",
    "AWS Lambda": "#ff9900",
    "AWS RDS": "#ff9900",
    "AWS CloudFormation": "#ff9900",
    "AWS IAM": "#ff9900",
    "AWS VPC": "#ff9900",
    "AWS SQS": "#ff9900",
    "AWS SNS": "#ff9900",
    "AWS CloudWatch": "#ff9900",
    "Microsoft Azure": "#0078d4",
    "Azure Functions": "#0078d4",
    "Azure DevOps": "#0078d4",
    "Google Cloud": "#4285f4",
    "Google Cloud Platform": "#4285f4",
    "Google Cloud Run": "#4285f4",
    "Google Cloud Functions": "#4285f4",
    "Vercel": "#ffffff",
    "Netlify": "#00c7b7",
    "DigitalOcean": "#0067ff",

    // DevOps
    "Docker": "#2496ed",
    "Docker Compose": "#2496ed",
    "Kubernetes": "#326ce5",
    "Jenkins": "#d24939",
    "GitHub Actions": "#2088ff",
    "GitLab CI/CD": "#fc6d26",
    "CI/CD": "#8b5cf6",
    "Terraform": "#623ce4",
    "Ansible": "#ee0000",
    "Nginx": "#009639",
    "Apache": "#d22128",
    "Linux": "#fcc624",
    "Ubuntu": "#e95420",
    "Shell Scripting": "#4eaa25",
    "Bash": "#4eaa25",
    "PowerShell": "#5391fe",
    "Monitoring": "#f59e0b",
    "Infrastructure as Code": "#8b5cf6",
    "DevOps": "#f59e0b",

    // Version Control
    "Git": "#f05032",
    "GitHub": "#ffffff",
    "GitLab": "#fc6d26",
    "Bitbucket": "#0052cc",
    "GitHub Actions": "#2088ff",
    "GitFlow": "#f05032",

    // AI / Machine Learning
    "Artificial Intelligence": "#d946ef",
    "Machine Learning": "#d946ef",
    "Deep Learning": "#d946ef",
    "Generative AI": "#a855f7",
    "OpenAI API": "#10a37f",
    "Prompt Engineering": "#a855f7",
    "Large Language Models": "#a855f7",
    "LLMs": "#a855f7",
    "Natural Language Processing": "#a855f7",
    "Computer Vision": "#a855f7",
    "Speech Recognition": "#a855f7",
    "TensorFlow": "#ff6f00",
    "PyTorch": "#ee4c2c",
    "Scikit-learn": "#f7931e",
    "Pandas": "#6e40c9",
    "NumPy": "#4a90d9",
    "Matplotlib": "#3b82f6",
    "Hugging Face": "#ffd21e",
    "LangChain": "#3b82f6",
    "LlamaIndex": "#3b82f6",
    "RAG": "#3b82f6",
    "Fine Tuning": "#3b82f6",
    "AI Agents": "#3b82f6",
    "Machine Learning Engineering": "#d946ef",
    "MLOps": "#d946ef",

    // Automation
    "AI Automation": "#ec4899",
    "n8n": "#ea580c",
    "Zapier": "#ff4a00",
    "Make": "#6366f1",
    "Power Automate": "#0078d4",
    "Workflow Automation": "#ec4899",
    "Business Process Automation": "#ec4899",
    "RPA": "#ec4899",
    "Automation Anywhere": "#ec4899",
    "UiPath": "#ff6b35",

    // Mobile
    "React Native": "#61dafb",
    "Flutter": "#42a5f5",
    "Dart": "#29b6f6",
    "Android Development": "#3ddc84",
    "Kotlin": "#7f52ff",
    "Swift": "#fa7343",
    "iOS Development": "#999999",
    "Jetpack Compose": "#4285f4",
    "SwiftUI": "#999999",

    // CMS / Ecommerce
    "WordPress": "#21759b",
    "WordPress Development": "#21759b",
    "Elementor": "#9c51f1",
    "WooCommerce": "#96588a",
    "Shopify": "#7ab55c",
    "Shopify Liquid": "#7ab55c",
    "Shopify Development": "#7ab55c",
    "Webflow": "#4353ff",
    "Wix": "#6e6e6e",
    "Squarespace": "#6e6e6e",
    "Magento": "#ee672f",
    "BigCommerce": "#00a3e0",

    // UI/UX & Design
    "UI Design": "#a855f7",
    "UX Design": "#a855f7",
    "UI/UX": "#a855f7",
    "Figma": "#f24e1e",
    "Adobe XD": "#ff61f6",
    "Adobe Photoshop": "#31a8ff",
    "Adobe Illustrator": "#ff9a00",
    "Canva": "#00c4cc",
    "Wireframing": "#a855f7",
    "Prototyping": "#a855f7",
    "Design Systems": "#a855f7",
    "Interaction Design": "#a855f7",
    "User Research": "#a855f7",
    "Usability Testing": "#a855f7",
    "Design Thinking": "#a855f7",

    // Testing
    "Software Testing": "#22c55e",
    "Manual Testing": "#22c55e",
    "Automation Testing": "#22c55e",
    "Unit Testing": "#22c55e",
    "Integration Testing": "#22c55e",
    "End-to-End Testing": "#22c55e",
    "Jest": "#c21325",
    "Vitest": "#6e9f18",
    "Cypress": "#6e6e6e",
    "Playwright": "#2eadae",
    "Selenium": "#43b02a",
    "React Testing Library": "#e33332",
    "Postman": "#ff6c37",
    "API Testing": "#ff6c37",
    "Test Automation": "#22c55e",

    // Cyber Security
    "Cyber Security": "#ef4444",
    "Ethical Hacking": "#ef4444",
    "Network Security": "#ef4444",
    "Web Security": "#ef4444",
    "Application Security": "#ef4444",
    "Cloud Security": "#ef4444",
    "OWASP": "#ef4444",
    "Authentication": "#ef4444",
    "Authorization": "#ef4444",
    "OAuth": "#ef4444",
    "JWT": "#ef4444",
    "Penetration Testing": "#ef4444",
    "Vulnerability Assessment": "#ef4444",
    "Cryptography": "#ef4444",
    "Digital Forensics": "#ef4444",
    "Malware Analysis": "#ef4444",
    "Security Operations": "#ef4444",

    // Software Engineering
    "Data Structures": "#6366f1",
    "Algorithms": "#6366f1",
    "Object Oriented Programming": "#6366f1",
    "OOP": "#6366f1",
    "Functional Programming": "#6366f1",
    "Design Patterns": "#6366f1",
    "System Design": "#6366f1",
    "Software Architecture": "#6366f1",
    "Clean Code": "#6366f1",
    "SOLID Principles": "#6366f1",
    "Agile": "#6366f1",
    "Scrum": "#6366f1",
    "SDLC": "#6366f1",
    "Software Engineering": "#6366f1",
    "Code Review": "#6366f1",
    "Debugging": "#6366f1",

    // Data
    "Data Analysis": "#3b82f6",
    "Data Science": "#3b82f6",
    "SQL": "#e38d13",
    "Power BI": "#f2c811",
    "Tableau": "#e97627",
    "Microsoft Excel": "#2e7d32",
    "Data Visualization": "#3b82f6",
    "Statistics": "#3b82f6",
    "Big Data": "#3b82f6",
    "Apache Spark": "#e25a1c",
    "Hadoop": "#66ccff",
    "Data Engineering": "#3b82f6",
    "ETL": "#3b82f6",
    "Data Warehousing": "#3b82f6",

    // Blockchain / Web3
    "Blockchain": "#f7931a",
    "Web3": "#f7931a",
    "Solidity": "#6e6e6e",
    "Smart Contracts": "#6e6e6e",
    "Ethereum": "#999999",
    "Cryptocurrency": "#f7931a",
    "Decentralized Applications": "#999999",
    "DeFi": "#f7931a",

    // Game Development
    "Unity": "#ffffff",
    "Unreal Engine": "#6e6e6e",
    "Game Development": "#6366f1",
    "C# Game Development": "#239120",
    "Game Design": "#6366f1",
    "3D Development": "#6366f1",
    "Blender": "#f5792a",

    // Other Tech
    "JSON": "#e0e0e0",
    "XML": "#e0e0e0",
    "YAML": "#cb171e",
    "Regular Expressions": "#e0e0e0",
    "Computer Networks": "#06b6d4",
    "Networking": "#06b6d4",
    "Operating Systems": "#06b6d4",
    "Linux Administration": "#fcc624",
    "Technical Writing": "#6366f1",
    "GitHub Copilot": "#6e6e6e",
    "Developer Tools": "#6366f1",
  };

  // Check exact skill name first
  if (brandColorsHex[skillName]) {
    return brandColorsHex[skillName];
  }

  // Fallback to category
  const categoryColorsHex = {
    Frontend: "#8b5cf6",
    Backend: "#06b6d4",
    Database: "#10b981",
    Cloud: "#ff9900",
    DevOps: "#f59e0b",
    "Version Control": "#f05032",
    "AI/ML": "#d946ef",
    Automation: "#ec4899",
    Mobile: "#fa7343",
    "CMS/Ecommerce": "#84cc16",
    "UI/UX": "#a855f7",
    Testing: "#22c55e",
    Security: "#ef4444",
    "Software Engineering": "#6366f1",
    Data: "#3b82f6",
    Other: "#71717a",
    "Full Stack": "#8b5cf6",
  };

  return categoryColorsHex[category] || "#8b5cf6";
}