import React, { useState, useMemo } from 'react';
import { Mentor, ScreenType } from '../types';

interface MentorsViewProps {
  mentors: Mentor[];
  onSelectMentor: (mentor: Mentor) => void;
  onNavigate: (screen: ScreenType) => void;
  onToggleBookmark: (mentorId: string) => void;
  onOpenAIMatchModal: () => void;
  showToast: (msg: string) => void;
}

export const MentorsView: React.FC<MentorsViewProps> = ({
  mentors,
  onSelectMentor,
  onNavigate,
  onToggleBookmark,
  onOpenAIMatchModal,
  showToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterInstant, setFilterInstant] = useState<boolean>(false);
  const [filterExp50, setFilterExp50] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<'popular' | 'recent' | 'rating' | 'price'>('popular');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const categories = [
    { key: 'all', label: '전체' },
    { key: 'dev', label: 'IT/개발' },
    { key: 'pm', label: '기획/PM' },
    { key: 'marketing', label: '마케팅/그로스' },
    { key: 'design', label: '디자인' },
    { key: 'data', label: '데이터/AI' },
    { key: 'startup', label: '창업/BM' },
    { key: 'ir', label: '투자/IR' },
    { key: 'hr', label: '인사/노무' },
  ];

  const sortLabels = {
    popular: '인기순',
    recent: '최신순',
    rating: '평점순',
    price: '가격 낮은순',
  };

  const filteredMentors = useMemo(() => {
    let result = [...mentors];

    // 1. Category
    if (activeCategory !== 'all') {
      result = result.filter(
        (m) => m.category === activeCategory || m.categories.includes(activeCategory)
      );
    }

    // 2. Secondary filter: instant
    if (filterInstant) {
      result = result.filter((m) => m.isInstantAvailable);
    }

    // 3. Secondary filter: 50+
    if (filterExp50) {
      result = result.filter((m) => m.sessionCount >= 50);
    }

    // 4. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((m) => {
        const fullText = `${m.name} ${m.role} ${m.company} ${m.quote} ${m.tags.join(' ')}`.toLowerCase();
        return fullText.includes(q);
      });
    }

    // 5. Sort
    result.sort((a, b) => {
      if (currentSort === 'rating') {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      } else if (currentSort === 'price') {
        return a.price - b.price;
      } else if (currentSort === 'recent') {
        return b.dateAdded - a.dateAdded;
      } else {
        // popular: reviews/sessions count
        if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
        return a.order - b.order;
      }
    });

    return result;
  }, [mentors, activeCategory, filterInstant, filterExp50, searchQuery, currentSort]);

  const handleBookMentor = (mentor: Mentor) => {
    onSelectMentor(mentor);
    onNavigate('booking-schedule');
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Sticky Search Header & Filter Bar */}
      <section className="sticky top-14 z-40 bg-[#f7f9fb]/95 backdrop-blur-md px-gutter-mobile pt-space-sm pb-space-md shadow-xs">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            id="mentor-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="직무, 기업명, 키워드 (예: 백엔드, 사업계획서, IR피칭)"
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pt-space-sm pb-1 -mx-gutter-mobile px-gutter-mobile">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`filter-chip flex-shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Pills / Sorting Controls */}
        <div className="flex items-center justify-between pt-space-xs relative">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => {
                setFilterInstant(!filterInstant);
                showToast(!filterInstant ? '실시간 상담 가능한 멘토만 표시합니다.' : '전체 상담 멘토를 표시합니다.');
              }}
              className={`secondary-filter flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-xs transition-all whitespace-nowrap border border-transparent cursor-pointer ${
                filterInstant
                  ? 'bg-tertiary text-on-tertiary'
                  : 'bg-surface-container-lowest text-tertiary'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-ping"></span>
              실시간 상담 가능
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterExp50(!filterExp50);
                showToast(!filterExp50 ? '멘토링 50회 이상 베테랑 멘토만 필터링합니다.' : '전체 멘토를 표시합니다.');
              }}
              className={`secondary-filter px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-xs transition-all whitespace-nowrap border border-transparent cursor-pointer ${
                filterExp50
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'bg-surface-container-lowest text-secondary'
              }`}
            >
              멘토링 50회+
            </button>
          </div>

          {/* Interactive Sort Dropdown Button & Popover */}
          <div className="relative flex items-center flex-shrink-0 pl-2">
            <button
              type="button"
              aria-expanded={isSortOpen}
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 py-1 px-2 rounded-lg bg-surface-container-lowest/80 hover:bg-surface-container text-on-surface font-label-sm text-label-sm shadow-xs transition-colors border border-outline-variant/30 active:scale-95 cursor-pointer"
            >
              <span className="font-medium text-on-surface">{sortLabels[currentSort]}</span>
              <span
                className={`material-symbols-outlined text-[16px] text-outline transition-transform duration-200 ${
                  isSortOpen ? 'rotate-180' : ''
                }`}
              >
                unfold_more
              </span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-1.5 z-50 animate-in fade-in zoom-in-95 origin-top-right transition-all">
                {(['popular', 'recent', 'rating', 'price'] as const).map((key) => {
                  const isSelected = currentSort === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setCurrentSort(key);
                        setIsSortOpen(false);
                        showToast(`정렬 기준이 '${sortLabels[key]}'으로 변경되었습니다.`);
                      }}
                      className={`w-full px-3 py-2 text-left font-label-sm text-label-sm flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer ${
                        isSelected ? 'text-primary font-bold' : 'text-on-surface'
                      }`}
                    >
                      <span>{sortLabels[key]}</span>
                      {isSelected && (
                        <span
                          className="material-symbols-outlined text-[16px] text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Opportunity Highlight Banner */}
      <section className="px-gutter-mobile pt-space-md">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-container p-4 text-on-primary shadow-md">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-white/20 font-label-sm text-label-sm backdrop-blur-xs text-on-primary font-bold">
                  10월 한정 이벤트
                </span>
                <span className="font-label-sm text-label-sm text-primary-fixed">합격보장 멘토링 매칭</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-bold leading-tight">
                정부지원사업 &amp; 대기업 이직
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-container opacity-90 mt-0.5">
                검증된 현직자 1:1 세션 최대 30% 바우처 지원
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>
      </section>

      {/* Result Counter & Verified Notice */}
      <div className="px-gutter-mobile pt-space-md pb-space-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-label-lg text-label-lg font-bold text-on-surface">추천 멘토</span>
          <span className="font-label-md text-label-md text-primary font-bold">{filteredMentors.length}명</span>
        </div>
        <div className="flex items-center gap-1 text-secondary">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span className="font-label-sm text-label-sm">전원 재직/경력 서류 100% 인증</span>
        </div>
      </div>

      {/* Mentor Cards Feed */}
      <section className="px-gutter-mobile flex flex-col gap-space-md pt-space-xs">
        {filteredMentors.map((mentor) => (
          <article
            key={mentor.id}
            className="mentor-card relative flex flex-col rounded-2xl bg-surface-container-lowest p-5 shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Top Row: Avatar + Info + Bookmark */}
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex items-center gap-3 cursor-pointer min-w-0"
                onClick={() => {
                  onSelectMentor(mentor);
                  if (mentor.id === 'kim-dev') {
                    onNavigate('session-detail');
                  } else {
                    onNavigate('booking-schedule');
                  }
                }}
              >
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0 shadow-xs">
                  <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  {mentor.isInstantAvailable && (
                    <div
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-tertiary-fixed ring-2 ring-surface-container-lowest"
                      title="온라인 상태"
                    ></div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{mentor.name}</span>
                    {mentor.isTopMentor ? (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          workspace_premium
                        </span>
                        TOP 멘토
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px]">
                        <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                        현직인증
                      </span>
                    )}
                  </div>
                  <span className="font-label-md text-label-md text-secondary truncate mt-0.5">
                    {mentor.role} · {mentor.years}년차
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5 text-on-surface font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-bold">{mentor.rating.toFixed(1)}</span>
                      <span className="text-outline text-body-sm">({mentor.reviewCount}회)</span>
                    </div>
                    <span className="text-outline text-label-sm">·</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-medium">
                      {mentor.specialtyHighlight}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="관심 멘토 저장"
                onClick={() => {
                  onToggleBookmark(mentor.id);
                  showToast(!mentor.bookmarked ? '관심 멘토 목록에 저장되었습니다.' : '관심 멘토 목록에서 삭제되었습니다.');
                }}
                className={`w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center transition-colors hover:text-primary cursor-pointer ${
                  mentor.bookmarked ? 'text-primary' : 'text-outline'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: mentor.bookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>
            </div>

            {/* Introduction Quote */}
            <div
              className="mt-3.5 p-3 rounded-xl bg-surface-container-low cursor-pointer"
              onClick={() => {
                onSelectMentor(mentor);
                if (mentor.id === 'kim-dev') {
                  onNavigate('session-detail');
                } else {
                  onNavigate('booking-schedule');
                }
              }}
            >
              <p className="font-body-md text-body-md text-on-surface line-clamp-2">“{mentor.quote}”</p>
            </div>

            {/* Skill Tags */}
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Format & Session Highlights */}
            <div className="flex items-center justify-between mt-3.5 pt-3 border-none bg-surface-container-lowest">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                  <span className="material-symbols-outlined text-[15px]">videocam</span>
                  {mentor.format}
                </span>
                {mentor.formatHighlight && (
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                      mentor.formatHighlight.includes('즉시') || mentor.formatHighlight.includes('내일')
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                  >
                    {mentor.formatHighlight}
                  </span>
                )}
              </div>
              <span className="font-label-lg text-label-lg font-bold text-on-surface">
                {mentor.price.toLocaleString()}원
                <span className="font-body-sm text-body-sm text-outline font-normal"> / 회</span>
              </span>
            </div>

            {/* Action Button */}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => handleBookMentor(mentor)}
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform cursor-pointer hover:bg-primary-container"
              >
                <span>
                  {mentor.isInstantAvailable && mentor.isTopMentor
                    ? '즉시 상담 예약'
                    : '1:1 멘토링 신청'}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {mentor.isInstantAvailable && mentor.isTopMentor ? 'bolt' : 'arrow_forward'}
                </span>
              </button>
            </div>
          </article>
        ))}

        {/* Empty State Display */}
        {filteredMentors.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-lowest text-center border border-dashed border-outline-variant my-2">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
              <span className="material-symbols-outlined text-[32px]">person_search</span>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
              일치하는 멘토가 없습니다
            </span>
            <p className="font-body-sm text-body-sm text-secondary mb-4">
              다른 검색어를 입력하시거나 카테고리를 변경해 보세요.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterInstant(false);
                setFilterExp50(false);
              }}
              className="px-4 py-2 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              전체 멘토 보기
            </button>
          </div>
        )}
      </section>

      {/* Floating Match Advisory Card */}
      <section className="px-gutter-mobile pt-space-lg">
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">
                나에게 딱 맞는 멘토를 못 찾으셨나요?
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                고민 키워드를 입력하시면 30초 내에 AI가 추천해 드려요.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAIMatchModal}
            className="flex-shrink-0 px-3 py-2 rounded-xl bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold hover:bg-surface-variant transition-colors cursor-pointer active:scale-95 shadow-xs"
          >
            AI 매칭
          </button>
        </div>
      </section>
    </div>
  );
};
