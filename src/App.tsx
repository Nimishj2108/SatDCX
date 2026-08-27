import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { AuthModal } from './components/AuthModal';
import { ForeignerTravelerModal } from './components/ForeignerTravelerModal';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { OverviewPage } from './components/dashboard/OverviewPage';
import { PaySettlePage } from './components/dashboard/PaySettlePage';
import { FirewallPage } from './components/dashboard/FirewallPage';
import { DustGuardPage } from './components/dashboard/DustGuardPage';
import { SavingsVaultPage } from './components/dashboard/SavingsVaultPage';
import { TraceabilityPage } from './components/dashboard/TraceabilityPage';
import { CybersecurityPage } from './components/dashboard/CybersecurityPage';
import { LearnCopilotPage } from './components/dashboard/LearnCopilotPage';
import { DeveloperPage } from './components/dashboard/DeveloperPage';
import { GeminiChatbot } from './components/GeminiChatbot';
import { UserProfile, DashboardPageType, TripPlannerData } from './types';

// Default mock user profile for immediate demo exploration
const DEFAULT_USER: UserProfile = {
  name: 'Nimish Jain',
  handle: '@nimish.sat',
  mobile: '+91 98765 43210',
  email: 'nimish@satdcx.io',
  accountType: 'individual',
  nationality: 'indian',
  kycStatus: 'Verified',
  balanceBtc: 1.70186,
  balanceInr: 142800,
  unconfirmedSats: 0,
  channelsCount: 8,
  securityScore: 98,
  pin: '1234',
  lightningAddress: 'nimish@satdcx.me',
  memberSince: 'August 2026',
};

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeDashboardPage, setActiveDashboardPage] = useState<DashboardPageType>('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [foreignerModalOpen, setForeignerModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check saved session
  useEffect(() => {
    const savedAuth = localStorage.getItem('satdcx_auth_user') || localStorage.getItem('satconnect_auth_user');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user session', e);
      }
    }
  }, []);

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleOpenForeignerPortal = () => {
    setAuthModalOpen(false);
    setForeignerModalOpen(true);
  };

  const handleLoginSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    setIsLoggedIn(true);
    localStorage.setItem('satdcx_auth_user', JSON.stringify(authenticatedUser));
    setViewMode('dashboard');
    setActiveDashboardPage('overview');
  };

  const handleCompleteTravelerSetup = (travelerUser: UserProfile, tripData: TripPlannerData) => {
    setUser(travelerUser);
    setIsLoggedIn(true);
    localStorage.setItem('satdcx_auth_user', JSON.stringify(travelerUser));
    localStorage.setItem('satdcx_traveler_trip', JSON.stringify(tripData));
    setForeignerModalOpen(false);
    setViewMode('dashboard');
    setActiveDashboardPage('pay-settle'); // Immediately direct traveler to the UPI & Fair Price scanner!
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('satdcx_auth_user');
    localStorage.removeItem('satdcx_traveler_trip');
    localStorage.removeItem('satconnect_auth_user');
    localStorage.removeItem('satconnect_traveler_trip');
    setViewMode('landing');
  };

  const handleEnterDemoDashboard = () => {
    setUser(DEFAULT_USER);
    setIsLoggedIn(true);
    setViewMode('dashboard');
    setActiveDashboardPage('overview');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Signature Namaste Preloader */}
      <Preloader />

      {/* Auth Modal with OTP Verification */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
        onLaunchForeignerPortal={handleOpenForeignerPortal}
      />

      {/* 6-Step Foreigner Traveler Onboarding & Passport Blockchain Verification Modal */}
      <ForeignerTravelerModal
        isOpen={foreignerModalOpen}
        onClose={() => setForeignerModalOpen(false)}
        onCompleteTravelerSetup={handleCompleteTravelerSetup}
      />

      {/* VIEW SWITCHER: LANDING PAGE vs MULTI-PAGE DASHBOARD */}
      {viewMode === 'landing' ? (
        <LandingPage
          onOpenLogin={handleOpenLogin}
          onOpenSignup={handleOpenSignup}
          onEnterDemoDashboard={handleEnterDemoDashboard}
          onOpenForeignerPortal={handleOpenForeignerPortal}
        />
      ) : (
        <DashboardLayout
          user={user}
          activePage={activeDashboardPage}
          onNavigate={(page) => setActiveDashboardPage(page)}
          onLogout={handleLogout}
          onGoToLanding={() => setViewMode('landing')}
        >
          {/* PAGE ROUTER */}
          {activeDashboardPage === 'overview' && (
            <OverviewPage
              user={user}
              onNavigate={(page) => setActiveDashboardPage(page)}
              onOpenQuickPay={() => setActiveDashboardPage('pay-settle')}
            />
          )}

          {activeDashboardPage === 'pay-settle' && <PaySettlePage user={user} />}

          {activeDashboardPage === 'firewall' && <FirewallPage />}

          {activeDashboardPage === 'dustguard' && <DustGuardPage />}

          {activeDashboardPage === 'savings' && <SavingsVaultPage />}

          {activeDashboardPage === 'traceability' && <TraceabilityPage />}

          {activeDashboardPage === 'security-center' && <CybersecurityPage />}

          {activeDashboardPage === 'copilot-learn' && <LearnCopilotPage />}

          {activeDashboardPage === 'developers' && <DeveloperPage />}
        </DashboardLayout>
      )}

      {/* Global Gemini AI Assistant Chatbot with 2-Slide Interactive Presentation & Feedback Rating */}
      <GeminiChatbot />
    </div>
  );
}
