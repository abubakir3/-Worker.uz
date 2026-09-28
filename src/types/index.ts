export type UserRole = 'jobseeker' | 'company' | 'admin';

export type JobType = 'To‘liq stavka' | 'Yarim stavka' | 'Masofaviy ish' | 'Amaliyot';

export type ExperienceLevel = 'Tajribasiz' | '1-3 yil' | '3-5 yil' | '5+ yil';

export type ApplicationStatus = 
  | 'Yuborildi' 
  | 'Ko‘rib chiqilmoqda' 
  | 'Suhbatga taklif qilindi' 
  | 'Qabul qilindi' 
  | 'Rad etildi';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface JobSeekerProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  profession: string;
  experienceYears: string;
  skills: string[];
  education: string;
  bio: string;
  resumeFileName?: string;
  resumeUrl?: string;
  avatarUrl: string;
  isPhonePublic: boolean;
  isEmailPublic: boolean;
  createdAt: string;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  description: string;
  logoUrl: string;
  verified: boolean;
  website?: string;
  videoUrl?: string;
  videoTitle?: string;
  isPhonePublic: boolean;
  isEmailPublic: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Vacancy {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  category: string;
  city: string;
  address: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  isSalaryNegotiable: boolean;
  jobType: JobType;
  workSchedule: string;
  experienceRequired: ExperienceLevel;
  requirements: string[];
  duties: string[];
  additionalInfo?: string;
  createdAt: string;
  isActive: boolean;
  viewsCount: number;
  applicationsCount: number;
}

export interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  companyId: string;
  companyName: string;
  jobSeekerId: string;
  jobSeekerName: string;
  jobSeekerProfession: string;
  jobSeekerPhone: string;
  jobSeekerEmail: string;
  coverLetter: string;
  resumeFileName: string;
  resumeUrl?: string;
  appliedDate: string;
  status: ApplicationStatus;
  companyFeedback?: string;
}

export interface Conversation {
  id: string;
  vacancyId?: string;
  vacancyTitle?: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  jobSeekerId: string;
  jobSeekerName: string;
  jobSeekerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCountJobSeeker: number;
  unreadCountCompany: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'jobseeker' | 'company';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'message' | 'interview' | 'vacancy' | 'system';
  read: boolean;
  createdAt: string;
  linkView?: string;
  linkId?: string;
}

export interface Review {
  id: string;
  companyId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Report {
  id: string;
  targetType: 'vacancy' | 'company' | 'user' | 'message';
  targetId: string;
  targetTitle: string;
  reason: 'Soxta kompaniya' | 'Soxta vakansiya' | 'Noo‘rin mazmun' | 'Spam' | 'Shubhali faoliyat' | 'Boshqa';
  description: string;
  reportedBy: string;
  createdAt: string;
  status: 'Kutilmoqda' | 'Hal qilindi' | 'Rad etildi';
}

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  vacanciesCount: number;
}
