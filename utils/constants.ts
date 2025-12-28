export const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  technical: 'Technical Skills',
  soft: 'Professional Core Competencies',
  language: 'Languages',
  tool: 'Tools & Technologies',
};

export const PROFICIENCY_COLORS: Record<string, string> = {
  beginner: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  intermediate: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  advanced: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  expert: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
};

// Using reliable CDN sources
const SIMPLE_ICONS_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons';
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export const TECH_ICONS: Record<string, string> = {
  // Languages - Verified icons
  Java: `${SIMPLE_ICONS_BASE}/java.svg`,
  Kotlin: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  JavaScript: `${SIMPLE_ICONS_BASE}/javascript.svg`,
  TypeScript: `${SIMPLE_ICONS_BASE}/typescript.svg`,
  Python: `${SIMPLE_ICONS_BASE}/python.svg`,
  HTML: `${SIMPLE_ICONS_BASE}/html5.svg`,
  CSS: `${SIMPLE_ICONS_BASE}/css3.svg`,
  
  // Android & Mobile - Verified icons
  Android: `${SIMPLE_ICONS_BASE}/android.svg`,
  'Jetpack Compose': `${SIMPLE_ICONS_BASE}/jetpackcompose.svg`,
  'RoomDB': `${DEVICON_BASE}/sqlite/sqlite-original.svg`,
  'Room DB': `${DEVICON_BASE}/sqlite/sqlite-original.svg`,
  SQLite: `${DEVICON_BASE}/sqlite/sqlite-original.svg`,
  
  // Firebase - Verified
  Firebase: `${SIMPLE_ICONS_BASE}/firebase.svg`,
  'FCM Push Notifications': `${SIMPLE_ICONS_BASE}/firebase.svg`,
  RealtimeDB: `${SIMPLE_ICONS_BASE}/firebase.svg`,
  
  // Libraries & Frameworks - Using verified Android/Kotlin icons
  Retrofit: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'OkHttp': `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'RxJava': `${SIMPLE_ICONS_BASE}/reactivex.svg`,
  Coroutines: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'Kotlin Flows': `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  Hilt: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'Hilt (DI)': `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  Dagger: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  Koin: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  
  // Architecture Patterns - Using Java/Kotlin icons
  MVVM: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'MVVM + Clean Architecture': `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  MVP: `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'Clean Architecture': `${SIMPLE_ICONS_BASE}/kotlin.svg`,
  'OOPS/SOLID Principles': `${SIMPLE_ICONS_BASE}/java.svg`,
  
  // Protocols - Using verified icons
  HTTP: `${SIMPLE_ICONS_BASE}/apache.svg`,
  WebSocket: `${DEVICON_BASE}/nginx/nginx-original.svg`,
  MQTT: `${DEVICON_BASE}/nginx/nginx-original.svg`,
  RTMP: `${SIMPLE_ICONS_BASE}/nginx.svg`,
  RTSP: `${SIMPLE_ICONS_BASE}/nginx.svg`,
  XMPP: `${SIMPLE_ICONS_BASE}/apache.svg`,
  Openfire: `${SIMPLE_ICONS_BASE}/apache.svg`,
  Smack: `${SIMPLE_ICONS_BASE}/apache.svg`,
  
  // Android Features - Using Android/Google icons
  Maps: `${SIMPLE_ICONS_BASE}/googlemaps.svg`,
  Camera: `${SIMPLE_ICONS_BASE}/android.svg`,
  Sensors: `${SIMPLE_ICONS_BASE}/android.svg`,
  MediaProjection: `${SIMPLE_ICONS_BASE}/android.svg`,
  
  // Tools - Verified icons
  Git: `${SIMPLE_ICONS_BASE}/git.svg`,
  'Git Management': `${SIMPLE_ICONS_BASE}/git.svg`,
  Docker: `${SIMPLE_ICONS_BASE}/docker.svg`,
  'CI/CD': `${SIMPLE_ICONS_BASE}/githubactions.svg`,
  AGP: `${SIMPLE_ICONS_BASE}/gradle.svg`,
  Gradle: `${SIMPLE_ICONS_BASE}/gradle.svg`,
  
  // Development Tools - Using relevant icons
  'App Build-time Optimisation': `${SIMPLE_ICONS_BASE}/gradle.svg`,
  'App Publishing/Delivery': `${SIMPLE_ICONS_BASE}/googleplay.svg`,
  'Android App Debugging/Monitoring': `${SIMPLE_ICONS_BASE}/android.svg`,
  'Memory Leaks/ANRs/Strict Policy': `${SIMPLE_ICONS_BASE}/android.svg`,
  'MultiModules App': `${SIMPLE_ICONS_BASE}/android.svg`,
  'State Machines': `${SIMPLE_ICONS_BASE}/graphql.svg`,
  'State Machine': `${SIMPLE_ICONS_BASE}/graphql.svg`,
  'API Contracts Design': `${SIMPLE_ICONS_BASE}/swagger.svg`,
  'Payment Gateways SDKs': `${SIMPLE_ICONS_BASE}/stripe.svg`,
  
  // AI Tools - Verified icons
  ChatGPT: `${SIMPLE_ICONS_BASE}/openai.svg`,
  Codex: `${SIMPLE_ICONS_BASE}/openai.svg`,
  FigmaMake: `${SIMPLE_ICONS_BASE}/figma.svg`,
  Figma: `${SIMPLE_ICONS_BASE}/figma.svg`,
  
  // Professional Core Competencies - Using relevant icons
  'Team Leadership': `${SIMPLE_ICONS_BASE}/microsoftteams.svg`,
  Mentoring: `${SIMPLE_ICONS_BASE}/microsoftteams.svg`,
  'Code Reviews': `${SIMPLE_ICONS_BASE}/github.svg`,
  'Problem Solving': `${SIMPLE_ICONS_BASE}/stackoverflow.svg`,
  'Agile Methodologies': `${SIMPLE_ICONS_BASE}/jira.svg`,
};
