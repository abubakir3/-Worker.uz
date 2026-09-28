import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { JobSearchView } from './views/JobSearchView';
import { VacancyDetailView } from './views/VacancyDetailView';
import { CompanyProfileView } from './views/CompanyProfileView';
import { CompaniesView } from './views/CompaniesView';
import { CompanyDashboardView } from './views/CompanyDashboardView';
import { JobSeekerProfileView } from './views/JobSeekerProfileView';
import { ApplicationsView } from './views/ApplicationsView';
import { ChatView } from './views/ChatView';
import { AdminPanelView } from './views/AdminPanelView';
import { StaticPagesView } from './views/StaticPagesView';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'search' && <JobSearchView />}
        {currentView === 'vacancy' && <VacancyDetailView />}
        {currentView === 'company' && <CompanyProfileView />}
        {currentView === 'companies' && <CompaniesView />}
        {currentView === 'dashboard' && <CompanyDashboardView />}
        {currentView === 'create-vacancy' && <CompanyDashboardView />}
        {currentView === 'profile' && <JobSeekerProfileView />}
        {currentView === 'applications' && <ApplicationsView />}
        {currentView === 'chat' && <ChatView />}
        {currentView === 'admin' && <AdminPanelView />}
        {(currentView === 'about' || currentView === 'faq' || currentView === 'terms' || currentView === 'privacy' || currentView === 'contact') && (
          <StaticPagesView page={currentView} />
        )}
      </main>

      <Footer />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
