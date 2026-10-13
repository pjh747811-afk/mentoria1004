import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onToggleMenu?: () => void;
  onNotificationClick?: () => void;
  title?: string;
  isSubScreen?: boolean;
  onBack?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onToggleMenu,
  onNotificationClick,
  title,
  isSubScreen,
  onBack,
  onShare,
  onBookmark,
  isBookmarked,
}) => {
  if (isSubScreen) {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-14 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-xs min-w-0 flex-1">
            <button
              aria-label="뒤로 가기"
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors -ml-2 cursor-pointer active:scale-90"
              onClick={onBack}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate pr-2">
              {title || 'Session Detail'}
            </h1>
          </div>
          <div className="flex items-center gap-space-xs shrink-0">
            {onBookmark && (
              <button
                aria-label="북마크에 저장"
                className={`w-11 h-11 flex items-center justify-center transition-colors cursor-pointer active:scale-90 ${
                  isBookmarked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
                onClick={onBookmark}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>
            )}
            {onShare && (
              <button
                aria-label="공유하기"
                className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-90"
                onClick={onShare}
              >
                <span className="material-symbols-outlined text-[22px]">share</span>
              </button>
            )}
            {currentScreen === 'application-form' && (
              <button
                aria-label="닫기"
                className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-90"
                onClick={onBack}
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-gutter-mobile flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <button
            aria-label="메뉴 열기"
            className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer active:scale-90"
            onClick={onToggleMenu}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <div
            className="flex items-center gap-space-xs cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">멘토리아</span>
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase ml-1">Mentoria</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="알림"
            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer active:scale-90"
            onClick={onNotificationClick}
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error animate-pulse"></span>
          </button>
          <button
            aria-label="내 프로필"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => onNavigate('profile')}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
