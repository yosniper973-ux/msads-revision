const AVATAR_COLORS = [
  ['#8B5CF6', '#6D28D9'],
  ['#F97316', '#EA580C'],
  ['#06B6D4', '#0891B2'],
  ['#10B981', '#059669'],
  ['#F43F5E', '#E11D48'],
  ['#FBBF24', '#D97706'],
  ['#EC4899', '#DB2777'],
  ['#6366F1', '#4F46E5'],
];

const AVATAR_SHAPES = [
  // Smiley face
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill={`url(#g)`} />
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={c[0]} /><stop offset="100%" stopColor={c[1]} /></linearGradient></defs>
      <circle cx="35" cy="40" r="5" fill="white" />
      <circle cx="65" cy="40" r="5" fill="white" />
      <path d="M 30 60 Q 50 80 70 60" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  ),
  // Star person
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill={c[1]} />
      <polygon points="50,15 61,40 88,40 67,55 73,82 50,67 27,82 33,55 12,40 39,40" fill={c[0]} />
      <circle cx="42" cy="42" r="3" fill="white" />
      <circle cx="58" cy="42" r="3" fill="white" />
    </svg>
  ),
  // Cat
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="55" r="40" fill={c[0]} />
      <polygon points="20,30 15,5 40,25" fill={c[1]} />
      <polygon points="80,30 85,5 60,25" fill={c[1]} />
      <circle cx="38" cy="48" r="5" fill="white" /><circle cx="38" cy="48" r="3" fill={c[1]} />
      <circle cx="62" cy="48" r="5" fill="white" /><circle cx="62" cy="48" r="3" fill={c[1]} />
      <ellipse cx="50" cy="60" rx="4" ry="3" fill={c[1]} />
      <line x1="20" y1="55" x2="35" y2="58" stroke="white" strokeWidth="1.5" />
      <line x1="20" y1="62" x2="35" y2="62" stroke="white" strokeWidth="1.5" />
      <line x1="65" y1="58" x2="80" y2="55" stroke="white" strokeWidth="1.5" />
      <line x1="65" y1="62" x2="80" y2="62" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  // Robot
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="20" y="30" width="60" height="55" rx="10" fill={c[0]} />
      <rect x="35" y="15" width="30" height="20" rx="5" fill={c[1]} />
      <line x1="50" y1="5" x2="50" y2="15" stroke={c[0]} strokeWidth="3" />
      <circle cx="50" cy="5" r="4" fill={c[1]} />
      <rect x="32" y="45" width="14" height="10" rx="3" fill="white" />
      <rect x="54" y="45" width="14" height="10" rx="3" fill="white" />
      <rect x="38" y="65" width="24" height="6" rx="3" fill={c[1]} />
    </svg>
  ),
  // Heart
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill={c[1]} />
      <path d="M50 80 C20 55 10 35 30 25 C40 20 50 30 50 30 C50 30 60 20 70 25 C90 35 80 55 50 80Z" fill={c[0]} />
      <circle cx="40" cy="40" r="3" fill="white" />
      <circle cx="60" cy="40" r="3" fill="white" />
    </svg>
  ),
  // Owl
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="55" rx="38" ry="40" fill={c[0]} />
      <polygon points="25,30 12,10 38,28" fill={c[1]} />
      <polygon points="75,30 88,10 62,28" fill={c[1]} />
      <circle cx="37" cy="45" r="12" fill="white" /><circle cx="37" cy="45" r="6" fill={c[1]} />
      <circle cx="63" cy="45" r="12" fill="white" /><circle cx="63" cy="45" r="6" fill={c[1]} />
      <polygon points="50,55 45,65 55,65" fill={c[1]} />
    </svg>
  ),
  // Sun
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="30" fill={c[0]} />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a} x1={50 + 33*Math.cos(a*Math.PI/180)} y1={50 + 33*Math.sin(a*Math.PI/180)}
              x2={50 + 46*Math.cos(a*Math.PI/180)} y2={50 + 46*Math.sin(a*Math.PI/180)}
              stroke={c[1]} strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle cx="40" cy="45" r="4" fill="white" />
      <circle cx="60" cy="45" r="4" fill="white" />
      <path d="M 38 58 Q 50 68 62 58" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  ),
  // Diamond
  (c: string[]) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill={c[1]} />
      <polygon points="50,10 85,50 50,90 15,50" fill={c[0]} />
      <circle cx="42" cy="45" r="4" fill="white" />
      <circle cx="58" cy="45" r="4" fill="white" />
      <path d="M 40 60 Q 50 70 60 60" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
];

interface AvatarProps {
  index: number;
  size?: number;
  className?: string;
}

export default function Avatar({ index, size = 48, className = '' }: AvatarProps) {
  const safeIndex = Math.abs(index) % 8;
  const colors = AVATAR_COLORS[safeIndex];
  const Shape = AVATAR_SHAPES[safeIndex];
  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      {Shape(colors)}
    </div>
  );
}
