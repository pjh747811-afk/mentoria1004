import React, { useState } from 'react';
import { ScreenType, MentoringMatch } from '../types';

interface MyMentoringViewProps {
  matches: MentoringMatch[];
  onNavigate: (screen: ScreenType) => void;
  onOpenLiveRoom: (mentorName: string, topic: string) => void;
  onOpenReviewModal: (mentorName: string, topic: string) => void;
  showToast: (msg: string) => void;
}

export const MyMentoringView: React.FC<MyMentoringViewProps> = ({
  matches,
  onNavigate,
  onOpenLiveRoom,
  onOpenReviewModal,
  showToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredMatches = matches.filter((m) => {
    if (filter === 'upcoming') return m.status === '확정됨' || m.status === '진행중';
    if (filter === 'completed') return m.status === '완료됨';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Header Banner */}
      <div className="px-gutter-mobile pt-space-md pb-space-sm">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Mentoring Calendar
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
              나의 멘토링 내역 &amp; 캘린더
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              신청한 1:1 세션 일정과 과거 멘토링 피드백 리포트를 한곳에서 관리하세요.
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-gutter-mobile pt-1 pb-3 flex gap-1.5">
        {[
          { key: 'all', label: `전체 (${matches.length})` },
          { key: 'upcoming', label: `진행 예정 (${matches.filter((m) => m.status === '확정됨').length})` },
          { key: 'completed', label: `완료됨 (${matches.filter((m) => m.status === '완료됨').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-gutter-mobile space-y-3">
        {filteredMatches.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-lowest border border-surface-container rounded-xl p-4 flex flex-col shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                {item.mentorAvatar ? (
                  <img
                    src={item.mentorAvatar}
                    alt={item.mentorName}
                    className="w-12 h-12 rounded-xl object-cover shadow-xs shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0 font-bold">
                    {item.mentorName[0]}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-lg font-bold text-on-surface">{item.mentorName} 멘토</span>
                    <span className="text-[11px] bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-body-md font-semibold text-on-surface truncate mt-0.5">{item.topic}</h3>
                </div>
              </div>

              {item.status === '확정됨' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-label-sm font-bold shrink-0 border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  확정됨
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold shrink-0 border border-tertiary/20">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  완료됨
                </span>
              )}
            </div>

            <div className="bg-surface-container-low p-3 rounded-lg flex items-center justify-between text-xs text-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">schedule</span>
                <span>
                  일시: {item.date} {item.time}
                </span>
              </div>
              <span className="text-secondary font-medium">화상 1:1 세션 (50분)</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1 gap-2">
              {item.status === '확정됨' ? (
                <>
                  <button
                    type="button"
                    onClick={() => showToast('질문지 및 사전 첨부서류를 확인합니다.')}
                    className="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                  >
                    사전 질문지 확인
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLiveRoom(item.mentorName, item.topic)}
                    className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-container text-xs font-bold text-on-primary transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    <span>입장하기</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => showToast('세션 요약 노트와 피드백 리포트를 불러옵니다.')}
                    className="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                  >
                    피드백 리포트 보기
                  </button>
                  {!item.hasReview ? (
                    <button
                      type="button"
                      onClick={() => onOpenReviewModal(item.mentorName, item.topic)}
                      className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-container text-xs font-bold text-on-primary transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">rate_review</span>
                      <span>리뷰 작성하기 (+3,000P)</span>
                    </button>
                  ) : (
                    <span className="flex-1 py-2 text-center text-xs text-outline font-medium bg-surface-container-low rounded-lg">
                      리뷰 작성 완료됨
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
