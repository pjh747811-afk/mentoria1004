import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SessionDetailViewProps {
  onNavigate: (screen: ScreenType) => void;
  showToast: (msg: string) => void;
}

export const SessionDetailView: React.FC<SessionDetailViewProps> = ({
  onNavigate,
  showToast,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(38);

  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      showToast('관심 멘토링 목록에서 제외되었습니다.');
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      showToast('관심 멘토링 목록에 추가되었습니다.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: '현직 대기업 백엔드 리드 개발자의 주니어/취준생 이력서 및 커리어 패스 집중 리뷰',
          text: '멘토리아에서 마감 임박한 백엔드 실시간 멘토링을 확인해 보세요!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('세션 링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 세션 대표 이미지 배너 */}
      <div className="relative w-full h-56 bg-surface-container-high overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQJOdSuuZf7lYAD8n-XX8bRBx3lUWzpGvdKTP23b0w2qTgykgmzVJxEv02SY5Qz8zJgczCUDciSRry7eRkSpVWeSCCZsC-fhZHc4vgDMG8dtxkkQnzfCwZYg8IvSsd0SeVh02HTQGN1pvxuAbTsOr0ahWuvZBa0KgHpNsyuDMJI2LyIw17B0QHa1eAh8fs7Hvfi9aQjs1J230uhBtBA9bEv4o4uyeX1nL3PpEkMsUJGhw5RS0ZT3J5')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px]">videocam</span> 온라인 LIVE 화상 클래스
          </span>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px] text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            4.9 (후기 58개)
          </span>
        </div>
      </div>

      <div className="px-gutter-mobile pt-space-md space-y-space-md">
        {/* 메타 상태 및 타이틀 카드 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-sm">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full font-semibold">
              IT/개발 · 백엔드 커리어 리뷰
            </span>
            <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              D-3 모집 마감 임박
            </span>
          </div>

          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold leading-tight pt-1">
            현직 대기업 백엔드 리드 개발자의 주니어/취준생 이력서 및 커리어 패스 집중 리뷰
          </h2>

          {/* 모집 인원 게이지 바 */}
          <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant font-medium">모집 현황 (선착순)</span>
              <span className="text-primary font-bold">
                정원 5명 중 4명 신청 <span className="text-error font-extrabold">(잔여 1자리)</span>
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* 일정 및 장소 정보 */}
          <div className="pt-space-xs space-y-2 text-on-surface-variant font-body-sm text-body-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
              <span className="font-medium text-on-surface">2024.10.12 (목) 19:00 ~ 21:00 (2시간 소요)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">devices</span>
              <span className="font-medium text-on-surface">Google Meet 온라인 실시간 화상 세션</span>
            </div>
          </div>
        </div>

        {/* 멘토 프로필 카드 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">멘토 프로필</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/30 px-2.5 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span> 현직 인증 완료
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-xs">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmYoXfa4H0oD6_3gwcy9b312WTzDKmumJ6OtWU4FOQekmXajWD2ZRnsLPwT2e7A4wpCQ3uJ5VaKKoV3CeSNjLvBqatJfigdphIEA5QTBGCNuVjudVVNqw4lljVILPpdT1W6FLTqK7h_aP6BKVTuMSl_pcqV0rMDRtYOHty24dQ46nFXjsUDtuC9cLf0Q4QwtaOikdiF4OLhgxRlDr9mIl5NnJaSL0aJ9yTXqx1TmIlWGGdFWe-bJq4"
                alt="김현직 멘토"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">김현직 멘토</h3>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-bold">
                  멘토링 9년차
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
                네카라쿠배 현직 시니어 백엔드 엔지니어 / 테크 리드
              </p>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface bg-surface-container-low p-space-sm rounded-lg leading-relaxed">
            “실무에서 직접 겪은 시행착오를 바탕으로, 서류 탈락 없는 이력서와 지속 가능한 성장 전략을 함께 고민해 드립니다.”
          </p>

          {/* 멘토 신뢰 지표 박스 */}
          <div className="grid grid-cols-3 gap-2 text-center pt-space-xs">
            <div className="bg-surface-container-low rounded-lg py-2.5 px-1">
              <div className="font-metric-stat text-metric-stat text-primary font-extrabold">
                4.9<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">/5.0</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">평균 리뷰 평점</div>
            </div>
            <div className="bg-surface-container-low rounded-lg py-2.5 px-1">
              <div className="font-metric-stat text-metric-stat text-on-surface font-extrabold">
                142<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">회</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">누적 멘토링 완료</div>
            </div>
            <div className="bg-surface-container-low rounded-lg py-2.5 px-1">
              <div className="font-metric-stat text-metric-stat text-tertiary font-extrabold">
                98<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">%</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">멘티 추천 만족도</div>
            </div>
          </div>
        </div>

        {/* 이런 분께 추천해요 카드 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">target</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">이런 분께 추천해요</h3>
          </div>
          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                신입/주니어 백엔드 포지션 취업 및 이직을 본격적으로 준비 중인 분
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                서류 합격률이 낮아 포트폴리오와 이력서의 뼈대 있는 피드백이 절실한 분
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                기술 면접에서 주도적으로 답변을 이끌어가는 현직자의 시각과 노하우가 궁금한 분
              </p>
            </div>
          </div>
        </div>

        {/* 상세 커리큘럼 및 진행 순서 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">format_list_bulleted</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">세션 진행 커리큘럼</h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">총 120분 밀착 진행</span>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-high">
            {/* 1부 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold ring-4 ring-surface-container-lowest">
                1
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded">
                    1부 (40분)
                  </span>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface">개발자 채용 트렌드 &amp; 합불 사례</h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  최근 주요 IT 기업 백엔드 채용 트렌드 분석 및 주니어 이력서 합격/불합격 실사례 심층 비교
                </p>
              </div>
            </div>

            {/* 2부 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold ring-4 ring-surface-container-lowest">
                2
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded">
                    2부 (50분)
                  </span>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface">1:1 라이브 피드백 &amp; 질의응답</h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  사전 제출한 참여자별 이력서/포트폴리오 화면 공유 1:1 라이브 첨삭 및 아키텍처/코드 질의응답
                </p>
              </div>
            </div>

            {/* 3부 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-[11px] font-bold ring-4 ring-surface-container-lowest">
                3
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded">
                    3부 (30분)
                  </span>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface">자유 Q&amp;A 및 세션 랩업</h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  실무 개발자 커리어 로드맵 조언, 멘토와의 허심탄회한 자유 Q&amp;A 및 핵심 요약 랩업
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 사전 준비물 & 유의사항 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[22px]">info</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">사전 준비물 &amp; 유의사항</h3>
          </div>
          <div className="bg-surface-container-low rounded-lg p-space-sm space-y-2 font-body-sm text-body-sm text-on-surface">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                assignment_turned_in
              </span>
              <span>
                사전 질문 1가지 및 검토받을 <strong>깃허브(GitHub)</strong> 또는 <strong>노션(Notion)</strong> 이력서 링크를
                신청서 제출 시 남겨주세요.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">schedule</span>
              <span>
                원활한 진행을 위해 <strong>세션 시작 15분 전</strong> 알림톡 및 등록된 이메일로 온라인 구글 밋 입장 링크가 전달됩니다.
              </span>
            </div>
          </div>
        </div>

        {/* 생생 참여 후기 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                reviews
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">생생 참여 후기</h3>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold cursor-pointer">
              후기 전체보기 (58)
            </span>
          </div>

          <div className="space-y-3">
            {/* 후기 1 */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">수강생 이*민</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">2주 전 참여</span>
                </div>
                <div className="flex items-center text-amber-500 text-[14px]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                  <span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">5.0</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                “서류 합격률이 3배 올랐습니다! 멘토님이 짚어주신 프로젝트 트러블슈팅 정리가 결정적이었어요. 무엇보다 막연했던 취준 방향이 확실해졌습니다.”
              </p>
            </div>

            {/* 후기 2 */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">수강생 박*준</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">1개월 전 참여</span>
                </div>
                <div className="flex items-center text-amber-500 text-[14px]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                  <span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">5.0</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                “실제 현업 기술 면접관 관점에서 제 이력서를 봐주셔서 시야가 완전히 트였습니다. 질문마다 왜 그렇게 답해야 하는지 맥락을 짚어주셔서 감동했습니다.”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 플로팅 바 (Bottom Floating Bar) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#f7f9fb]/95 backdrop-blur-md pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-surface-container">
        <div className="h-20 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-md mx-auto">
          {/* 서브 액션 버튼 군 */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label="찜하기"
              onClick={toggleLike}
              className={`w-12 h-12 rounded-xl bg-surface-container-high flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer ${
                isLiked ? 'text-error' : 'text-on-surface-variant'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              <span className="font-label-sm text-[10px] leading-tight">{likeCount}</span>
            </button>
            <button
              aria-label="공유하기"
              onClick={handleShare}
              className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">share</span>
            </button>
          </div>

          {/* 메인 신청 버튼 */}
          <button
            onClick={() => onNavigate('booking-schedule')}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-md active:bg-on-primary-fixed-variant active:scale-[0.98] transition-all cursor-pointer hover:bg-primary-container"
          >
            <span>멘토링 신청하기</span>
            <span className="bg-on-primary/20 text-on-primary text-[12px] px-2 py-0.5 rounded-full font-bold">
              잔여 1석
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
