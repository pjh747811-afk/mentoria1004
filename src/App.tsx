/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Mentor, Grant, MentoringMatch, BookingState } from './types';
import { INITIAL_MENTORS, INITIAL_GRANTS, INITIAL_MATCHES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LiveSessionModal } from './components/LiveSessionModal';
import { AIMatchingModal } from './components/AIMatchingModal';
import { ReviewModal } from './components/ReviewModal';
import { GrantDetailModal } from './components/GrantDetailModal';
import { HomeView } from './views/HomeView';
import { MentorsView } from './views/MentorsView';
import { SessionDetailView } from './views/SessionDetailView';
import { BookingScheduleView } from './views/BookingScheduleView';
import { ApplicationFormView } from './views/ApplicationFormView';
import { GrantsView } from './views/GrantsView';
import { ProfileView } from './views/ProfileView';
import { MyMentoringView } from './views/MyMentoringView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [historyStack, setHistoryStack] = useState<ScreenType[]>(['home']);
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [grants, setGrants] = useState<Grant[]>(INITIAL_GRANTS);
  const [matches, setMatches] = useState<MentoringMatch[]>(INITIAL_MATCHES);
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(INITIAL_MENTORS[0]);
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [voucherPoints, setVoucherPoints] = useState<number>(12500);

  // Modals state
  const [liveRoom, setLiveRoom] = useState<{ isOpen: boolean; mentorName: string; topic: string }>({
    isOpen: false,
    mentorName: '김현직',
    topic: '백엔드 커리어 리뷰 및 시스템 아키텍처',
  });

  const [reviewModal, setReviewModal] = useState<{ isOpen: boolean; mentorName: string; topic: string }>({
    isOpen: false,
    mentorName: '',
    topic: '',
  });

  const [aiMatchModalOpen, setAiMatchModalOpen] = useState<boolean>(false);
  const [grantModalOpen, setGrantModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<any>(null);

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    setToastTimer(timer);
  };

  // Booking Flow State
  const [bookingState, setBookingState] = useState<BookingState>({
    mentorId: 'kim-dev',
    dateStr: '10월 17일 (목)',
    shortDate: '10.17(목)',
    timeStr: '오후 07:00 ~ 07:50',
    shortTime: '오후 7:00',
    price: 75000,
    voucherApplied: true,
    selectedPurposes: ['이력서 및 포트폴리오 정밀 피드백', '대용량 트래픽 & 백엔드 시스템 코칭'],
    questionContent: `안녕하세요 멘토님! 현재 3년차 백엔드 개발자로 재직 중이며 대규모 이커머스 트래픽 환경으로의 이직을 준비하고 있습니다.

1. 현재 MSA 환경에서 카프카 이벤트 유실 방지 및 트랜잭션 보장(Saga 패턴)을 도입 중인데, 실무 장애 대응 사례와 모범 사례가 궁금합니다.
2. 경력 기술서 상에서 시스템 성능 개선 성과를 면접관 관점에서 어떻게 어필해야 할지 피드백 받고 싶습니다.`,
    portfolioLink: 'https://notion.so/my-backend-resume-kim-mentee',
    attachedFileName: '2024_백엔드_경력기술서_김멘티.pdf',
    attachedFileSize: '2.4 MB',
    agreedToTerms: true,
  });

  const handleNavigate = (target: ScreenType) => {
    setHistoryStack((prev) => [...prev, target]);
    setCurrentScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop();
      const prevScreen = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmarkMentor = (mentorId: string) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === mentorId ? { ...m, bookmarked: !m.bookmarked } : m))
    );
  };

  const handleToggleBookmarkGrant = (grantId: string) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === grantId ? { ...g, isBookmarked: !g.isBookmarked } : g))
    );
  };

  const handleToggleAlarmGrant = (grantId: string) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === grantId ? { ...g, alarmRegistered: !g.alarmRegistered } : g))
    );
  };

  const handleOpenReview = (mentorName: string, topic: string) => {
    setReviewModal({
      isOpen: true,
      mentorName,
      topic,
    });
  };

  const handleSubmitReview = (rating: number, reviewText: string) => {
    setVoucherPoints((prev) => prev + 3000);
    setMatches((prev) =>
      prev.map((m) => (m.mentorName === reviewModal.mentorName ? { ...m, hasReview: true } : m))
    );
    showToast(`리뷰가 등록되었습니다! 바우처 포인트 +3,000P가 적립되었습니다.`);
  };

  const handleOpenLiveRoom = (mentorName: string, topic: string) => {
    setLiveRoom({
      isOpen: true,
      mentorName,
      topic,
    });
  };

  const handleApplicationSubmit = () => {
    // Add new booking to matches list
    const newMatch: MentoringMatch = {
      id: `match-${Date.now()}`,
      mentorName: selectedMentor.name,
      category: selectedMentor.category === 'dev' ? 'IT/개발' : '커리어 코칭',
      topic: '주니어/취준생 이력서 및 커리어 패스 집중 리뷰',
      date: bookingState.shortDate,
      time: bookingState.shortTime,
      status: '확정됨',
      countdown: '멘토 수락 대기중',
      canEnterRoom: true,
      mentorAvatar: selectedMentor.avatar,
    };

    setMatches((prev) => [newMatch, ...prev]);
    showToast('멘토링 신청서가 성공적으로 접수되었습니다! 멘토 검토 후 알림톡이 발송됩니다.');
    handleNavigate('my-mentoring');
  };

  // Determine subscreen styling
  const isSubScreen =
    currentScreen === 'session-detail' ||
    currentScreen === 'booking-schedule' ||
    currentScreen === 'application-form';

  const subScreenTitle =
    currentScreen === 'session-detail'
      ? 'Session Detail'
      : currentScreen === 'booking-schedule'
      ? 'Session Detail'
      : 'Application Form';

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans relative max-w-md mx-auto shadow-2xl overflow-x-hidden">
      {/* Universal Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onToggleMenu={() => showToast('플랫폼 메인 메뉴를 확인해 보세요.')}
        onNotificationClick={() => showToast('새로운 멘토링 알림: 오늘 19:00 세션 입장 15분 전입니다.')}
        isSubScreen={isSubScreen}
        title={subScreenTitle}
        onBack={handleBack}
        onShare={() => {
          if (navigator.share) {
            navigator.share({ title: 'Mentoria', url: window.location.href }).catch(() => {});
          } else {
            showToast('공유 링크가 클립보드에 복사되었습니다.');
          }
        }}
        onBookmark={() => showToast('관심 멘토링 목록에 추가되었습니다.')}
        isBookmarked={false}
      />

      {/* Main View Area */}
      <main className={`flex-1 flex flex-col relative w-full ${isSubScreen ? 'pt-14' : 'pt-16 pb-20'}`}>
        {currentScreen === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            matches={matches}
            onOpenLiveRoom={handleOpenLiveRoom}
            onOpenReviewModal={handleOpenReview}
            showToast={showToast}
          />
        )}

        {currentScreen === 'mentors' && (
          <MentorsView
            mentors={mentors}
            onSelectMentor={(m) => setSelectedMentor(m)}
            onNavigate={handleNavigate}
            onToggleBookmark={handleToggleBookmarkMentor}
            onOpenAIMatchModal={() => setAiMatchModalOpen(true)}
            showToast={showToast}
          />
        )}

        {currentScreen === 'session-detail' && (
          <SessionDetailView onNavigate={handleNavigate} showToast={showToast} />
        )}

        {currentScreen === 'booking-schedule' && (
          <BookingScheduleView
            onNavigate={handleNavigate}
            bookingState={bookingState}
            setBookingState={setBookingState}
            showToast={showToast}
          />
        )}

        {currentScreen === 'application-form' && (
          <ApplicationFormView
            onNavigate={handleNavigate}
            bookingState={bookingState}
            setBookingState={setBookingState}
            onSubmitSuccess={handleApplicationSubmit}
            showToast={showToast}
          />
        )}

        {currentScreen === 'grants' && (
          <GrantsView
            grants={grants}
            onNavigate={handleNavigate}
            onSelectGrant={(g) => {
              setSelectedGrant(g);
              setGrantModalOpen(true);
            }}
            onToggleBookmark={handleToggleBookmarkGrant}
            onToggleAlarm={handleToggleAlarmGrant}
            showToast={showToast}
          />
        )}

        {currentScreen === 'my-mentoring' && (
          <MyMentoringView
            matches={matches}
            onNavigate={handleNavigate}
            onOpenLiveRoom={handleOpenLiveRoom}
            onOpenReviewModal={handleOpenReview}
            showToast={showToast}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileView
            onNavigate={handleNavigate}
            voucherPoints={voucherPoints}
            onOpenReviewModal={handleOpenReview}
            onOpenLiveRoom={handleOpenLiveRoom}
            showToast={showToast}
          />
        )}
      </main>

      {/* Universal Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Google Meet Live Mentoring Room Modal */}
      <LiveSessionModal
        isOpen={liveRoom.isOpen}
        onClose={() => setLiveRoom((prev) => ({ ...prev, isOpen: false }))}
        mentorName={liveRoom.mentorName}
        topic={liveRoom.topic}
      />

      {/* AI Mentor Recommendation Modal */}
      <AIMatchingModal
        isOpen={aiMatchModalOpen}
        onClose={() => setAiMatchModalOpen(false)}
        mentors={mentors}
        onSelectMentor={(m) => {
          setSelectedMentor(m);
          handleNavigate('session-detail');
        }}
      />

      {/* Review Submission Modal (+3,000P) */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal((prev) => ({ ...prev, isOpen: false }))}
        mentorName={reviewModal.mentorName}
        topic={reviewModal.topic}
        onSubmit={handleSubmitReview}
      />

      {/* Grant Summary & Apply Modal */}
      <GrantDetailModal
        grant={selectedGrant}
        isOpen={grantModalOpen}
        onClose={() => setGrantModalOpen(false)}
        onRequestMentor={(title) => {
          handleNavigate('mentors');
          showToast(`'${title}' 서류 검토 전담 멘토를 추천합니다.`);
        }}
        onApply={(title) => {
          showToast(`[${title}] 신청 서식 다운로드가 완료되었습니다.`);
        }}
      />

      {/* Universal Toast Feedback Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 inset-x-4 z-50 flex items-center justify-between p-3.5 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              info
            </span>
            <span className="font-label-md text-label-md">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-inverse-on-surface hover:opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
