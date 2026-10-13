import React, { useState } from 'react';
import { ScreenType, MentoringMatch } from '../types';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  matches: MentoringMatch[];
  onOpenLiveRoom: (mentorName: string, topic: string) => void;
  onOpenReviewModal: (mentorName: string, topic: string) => void;
  showToast: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  matches,
  onOpenLiveRoom,
  onOpenReviewModal,
  showToast,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Interactive Navigation Drawer / Menu Section */}
      <div className="px-gutter-mobile mb-4">
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-3">
          <div
            role="button"
            aria-expanded={isMenuOpen}
            tabIndex={0}
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }
            }}
          >
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">플랫폼 바로가기 메뉴</span>
              <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                5개 메뉴
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span>{isMenuOpen ? '메뉴 접기' : '메뉴 펼치기'}</span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Collapsible Navigation Rail */}
          {isMenuOpen && (
            <nav className="mt-3 pt-3 flex flex-col gap-1.5 border-t border-surface-container animate-in fade-in duration-150">
              {/* 1. Active: 홈 대시보드 */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary-fixed/40 text-primary cursor-pointer"
                onClick={() => onNavigate('home')}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="material-symbols-outlined text-[20px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    dashboard
                  </span>
                  <span className="font-label-lg text-label-lg font-bold text-primary">홈 대시보드</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">현재 화면</span>
                </div>
              </div>

              {/* 2. 멘토 탐색·매칭 */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors cursor-pointer"
                onClick={() => onNavigate('mentors')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary">manage_search</span>
                  <span className="font-label-md text-label-md text-on-surface">멘토 탐색·매칭</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-medium">이동하기</span>
              </div>

              {/* 3. 멘토링 캘린더 */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors cursor-pointer"
                onClick={() => onNavigate('my-mentoring')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary">event_available</span>
                  <span className="font-label-md text-label-md text-on-surface">멘토링 캘린더</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-medium">이동하기</span>
              </div>

              {/* 4. 지원사업 추천 */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors cursor-pointer"
                onClick={() => onNavigate('grants')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary">policy</span>
                  <span className="font-label-md text-label-md text-on-surface">지원사업 추천</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-medium">이동하기</span>
              </div>

              {/* 5. 프로필 관리 */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors cursor-pointer"
                onClick={() => onNavigate('profile')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary">person_outline</span>
                  <span className="font-label-md text-label-md text-on-surface">프로필 관리</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-medium">이동하기</span>
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* (1) Upper Greeting Line */}
      <section className="px-gutter-mobile mb-5">
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[16px]">waving_hand</span>
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Mentoria Member
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold leading-tight">
            안녕하세요, 김멘티님! 오늘의 멘토링과 추천 지원사업을 확인하세요.
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            신뢰할 수 있는 현직자 멘토링과 맞춤형 정책 자금이 성공적인 성장을 지원합니다.
          </p>
        </div>
      </section>

      {/* (2) Top 3 Stat Cards */}
      <section className="px-gutter-mobile mb-6">
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: 진행 예정 멘토링 */}
          <div
            onClick={() => onNavigate('my-mentoring')}
            className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container p-3 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer hover:border-primary/50"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-[11px] text-on-surface-variant font-medium truncate">진행 예정</span>
                <span className="w-6 h-6 rounded-md bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                </span>
              </div>
              <div className="flex items-baseline gap-0.5 mt-1">
                <span className="text-[26px] text-primary font-extrabold tracking-tight leading-none">3</span>
                <span className="font-label-md text-[13px] text-primary font-bold">건</span>
              </div>
            </div>
            <div className="mt-2.5 pt-1.5 border-t border-surface-container flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
              <span className="font-label-sm text-[11px] text-on-surface-variant truncate font-medium">10.12 예정</span>
            </div>
          </div>

          {/* Card 2: 추천 지원사업 */}
          <div
            onClick={() => onNavigate('grants')}
            className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container p-3 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer hover:border-primary/50"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-[11px] text-on-surface-variant font-medium truncate">추천 지원사업</span>
                <span className="w-6 h-6 rounded-md bg-tertiary-fixed/60 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[16px]">assured_workload</span>
                </span>
              </div>
              <div className="flex items-baseline gap-0.5 mt-1">
                <span className="text-[26px] text-tertiary font-extrabold tracking-tight leading-none">12</span>
                <span className="font-label-md text-[13px] text-tertiary font-bold">건</span>
              </div>
            </div>
            <div className="mt-2.5 pt-1.5 border-t border-surface-container flex items-center gap-1">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold leading-none truncate">
                매칭 94%
              </span>
            </div>
          </div>

          {/* Card 3: 프로필 완성도 */}
          <div
            onClick={() => onNavigate('profile')}
            className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container p-3 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer hover:border-primary/50"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-[11px] text-on-surface-variant font-medium truncate">프로필 완성도</span>
                <span className="w-6 h-6 rounded-md bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                </span>
              </div>
              <div className="flex items-baseline gap-0.5 mt-1">
                <span className="text-[26px] text-on-primary-fixed font-extrabold tracking-tight leading-none">85</span>
                <span className="font-label-md text-[13px] text-on-primary-fixed font-bold">%</span>
              </div>
            </div>
            <div className="mt-2.5 pt-1.5 border-t border-surface-container flex flex-col justify-center gap-1">
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (3) Recent Mentoring Matches (최근 멘토링 매칭) */}
      <section className="px-gutter-mobile mb-4">
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-4 sm:p-5">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3.5 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                최근 멘토링 매칭
              </h3>
            </div>
            <button
              onClick={() => onNavigate('my-mentoring')}
              className="font-label-sm text-label-sm text-secondary bg-surface-container hover:bg-surface-container-high px-2 py-0.5 rounded-full transition-colors"
            >
              전체 {matches.length}건
            </button>
          </div>

          {/* List Cards */}
          <div className="flex flex-col gap-3">
            {matches.map((item) => {
              const isKimDev = item.mentorName === '김현직';
              const isCompleted = item.status === '완료됨';

              return (
                <div
                  key={item.id}
                  className={`bg-surface-container-lowest border border-surface-container rounded-xl p-4 flex flex-col shadow-xs transition-all hover:border-primary/40 cursor-pointer ${
                    isCompleted && item.hasReview ? 'opacity-90' : ''
                  }`}
                  onClick={() => {
                    if (isKimDev) {
                      onNavigate('session-detail');
                    } else {
                      showToast(`${item.mentorName} 멘토와의 ${item.topic} 내역입니다.`);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">{item.mentorName}</span>
                        <span className="font-label-sm text-label-sm text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-md font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md font-semibold text-on-surface mt-1.5 mb-2.5 truncate">
                        {item.topic}
                      </p>
                    </div>

                    {item.status === '확정됨' ? (
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold border border-primary/20 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        확정됨
                      </span>
                    ) : (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold border border-tertiary/20">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">check_circle</span>
                        완료됨
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-surface-container text-on-surface-variant font-body-sm text-body-sm">
                    {item.status === '확정됨' ? (
                      <>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                            <span className="font-medium text-on-surface">10.12 (목) 19:00</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-primary font-medium">
                            <span className="material-symbols-outlined text-[13px]">info</span>
                            <span>시작 15분 전 입장 오픈</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast('시작 15분 전 푸시 알림과 캘린더 등록이 완료되었습니다.');
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/40 hover:bg-primary-fixed/70 text-primary font-label-sm text-[11px] font-semibold border border-primary/20 transition-all cursor-pointer active:scale-95 group"
                          >
                            <span className="material-symbols-outlined text-[12px] animate-pulse">timer</span>
                            <span>{item.countdown || '입장까지 02:45:10'}</span>
                            <span className="material-symbols-outlined text-[12px] ml-0.5 group-hover:scale-110 transition-transform">
                              notification_add
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLiveRoom(item.mentorName, item.topic);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs transition-all hover:bg-primary/90 cursor-pointer active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[15px]">videocam</span>
                            <span>입장하기</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px] text-outline">event_available</span>
                          일시: {item.date}
                        </span>

                        {!item.hasReview ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenReviewModal(item.mentorName, item.topic);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs transition-all hover:bg-primary/90 cursor-pointer active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[15px]">rate_review</span>
                            <span>리뷰 작성하기</span>
                          </button>
                        ) : (
                          <span className="font-label-sm text-label-sm text-outline font-medium bg-surface-container-low px-2 py-0.5 rounded border border-surface-container">
                            세션 종료
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
