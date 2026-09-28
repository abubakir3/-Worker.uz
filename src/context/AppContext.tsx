import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  JobSeekerProfile, 
  CompanyProfile, 
  Vacancy, 
  Application, 
  ApplicationStatus, 
  Conversation, 
  Message, 
  NotificationItem, 
  Review, 
  Report,
  JobCategory
} from '../types';
import { 
  initialCategories, 
  initialCompanies, 
  initialVacancies, 
  initialJobSeekers, 
  initialApplications, 
  initialConversations, 
  initialMessages, 
  initialNotifications, 
  initialReviews, 
  initialReports, 
  demoUsers 
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole | 'guest') => void;
  currentJobSeeker: JobSeekerProfile;
  updateJobSeekerProfile: (profile: Partial<JobSeekerProfile>) => void;
  currentCompany: CompanyProfile;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  
  categories: JobCategory[];
  companies: CompanyProfile[];
  verifyCompany: (companyId: string) => void;
  deleteCompany: (companyId: string) => void;
  uploadCompanyVideo: (companyId: string, videoUrl: string, title?: string) => void;
  deleteCompanyVideo: (companyId: string) => void;
  
  vacancies: Vacancy[];
  addVacancy: (vacancyData: Omit<Vacancy, 'id' | 'createdAt' | 'viewsCount' | 'applicationsCount' | 'isActive'>) => Vacancy;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => void;
  deleteVacancy: (id: string) => void;
  toggleVacancyStatus: (id: string) => void;
  incrementVacancyViews: (id: string) => void;
  
  savedVacancyIds: string[];
  toggleSaveVacancy: (vacancyId: string) => void;
  
  applications: Application[];
  submitApplication: (data: { vacancyId: string; coverLetter: string; resumeFileName: string }) => boolean;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, feedback?: string) => void;
  
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrGetConversation: (companyId: string, vacancyId?: string) => string;
  
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  
  reviews: Review[];
  addReview: (companyId: string, rating: number, comment: string) => void;
  
  reports: Report[];
  submitReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  resolveReport: (id: string, status: 'Hal qilindi' | 'Rad etildi') => void;
  
  currentView: string;
  selectedVacancyId: string | null;
  selectedCompanyId: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  
  navigateTo: (view: string, payload?: { 
    vacancyId?: string; 
    companyId?: string; 
    conversationId?: string; 
    category?: string; 
    city?: string; 
    query?: string;
  }) => void;
  
  authModalOpen: boolean;
  authModalTab: 'login' | 'register_seeker' | 'register_company';
  openAuthModal: (tab?: 'login' | 'register_seeker' | 'register_company') => void;
  closeAuthModal: () => void;
  
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (defaults to jobseeker Javohir Alimov for seamless interactive demo)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ishchi_user');
    return saved ? JSON.parse(saved) : demoUsers.jobseeker;
  });

  const [categories] = useState<JobCategory[]>(initialCategories);

  const [companies, setCompanies] = useState<CompanyProfile[]>(() => {
    const saved = localStorage.getItem('ishchi_companies');
    return saved ? JSON.parse(saved) : initialCompanies;
  });

  const [vacancies, setVacancies] = useState<Vacancy[]>(() => {
    const saved = localStorage.getItem('ishchi_vacancies');
    return saved ? JSON.parse(saved) : initialVacancies;
  });

  const [jobSeekers, setJobSeekers] = useState<JobSeekerProfile[]>(() => {
    const saved = localStorage.getItem('ishchi_seekers');
    return saved ? JSON.parse(saved) : initialJobSeekers;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('ishchi_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [savedVacancyIds, setSavedVacancyIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ishchi_saved_vacancies');
    return saved ? JSON.parse(saved) : ['vac-1'];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('ishchi_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ishchi_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ishchi_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ishchi_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('ishchi_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  // Routing and navigation state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  // Search and filter global inputs
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Modals & Feedback
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register_seeker' | 'register_company'>('login');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Auto sync to localStorage
  useEffect(() => {
    localStorage.setItem('ishchi_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ishchi_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('ishchi_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem('ishchi_seekers', JSON.stringify(jobSeekers));
  }, [jobSeekers]);

  useEffect(() => {
    localStorage.setItem('ishchi_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ishchi_saved_vacancies', JSON.stringify(savedVacancyIds));
  }, [savedVacancyIds]);

  useEffect(() => {
    localStorage.setItem('ishchi_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('ishchi_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ishchi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ishchi_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ishchi_reports', JSON.stringify(reports));
  }, [reports]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const switchRole = (role: UserRole | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
      showToast('Mehmon rejimiga o‘tildi', 'info');
      return;
    }
    const user = demoUsers[role];
    setCurrentUser(user);
    if (role === 'company') {
      navigateTo('dashboard');
      showToast('Kompaniya boshqaruv paneliga xush kelibsiz!', 'success');
    } else if (role === 'admin') {
      navigateTo('admin');
      showToast('Administrator boshqaruv paneliga xush kelibsiz!', 'success');
    } else {
      showToast('Ish qidiruvchi rejimi faollashtirildi', 'success');
    }
  };

  const currentJobSeeker = jobSeekers[0] || initialJobSeekers[0];
  const updateJobSeekerProfile = (updates: Partial<JobSeekerProfile>) => {
    setJobSeekers(prev => prev.map(s => s.id === currentJobSeeker.id ? { ...s, ...updates } : s));
    showToast('Profilingiz muvaffaqiyatli yangilandi!', 'success');
  };

  const currentCompany = companies[0] || initialCompanies[0];
  const updateCompanyProfile = (updates: Partial<CompanyProfile>) => {
    setCompanies(prev => prev.map(c => c.id === currentCompany.id ? { ...c, ...updates } : c));
    showToast('Kompaniya ma’lumotlari saqlandi!', 'success');
  };

  const verifyCompany = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, verified: true } : c));
    showToast('Kompaniya rasmiy tasdiqlandi!', 'success');
  };

  const deleteCompany = (companyId: string) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    setVacancies(prev => prev.filter(v => v.companyId !== companyId));
    showToast('Kompaniya va uning vakansiyalari o‘chirildi', 'info');
  };

  const uploadCompanyVideo = (companyId: string, videoUrl: string, title?: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? {
      ...c,
      videoUrl,
      videoTitle: title || 'Kompaniya taqdimot videosi'
    } : c));
    showToast('Kompaniya videosi muvaffaqiyatli saqlandi!', 'success');
  };

  const deleteCompanyVideo = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? {
      ...c,
      videoUrl: undefined,
      videoTitle: undefined
    } : c));
    showToast('Kompaniya videosi o‘chirildi', 'info');
  };

  const addVacancy = (vacancyData: Omit<Vacancy, 'id' | 'createdAt' | 'viewsCount' | 'applicationsCount' | 'isActive'>) => {
    const newVac: Vacancy = {
      ...vacancyData,
      id: `vac-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      viewsCount: 1,
      applicationsCount: 0,
    };
    setVacancies(prev => [newVac, ...prev]);
    showToast('Yangi vakansiya muvaffaqiyatli e’lon qilindi!', 'success');
    
    // Add system notification for job seekers
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'user-seeker-1',
      title: 'Yangi vakansiya mavjud',
      message: `${newVac.companyName} yangi vakansiya e’lon qildi: "${newVac.title}"`,
      type: 'vacancy',
      read: false,
      createdAt: 'Hozirgina',
      linkView: 'vacancy',
      linkId: newVac.id,
    };
    setNotifications(prev => [notif, ...prev]);
    return newVac;
  };

  const updateVacancy = (id: string, updates: Partial<Vacancy>) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    showToast('Vakansiya ma’lumotlari yangilandi!', 'success');
  };

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
    showToast('Vakansiya o‘chirildi', 'info');
  };

  const toggleVacancyStatus = (id: string) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v));
    showToast('Vakansiya holati yangilandi', 'info');
  };

  const incrementVacancyViews = (id: string) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, viewsCount: v.viewsCount + 1 } : v));
  };

  const toggleSaveVacancy = (vacancyId: string) => {
    setSavedVacancyIds(prev => {
      const exists = prev.includes(vacancyId);
      if (exists) {
        showToast('Vakansiya saqlanganlardan olib tashlandi', 'info');
        return prev.filter(id => id !== vacancyId);
      } else {
        showToast('Vakansiya saqlab qo‘yildi', 'success');
        return [...prev, vacancyId];
      }
    });
  };

  const submitApplication = ({ vacancyId, coverLetter, resumeFileName }: { vacancyId: string; coverLetter: string; resumeFileName: string }): boolean => {
    const vacancy = vacancies.find(v => v.id === vacancyId);
    if (!vacancy) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.vacancyId === vacancyId && a.jobSeekerId === currentJobSeeker.id);
    if (alreadyApplied) {
      showToast('Siz ushbu vakansiyaga avval ariza topshirgansiz!', 'error');
      return false;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      companyId: vacancy.companyId,
      companyName: vacancy.companyName,
      jobSeekerId: currentJobSeeker.id,
      jobSeekerName: `${currentJobSeeker.firstName} ${currentJobSeeker.lastName}`,
      jobSeekerProfession: currentJobSeeker.profession,
      jobSeekerPhone: currentJobSeeker.phone,
      jobSeekerEmail: currentJobSeeker.email,
      coverLetter,
      resumeFileName: resumeFileName || currentJobSeeker.resumeFileName || 'Rezyume.pdf',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Yuborildi'
    };

    setApplications(prev => [newApp, ...prev]);

    // Update vacancy application count
    setVacancies(prev => prev.map(v => v.id === vacancyId ? { ...v, applicationsCount: v.applicationsCount + 1 } : v));

    // Notify company
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: vacancy.companyId,
      title: 'Yangi ariza qabul qilindi',
      message: `${currentJobSeeker.firstName} ${currentJobSeeker.lastName} "${vacancy.title}" vakansiyasiga ariza topshirdi.`,
      type: 'application',
      read: false,
      createdAt: 'Hozirgina',
      linkView: 'dashboard'
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Arizangiz muvaffaqiyatli topshirildi!', 'success');
    return true;
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus, feedback?: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return {
          ...a,
          status,
          companyFeedback: feedback || a.companyFeedback
        };
      }
      return a;
    }));

    const app = applications.find(a => a.id === applicationId);
    if (app) {
      // Notify the job seeker
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: app.jobSeekerId,
        title: status === 'Suhbatga taklif qilindi' ? 'Suhbatga taklif qilindingiz!' : `Arizangiz holati: ${status}`,
        message: `${app.companyName} "${app.vacancyTitle}" vakansiyasi bo‘yicha arizangizni ko‘rib chiqdi: ${status}${feedback ? ` (${feedback})` : ''}`,
        type: status === 'Suhbatga taklif qilindi' ? 'interview' : 'application',
        read: false,
        createdAt: 'Hozirgina',
        linkView: 'applications',
        linkId: app.id
      };
      setNotifications(prev => [notif, ...prev]);
    }

    showToast(`Ariza holati o‘zgartirildi: ${status}`, 'success');
  };

  const startOrGetConversation = (companyId: string, vacancyId?: string): string => {
    const existing = conversations.find(c => c.companyId === companyId && c.jobSeekerId === currentJobSeeker.id);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const company = companies.find(c => c.id === companyId);
    const vacancy = vacancyId ? vacancies.find(v => v.id === vacancyId) : undefined;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      vacancyId: vacancy?.id,
      vacancyTitle: vacancy?.title,
      companyId: companyId,
      companyName: company?.name || 'Kompaniya',
      companyLogo: company?.logoUrl || '',
      jobSeekerId: currentJobSeeker.id,
      jobSeekerName: `${currentJobSeeker.firstName} ${currentJobSeeker.lastName}`,
      jobSeekerAvatar: currentJobSeeker.avatarUrl,
      lastMessage: 'Yozishmani boshladi',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCountJobSeeker: 0,
      unreadCountCompany: 0,
      updatedAt: new Date().toISOString()
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const senderRole: 'jobseeker' | 'company' = currentUser?.role === 'company' ? 'company' : 'jobseeker';
    const senderId = currentUser?.role === 'company' ? conv.companyId : conv.jobSeekerId;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderRole,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, newMsg]);

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTime: newMsg.timestamp,
          unreadCountCompany: senderRole === 'jobseeker' ? c.unreadCountCompany + 1 : c.unreadCountCompany,
          unreadCountJobSeeker: senderRole === 'company' ? c.unreadCountJobSeeker + 1 : c.unreadCountJobSeeker,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Barcha bildirishnomalar o‘qildi deb belgilandi', 'info');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const addReview = (companyId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      companyId,
      authorName: currentUser ? currentUser.name : 'Foydalanuvchi',
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate company rating
    const companyReviews = [...reviews.filter(r => r.companyId === companyId), newRev];
    const avg = companyReviews.reduce((sum, r) => sum + r.rating, 0) / companyReviews.length;

    setCompanies(prev => prev.map(c => c.id === companyId ? {
      ...c,
      rating: parseFloat(avg.toFixed(1)),
      reviewCount: companyReviews.length
    } : c));

    showToast('Fikr va baholashingiz muvaffaqiyatli qoldirildi!', 'success');
  };

  const submitReport = (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    const newRep: Report = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Kutilmoqda'
    };
    setReports(prev => [newRep, ...prev]);
    showToast('Shikoyatingiz qabul qilindi. Administratorlar tomonidan ko‘rib chiqiladi.', 'info');
  };

  const resolveReport = (id: string, status: 'Hal qilindi' | 'Rad etildi') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Shikoyat holati yangilandi: ${status}`, 'info');
  };

  const navigateTo = (view: string, payload?: {
    vacancyId?: string;
    companyId?: string;
    conversationId?: string;
    category?: string;
    city?: string;
    query?: string;
  }) => {
    if (payload?.vacancyId) {
      setSelectedVacancyId(payload.vacancyId);
      incrementVacancyViews(payload.vacancyId);
    }
    if (payload?.companyId) {
      setSelectedCompanyId(payload.companyId);
    }
    if (payload?.conversationId) {
      setActiveConversationId(payload.conversationId);
    }
    if (payload?.category !== undefined) {
      setSelectedCategory(payload.category);
    }
    if (payload?.city !== undefined) {
      setSelectedCity(payload.city);
    }
    if (payload?.query !== undefined) {
      setSearchQuery(payload.query);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (tab: 'login' | 'register_seeker' | 'register_company' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      currentJobSeeker,
      updateJobSeekerProfile,
      currentCompany,
      updateCompanyProfile,
      categories,
      companies,
      verifyCompany,
      deleteCompany,
      uploadCompanyVideo,
      deleteCompanyVideo,
      vacancies,
      addVacancy,
      updateVacancy,
      deleteVacancy,
      toggleVacancyStatus,
      incrementVacancyViews,
      savedVacancyIds,
      toggleSaveVacancy,
      applications,
      submitApplication,
      updateApplicationStatus,
      conversations,
      messages,
      activeConversationId,
      setActiveConversationId,
      sendMessage,
      startOrGetConversation,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      unreadNotificationsCount,
      reviews,
      addReview,
      reports,
      submitReport,
      resolveReport,
      currentView,
      selectedVacancyId,
      selectedCompanyId,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedCity,
      setSelectedCity,
      navigateTo,
      authModalOpen,
      authModalTab,
      openAuthModal,
      closeAuthModal,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
