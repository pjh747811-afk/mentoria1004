import React, { useState } from 'react';
import { ScreenType, BookingState } from '../types';

interface BookingScheduleViewProps {
  onNavigate: (screen: ScreenType) => void;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  showToast: (msg: string) => void;
}

export const BookingScheduleView: React.FC<BookingScheduleViewProps> = ({
  onNavigate,
  bookingState,
  setBookingState,
  showToast,
}) => {
  const [selectedDay, setSelectedDay] = useState(17);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(2); // default: 오후 07:00

  const timeSlots = [
    {
      id: 'slot-1',
      time: '오전 10:00 ~ 10:50',
      shortTime: '오전 10:00',
      desc: '사전 예약 마감',
      badge: '마감',
      disabled: true,
      icon: 'lock_clock',
    },
    {
      id: 'slot-2',
      time: '오후 02:00 ~ 02:50',
      shortTime: '오후 2:00',
      desc: '즉시 예약 가능',
      badge: '선택 가능',
      disabled: false,
      icon: 'wb_sunny',
    },
    {
      id: 'slot-3',
      time: '오후 07:00 ~ 07:50',
      shortTime: '오후 7:00',
      desc: '퇴근 후 추천 시간대 🔥',
      badge: '선택됨',
      disabled: false,
      icon: 'bedtime',
    },
    {
      id: 'slot-4',
      time: '오후 08:30 ~ 09:20',
      shortTime: '오후 8:30',
      desc: '인기 급상승 시간',
      badge: '잔여 1석',
      disabled: false,
      icon: 'nightlight',
    },
    {
      id: 'slot-5',
      time: '오후 10:00 ~ 10:50',
      shortTime: '오후 10:00',
      desc: '심야 딥다이브 멘토링',
      badge: '선택 가능',
      disabled: false,
      icon: 'dark_mode',
    },
  ];

  const handleSelectSlot = (slot: typeof timeSlots[0], idx: number) => {
    if (slot.disabled) return;
    setSelectedSlotIndex(idx);
    setBookingState((prev) => ({
      ...prev,
      timeStr: slot.time,
      shortTime: slot.shortTime,
    }));
  };

  const handleSelectDate = (dayNum: number) => {
    setSelectedDay(dayNum);
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][(dayNum - 1 + 2) % 7];
    const newDateStr = `10월 ${dayNum}일 (${dayOfWeek})`;
    const newShortDate = `10.${dayNum}(${dayOfWeek})`;

    setBookingState((prev) => ({
      ...prev,
      dateStr: newDateStr,
      shortDate: newShortDate,
    }));
    showToast(`${newDateStr} 일정이 선택되었습니다.`);
  };

  const handleNextStep = () => {
    onNavigate('application-form');
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Progress Stepper Header */}
      <div className="px-gutter-mobile pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
              1
            </span>
            <span className="font-label-lg text-label-lg text-primary font-bold">일정 및 시간 선택</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">STEP 1/2</span>
        </div>
        {/* Step Bar */}
        <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden flex">
          <div className="bg-primary h-full w-1/2 rounded-full transition-all duration-300"></div>
          <div className="bg-transparent h-full w-1/2"></div>
        </div>
      </div>

      {/* Target Mentor Profile Card */}
      <div className="px-gutter-mobile pt-2 pb-3">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs">
          <div className="flex items-start gap-space-md">
            <div className="relative shrink-0">
              <img
                className="w-14 h-14 rounded-full object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAszJUAsAEbW4oYq48AkV2_sSyalXS7xuQIo1RO5Lxzcl1Rv5M_JMveD2OVeKMk5_pNVK3p5vk_so7xwfKUo--XBFNTt70O7kx4QjrXiD6hMFb6QavNfobHQ_RynQ63zntRzAaDdb7wXjdIYUqJVdefmB01fqMRy4099s01GUoDfafI4qC8NUELiU8WjSjbcOAZOJk3mIKlF0qcAe7CCrJqNecKQv2aofJGUyiKcQmv4Oimdol3RzPx"
                alt="김현직 멘토"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-xs flex-wrap mb-0.5">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">김현직 멘토</span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                  시니어 백엔드 리드
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mb-2">
                네카라쿠배 11년차 · 시스템 아키텍처 &amp; 커리어 로드맵
              </p>
              <div className="flex items-center gap-2 flex-wrap text-secondary">
                <div className="flex items-center gap-1 font-label-md text-label-md bg-surface-container-low px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[15px] text-primary">videocam</span>
                  <span>1:1 화상 (50분)</span>
                </div>
                <div className="flex items-center gap-1 font-label-md text-label-md bg-surface-container-low px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[15px] text-tertiary">card_membership</span>
                  <span className="font-bold text-on-surface">75,000원</span>
                  <span className="text-tertiary font-medium text-[11px]">(바우처 가능)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Scheduling Card */}
      <div className="px-gutter-mobile py-2">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs">
          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">2024년 10월</span>
              <button
                type="button"
                onClick={() => handleSelectDate(17)}
                className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                오늘
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="이전 달"
                type="button"
                onClick={() => showToast('2024년 10월 예약 일정만 진행 중입니다.')}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                aria-label="다음 달"
                type="button"
                onClick={() => showToast('2024년 11월 일정은 10월 25일에 오픈됩니다.')}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center font-label-md text-label-md py-2 mb-1">
            <span className="text-error font-medium">일</span>
            <span className="text-on-surface-variant font-medium">월</span>
            <span className="text-on-surface-variant font-medium">화</span>
            <span className="text-on-surface-variant font-medium">수</span>
            <span className="text-on-surface-variant font-medium">목</span>
            <span className="text-on-surface-variant font-medium">금</span>
            <span className="text-primary font-medium">토</span>
          </div>

          {/* Date Matrix (October 2024 starts on Tue Oct 1) */}
          <div className="grid grid-cols-7 gap-y-1.5 text-center font-body-md text-body-md">
            {/* Sept padding */}
            <div className="h-10 flex items-center justify-center text-outline-variant opacity-30 font-label-md">29</div>
            <div className="h-10 flex items-center justify-center text-outline-variant opacity-30 font-label-md">30</div>

            {/* Oct 1 - Oct 14: Disabled */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((d) => (
              <button
                key={d}
                disabled
                className="h-10 w-full flex flex-col items-center justify-center rounded-lg text-outline-variant opacity-40 cursor-not-allowed"
              >
                <span className="font-medium text-sm">{d}</span>
              </button>
            ))}

            {/* Oct 15 - 31 */}
            {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((dayNum) => {
              const isSelected = selectedDay === dayNum;
              const isSunday = dayNum === 20 || dayNum === 27;
              const isSaturday = dayNum === 19 || dayNum === 26;
              const isAvailable = ![15, 20, 23, 27].includes(dayNum);

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => handleSelectDate(dayNum)}
                  className={`h-10 w-full flex flex-col items-center justify-center rounded-lg relative transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-md'
                      : isSunday
                      ? 'text-error hover:bg-surface-container'
                      : isSaturday
                      ? 'text-primary hover:bg-surface-container'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>{dayNum}</span>
                  <span
                    className={`w-1 h-1 rounded-full mt-0.5 ${
                      isSelected
                        ? 'bg-on-primary'
                        : isAvailable
                        ? 'bg-tertiary'
                        : 'bg-outline-variant'
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-transparent text-center">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>예약 가능</span>
            </div>
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span>선택됨</span>
            </div>
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
              <span>마감됨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slot Selection Section */}
      <div className="px-gutter-mobile py-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-primary">schedule</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {bookingState.dateStr || '10월 17일 (목)'} 예약 가능 시간
            </h2>
          </div>
          <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
            4개 슬롯
          </span>
        </div>

        {/* Time Slot List */}
        <div className="flex flex-col gap-2">
          {timeSlots.map((slot, idx) => {
            const isSelected = selectedSlotIndex === idx && !slot.disabled;

            if (slot.disabled) {
              return (
                <button
                  key={slot.id}
                  disabled
                  className="w-full bg-surface-container-low opacity-60 p-3.5 rounded-xl flex items-center justify-between cursor-not-allowed text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[18px]">{slot.icon}</span>
                    </div>
                    <div>
                      <div className="font-label-lg text-label-lg text-on-surface-variant line-through">
                        {slot.time}
                      </div>
                      <div className="font-body-sm text-body-sm text-outline">{slot.desc}</div>
                    </div>
                  </div>
                  <span className="bg-surface-container-high text-outline px-2 py-1 rounded font-label-sm text-label-sm">
                    {slot.badge}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => handleSelectSlot(slot, idx)}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all active:scale-[0.99] shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-primary-fixed/25 border border-primary/30'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{slot.icon}</span>
                  </div>
                  <div>
                    <div
                      className={`font-label-lg text-label-lg ${
                        isSelected ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                      }`}
                    >
                      {slot.time}
                    </div>
                    <div
                      className={`font-body-sm text-body-sm ${
                        isSelected ? 'text-primary/80 font-medium' : 'text-tertiary'
                      }`}
                    >
                      {slot.desc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                      isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : slot.badge.includes('1석')
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-tertiary/10 text-tertiary'
                    }`}
                  >
                    {isSelected ? '선택됨' : slot.badge}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isSelected ? 'text-primary' : 'text-outline-variant'
                    }`}
                    style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mentoring Checklist & Policy Info Card */}
      <div className="px-gutter-mobile py-2.5">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <div className="flex items-center gap-2 text-on-surface font-bold mb-2.5">
            <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              info
            </span>
            <span className="font-headline-sm text-headline-sm">예약 전 확인해 주세요</span>
          </div>
          <ul className="space-y-2 text-on-surface-variant font-body-sm text-body-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 shrink-0">task_alt</span>
              <span>
                세션 확정 후 <strong>사전 질문지 및 이력서/포트폴리오 링크</strong>를 등록하여 맞춤형 멘토링을 준비할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 shrink-0">history</span>
              <span>
                멘토링 시작 <strong>24시간 전까지 100% 무료 취소</strong> 및 유연한 일정 변경이 지원됩니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 shrink-0">mark_chat_read</span>
              <span>
                예약 완료 즉시 <strong>구글 밋(Google Meet) 접속 링크 및 캘린더 초대장</strong>이 카카오 알림톡으로 발송됩니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Fixed Action Floating Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-surface-container">
        <div className="px-gutter-mobile pt-3 pb-3 max-w-md mx-auto">
          {/* Selected Summary Ribbon */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-primary">event_available</span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                선택 일정:{' '}
                <strong className="text-primary font-bold">
                  {bookingState.shortDate} {bookingState.shortTime}
                </strong>{' '}
                (50분)
              </span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-label-sm text-label-sm bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-bold">
                국비·바우처 지원
              </span>
            </div>
          </div>

          {/* Action Row: Price & CTA Button */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-metric-stat text-metric-stat text-on-surface font-extrabold leading-none">
                  {bookingState.price.toLocaleString()}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">원</span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary font-medium">바우처 적용 시 실결제 0원</span>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-lg text-label-lg font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>다음 단계로 (신청서 작성)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
