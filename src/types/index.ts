export type ScreenType = 
  | 'home'
  | 'mentors'
  | 'grants'
  | 'my-mentoring'
  | 'profile'
  | 'session-detail'
  | 'booking-schedule'
  | 'application-form';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  years: number;
  company: string;
  category: 'dev' | 'pm' | 'marketing' | 'design' | 'data' | 'startup' | 'ir' | 'hr';
  categories: string[];
  avatar: string;
  verified: boolean;
  isTopMentor?: boolean;
  rating: number;
  reviewCount: number;
  sessionCount: number;
  responseRate?: number;
  specialtyHighlight: string;
  quote: string;
  tags: string[];
  format: string;
  formatHighlight: string;
  price: number;
  isInstantAvailable: boolean;
  bookmarked: boolean;
  order: number;
  dateAdded: number;
}

export interface Grant {
  id: string;
  title: string;
  agency: string;
  dDay: string;
  matchScore: number;
  maxAmount: string;
  maxAmountSub: string;
  benefits: string[];
  mentorHighlight: string;
  category: 'startup' | 'rd' | 'marketing' | 'employment' | 'voucher';
  isBookmarked: boolean;
  alarmRegistered?: boolean;
  status: 'active' | 'upcoming' | 'closed';
}

export interface MentoringMatch {
  id: string;
  mentorName: string;
  category: string;
  topic: string;
  date: string;
  time: string;
  status: '확정됨' | '완료됨' | '진행중' | '취소됨';
  countdown?: string;
  canEnterRoom?: boolean;
  hasReview?: boolean;
  mentorAvatar?: string;
}

export interface BookingState {
  mentorId: string;
  dateStr: string;
  shortDate: string;
  timeStr: string;
  shortTime: string;
  price: number;
  voucherApplied: boolean;
  selectedPurposes: string[];
  questionContent: string;
  portfolioLink: string;
  attachedFileName: string;
  attachedFileSize: string;
  agreedToTerms: boolean;
}
