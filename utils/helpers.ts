import { TECH_ICONS } from './constants';

export const getTechIcon = (skillName: string): string | null => {
  // Direct match first (exact case)
  if (TECH_ICONS[skillName]) return TECH_ICONS[skillName];
  
  const lowerName = skillName.toLowerCase().trim();
  
  // Extended mappings for common variations and partial matches
  const mappings: Record<string, string> = {
    // Languages
    java: 'Java',
    kotlin: 'Kotlin',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    html: 'HTML',
    css: 'CSS',
    
    // Android & Mobile
    android: 'Android',
    'jetpack compose': 'Jetpack Compose',
    compose: 'Jetpack Compose',
    room: 'RoomDB',
    roomdb: 'RoomDB',
    'room db': 'RoomDB',
    sqlite: 'SQLite',
    
    // Firebase
    firebase: 'Firebase',
    fcm: 'FCM Push Notifications',
    'push notification': 'FCM Push Notifications',
    realtimedb: 'RealtimeDB',
    'realtime db': 'RealtimeDB',
    
    // Libraries
    retrofit: 'Retrofit',
    okhttp: 'OkHttp',
    'ok http': 'OkHttp',
    rxjava: 'RxJava',
    'rx java': 'RxJava',
    coroutines: 'Coroutines',
    'kotlin flows': 'Kotlin Flows',
    flows: 'Kotlin Flows',
    hilt: 'Hilt (DI)',
    'hilt (di)': 'Hilt (DI)',
    dagger: 'Dagger',
    koin: 'Koin',
    
    // Architecture
    mvvm: 'MVVM + Clean Architecture',
    'clean architecture': 'Clean Architecture',
    mvp: 'MVP',
    oops: 'OOPS/SOLID Principles',
    solid: 'OOPS/SOLID Principles',
    'oops/solid': 'OOPS/SOLID Principles',
    
    // Protocols
    http: 'HTTP',
    websocket: 'WebSocket',
    'web socket': 'WebSocket',
    mqtt: 'MQTT',
    rtmp: 'RTMP',
    rtsp: 'RTSP',
    xmpp: 'XMPP',
    openfire: 'Openfire',
    smack: 'Smack',
    
    // Android Features
    maps: 'Maps',
    camera: 'Camera',
    sensors: 'Sensors',
    'media projection': 'MediaProjection',
    mediaprojection: 'MediaProjection',
    
    // Tools
    git: 'Git Management',
    'git management': 'Git Management',
    docker: 'Docker',
    'ci/cd': 'CI/CD',
    cicd: 'CI/CD',
    agp: 'AGP',
    gradle: 'Gradle',
    
    // Development
    'build-time': 'App Build-time Optimisation',
    'build time': 'App Build-time Optimisation',
    optimization: 'App Build-time Optimisation',
    'app publishing': 'App Publishing/Delivery',
    publishing: 'App Publishing/Delivery',
    delivery: 'App Publishing/Delivery',
    debugging: 'Android App Debugging/Monitoring',
    monitoring: 'Android App Debugging/Monitoring',
    'memory leak': 'Memory Leaks/ANRs/Strict Policy',
    anr: 'Memory Leaks/ANRs/Strict Policy',
    'multi module': 'MultiModules App',
    'multi modules': 'MultiModules App',
    'state machine': 'State Machines',
    'api contract': 'API Contracts Design',
    'payment gateway': 'Payment Gateways SDKs',
    payment: 'Payment Gateways SDKs',
    
    // AI Tools
    chatgpt: 'ChatGPT',
    'chat gpt': 'ChatGPT',
    codex: 'Codex',
    figma: 'FigmaMake',
    figmamake: 'FigmaMake',
    
    // Soft Skills
    leadership: 'Team Leadership',
    'team leadership': 'Team Leadership',
    mentoring: 'Mentoring',
    'code review': 'Code Reviews',
    'problem solving': 'Problem Solving',
    agile: 'Agile Methodologies',
  };

  // Check mappings
  for (const [key, value] of Object.entries(mappings)) {
    if (lowerName.includes(key) && !(key === 'java' && lowerName.includes('javascript'))) {
      return TECH_ICONS[value] || null;
    }
  }
  
  // Fallback: try to find partial matches in TECH_ICONS keys (case-insensitive)
  for (const [key, url] of Object.entries(TECH_ICONS)) {
    const lowerKey = key.toLowerCase();
    // Check if skill name contains key or key contains skill name
    if (lowerName.includes(lowerKey) || lowerKey.includes(lowerName)) {
      return url;
    }
    // Also check word boundaries for better matching
    const keyWords = lowerKey.split(/[\s+&/]/);
    const nameWords = lowerName.split(/[\s+&/]/);
    if (keyWords.some(kw => nameWords.includes(kw)) || nameWords.some(nw => keyWords.includes(nw))) {
      return url;
    }
  }
  
  return null;
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const category = String(item[key]);
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const getCompanyFromProject = (projectName: string, companies: string[]): string | null => {
  for (const company of companies) {
    if (projectName.toLowerCase().includes(company.toLowerCase())) {
      return company;
    }
  }
  return null;
};

export const getProjectsForCompany = (company: string, projects: any[], allCompanies: string[]): any[] => {
  return projects.filter(project => {
    const projectCompany = getCompanyFromProject(project.name, allCompanies);
    return projectCompany === company;
  });
};

export const ICON_FILTER_STYLE = 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)';
