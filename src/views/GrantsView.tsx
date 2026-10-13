import React, { useState } from 'react';
import { Grant, ScreenType } from '../types';

interface GrantsViewProps {
  grants: Grant[];
  onNavigate: (screen: ScreenType) => void;
  onSelectGrant: (grant: Grant) => void;
  onToggleBookmark: (grantId: string) => void;
  onToggleAlarm: (grantId: string) => void;
  showToast: (msg: string) => void;
}

export const GrantsView: React.FC<GrantsViewProps> = ({
  grants,
  onNavigate,
  onSelectGrant,
  onToggleBookmark,
  onToggleAlarm,
  showToast,
}) => {
  const [activeSort, setActiveSort] = useState<'match' | 'deadline' | 'available'>('match');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: '전체 분야' },
    { key: 'startup', label: '창업 / R&D' },
    { key: 'marketing', label: '마케팅 / 판로개척' },
    { key: 'employment', label: '고용 / 인건비 지원' },
    { key: 'voucher', label: '바우처 / 멘토링' },
  ];

  const sortedGrants = [...grants].sort((a, b) => {
    if (activeSort === 'match') {
      return b.matchScore - a.matchScore;
    } else if (activeSort === 'deadline') {
      return a.dDay.localeCompare(b.dDay);
    } else {
      return a.status === 'active' ? -1 : 1;
    }
  });

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Visual Banner & Contextual Greeting */}
      <div className="px-gutter-mobile pt-space-md pb-space-sm">
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                AI 맞춤 분석 완료
              </span>
              <span className="font-label-sm text-label-sm text-secondary">업데이트 10분 전</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
              김멘티님을 위한<br />
              <span className="text-primary">추천 정부지원사업</span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              등록하신 프로필을 분석해 경쟁력 높은 공고를 추렸어요.
            </p>

            {/* Profile Insight Pill Box */}
            <div className="mt-space-sm bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">domain</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    IT/SW · 초기 스타트업 (창업 2년차)
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    적합 사업 총 <strong className="text-primary font-bold">12건</strong> 발굴
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('관심 직무 및 타겟 지원사업 조건을 수정합니다.')}
                className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm flex items-center gap-0.5 cursor-pointer"
              >
                조건 변경
                <span className="material-symbols-outlined text-[14px]">tune</span>
              </button>
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
          <div className="absolute right-3 top-3 opacity-10 text-primary pointer-events-none">
            <span className="material-symbols-outlined text-[72px]">verified</span>
          </div>
        </div>
      </div>

      {/* Filter & Sort Sticky Section */}
      <div className="sticky top-14 z-40 bg-[#f7f9fb]/95 backdrop-blur-md pt-space-xs pb-space-sm px-gutter-mobile flex flex-col gap-space-xs shadow-xs">
        <div className="flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveSort('match');
                showToast('매칭 적합도 순으로 정렬되었습니다.');
              }}
              className={`filter-sort-btn px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
                activeSort === 'match'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              매칭순 (98%~)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSort('deadline');
                showToast('접수 마감 임박 순으로 정렬되었습니다.');
              }}
              className={`filter-sort-btn px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
                activeSort === 'deadline'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">timer</span>
              마감임박순
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSort('available');
                showToast('현재 접수 중인 공고만 표시합니다.');
              }}
              className={`filter-sort-btn px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
                activeSort === 'available'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              접수중만 보기
            </button>
          </div>

          <button
            type="button"
            aria-label="필터 모달 열기"
            onClick={() => showToast('상세 지원 분야 필터 옵션을 불러옵니다.')}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {categories.map((c) => {
            const isCatActive = activeCategory === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveCategory(c.key)}
                className={`cat-pill px-2.5 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors cursor-pointer ${
                  isCatActive
                    ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice List Container */}
      <div className="px-gutter-mobile flex flex-col gap-space-md mt-space-sm">
        {sortedGrants.map((grant) => (
          <article
            key={grant.id}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs transition-all hover:shadow-md flex flex-col gap-space-sm relative border border-surface-container"
          >
            {/* Header Row: Agency, D-Day & Bookmark */}
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                    {grant.agency}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm flex items-center gap-0.5 font-bold ${
                      grant.dDay.includes('D-')
                        ? 'bg-error-container text-on-error-container'
                        : grant.dDay.includes('상시')
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {grant.dDay.includes('상시') ? 'all_inclusive' : 'alarm'}
                    </span>
                    {grant.dDay}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 leading-snug">
                  {grant.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="스크랩"
                onClick={() => {
                  onToggleBookmark(grant.id);
                  showToast(!grant.isBookmarked ? '관심 지원사업에 저장되었습니다.' : '스크랩 목록에서 제거되었습니다.');
                }}
                className={`p-1.5 transition-colors flex-shrink-0 cursor-pointer ${
                  grant.isBookmarked ? 'text-primary' : 'text-outline hover:text-primary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: grant.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {grant.isBookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Match Score & Benefit Highlight */}
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary">멘토리아 적합도</span>
                  <span className="font-label-lg text-label-lg text-tertiary font-bold">{grant.matchScore}% 일치</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-secondary">최대 지원금</span>
                <div className="font-metric-stat text-metric-stat text-primary font-extrabold tracking-tight">
                  {grant.maxAmount}{' '}
                  <span className="font-label-md text-label-md font-semibold text-on-surface">{grant.maxAmountSub}</span>
                </div>
              </div>
            </div>

            {/* Eligibility Summary Bullets */}
            <div className="flex flex-col gap-1 py-1">
              {grant.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 flex-shrink-0">check</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Mentoria Exclusive Badge & Mentor Match CTA */}
            <div className="bg-secondary-fixed/50 rounded-lg p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-secondary-fixed font-medium truncate">
                  {grant.mentorHighlight}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onNavigate('mentors');
                  showToast(`'${grant.title}' 서류 검토 전담 멘토 리스트로 이동합니다.`);
                }}
                className="px-2.5 py-1 rounded-md bg-primary text-on-primary font-label-sm text-label-sm whitespace-nowrap hover:bg-primary-container transition-colors shadow-xs cursor-pointer font-bold"
              >
                멘토 매칭
              </button>
            </div>

            {/* Card Action Buttons */}
            {grant.status === 'upcoming' ? (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onToggleAlarm(grant.id);
                    showToast(!grant.alarmRegistered ? '공고 오픈 24시간 전 푸시 알림과 가이드가 전송됩니다.' : '알림 예약이 취소되었습니다.');
                  }}
                  className={`w-full py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    grant.alarmRegistered
                      ? 'bg-tertiary-container text-on-tertiary font-bold'
                      : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {grant.alarmRegistered ? 'notifications_active' : 'notification_add'}
                  </span>
                  <span>
                    {grant.alarmRegistered
                      ? '오픈 알림 예약 완료 (가이드북 발송)'
                      : '공고 오픈 시 알림 신청 (사전문서 가이드북 증정)'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-space-xs pt-1">
                <button
                  type="button"
                  onClick={() => onSelectGrant(grant)}
                  className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-surface-variant transition-colors cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  공고 요약
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`[${grant.title}] 공식 접수 양식 및 가이드 문서를 다운로드합니다.`);
                  }}
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 shadow-xs hover:opacity-95 transition-all cursor-pointer font-bold"
                >
                  {grant.title.includes('사관학교') ? '지원서 작성' : grant.title.includes('바우처') ? '바우처 신청' : '즉시 신청하기'}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Bottom Delight Banner */}
      <div className="px-gutter-mobile mt-space-lg">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary-container p-space-md text-on-primary shadow-md flex items-center justify-between gap-space-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-0.5">
            <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-bold">
              Mentoria Advantage
            </span>
            <h4 className="font-headline-sm text-headline-sm font-bold">지원사업 탈락이 두려우신가요?</h4>
            <p className="font-body-sm text-body-sm text-on-primary-container opacity-90 mt-0.5">
              실제 선정 경험 멘토에게 초안 1:1 무료 피드백을 받아보세요.
            </p>
            <button
              type="button"
              onClick={() => {
                onNavigate('mentors');
                showToast('스타트업 전담 멘토 신청 화면으로 이동합니다.');
              }}
              className="mt-2 self-start px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-xs hover:bg-primary-fixed transition-colors cursor-pointer"
            >
              전담 멘토 신청하기
            </button>
          </div>
          <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[28px] text-on-primary">draw</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
