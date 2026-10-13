import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Hide BottomNav on multi-step booking flows and sub-screens if needed
  if (
    currentScreen === 'session-detail' ||
    currentScreen === 'booking-schedule' ||
    currentScreen === 'application-form'
  ) {
    return null;
  }

  const tabs: { key: ScreenType; label: string; icon: string }[] = [
    { key: 'home', label: '홈', icon: 'home' },
    { key: 'mentors', label: '멘토 찾기', icon: 'groups' },
    { key: 'grants', label: '지원사업', icon: 'assured_workload' },
    { key: 'my-mentoring', label: '멘토링 내역', icon: 'calendar_month' },
    { key: 'profile', label: 'MY', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f7f9fb]/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.06)] border-t border-surface-container">
      <div className="flex justify-around items-center h-16 px-gutter-mobile max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.key;
          return (
            <button
              key={tab.key}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors cursor-pointer active:scale-95 ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => onNavigate(tab.key)}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-label-sm text-label-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
