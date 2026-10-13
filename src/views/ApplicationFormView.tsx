import React, { useState } from 'react';
import { ScreenType, BookingState } from '../types';

interface ApplicationFormViewProps {
  onNavigate: (screen: ScreenType) => void;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onSubmitSuccess: () => void;
  showToast: (msg: string) => void;
}

export const ApplicationFormView: React.FC<ApplicationFormViewProps> = ({
  onNavigate,
  bookingState,
  setBookingState,
  onSubmitSuccess,
  showToast,
}) => {
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([
    '이력서 및 포트폴리오 정밀 피드백',
    '대용량 트래픽 & 백엔드 시스템 코칭',
  ]);

  const [questionContent, setQuestionContent] = useState<string>(
    `안녕하세요 멘토님! 현재 3년차 백엔드 개발자로 재직 중이며 대규모 이커머스 트래픽 환경으로의 이직을 준비하고 있습니다.

1. 현재 MSA 환경에서 카프카 이벤트 유실 방지 및 트랜잭션 보장(Saga 패턴)을 도입 중인데, 실무 장애 대응 사례와 모범 사례가 궁금합니다.
2. 경력 기술서 상에서 시스템 성능 개선 성과를 면접관 관점에서 어떻게 어필해야 할지 피드백 받고 싶습니다.`
  );

  const [portfolioLink, setPortfolioLink] = useState<string>(
    'https://notion.so/my-backend-resume-kim-mentee'
  );

  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
  } | null>({
    name: '2024_백엔드_경력기술서_김멘티.pdf',
    size: '2.4 MB',
  });

  const [voucherApplied, setVoucherApplied] = useState<boolean>(true);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);

  const purposeOptions = [
    '이력서 및 포트폴리오 정밀 피드백',
    '대용량 트래픽 & 백엔드 시스템 코칭',
    '기술 면접 및 코딩테스트 대비',
    '이직 준비 전략 및 연봉 협상 노하우',
    '실무 개발 트러블슈팅 및 장애 대응',
  ];

  const togglePurpose = (option: string) => {
    if (selectedPurposes.includes(option)) {
      setSelectedPurposes(selectedPurposes.filter((p) => p !== option));
    } else {
      if (selectedPurposes.length >= 2) {
        showToast('신청 목적은 최대 2개까지 선택 가능합니다.');
        return;
      }
      setSelectedPurposes([...selectedPurposes, option]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
      showToast(`${file.name} 파일이 첨부되었습니다.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionContent.trim()) {
      showToast('질문 및 고민 내용을 입력해 주세요.');
      return;
    }
    if (!agreedToTerms) {
      showToast('운영 정책 및 취소/환불 규정에 동의해 주세요.');
      return;
    }

    setBookingState((prev) => ({
      ...prev,
      selectedPurposes,
      questionContent,
      portfolioLink,
      attachedFileName: attachedFile?.name || '',
      attachedFileSize: attachedFile?.size || '',
      voucherApplied,
      agreedToTerms,
    }));

    onSubmitSuccess();
  };

  return (
    <div className="flex flex-col w-full pb-36">
      {/* Stepper Header */}
      <div className="px-gutter-mobile pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">
              STEP 2/2
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">사전 질문지 및 신청</span>
          </div>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            일정 선택 완료
          </span>
        </div>

        {/* Informative Callout */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2 text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span>선택하신 세션 일정에 맞춰 질문지를 제출하시면 멘토 수락 후 매칭이 확정됩니다.</span>
        </div>
      </div>

      <div className="px-gutter-mobile space-y-4 pt-2">
        {/* Mentor & Schedule Card */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAszJUAsAEbW4oYq48AkV2_sSyalXS7xuQIo1RO5Lxzcl1Rv5M_JMveD2OVeKMk5_pNVK3p5vk_so7xwfKUo--XBFNTt70O7kx4QjrXiD6hMFb6QavNfobHQ_RynQ63zntRzAaDdb7wXjdIYUqJVdefmB01fqMRy4099s01GUoDfafI4qC8NUELiU8WjSjbcOAZOJk3mIKlF0qcAe7CCrJqNecKQv2aofJGUyiKcQmv4Oimdol3RzPx"
                alt="김현직 멘토"
                className="w-12 h-12 rounded-full object-cover shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-label-lg font-bold text-on-surface">김현직 멘토</span>
                  <span className="text-[11px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded font-bold">
                    11년차
                  </span>
                </div>
                <div className="text-xs text-secondary truncate mt-0.5">네카라쿠배 시니어 백엔드 리드</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('booking-schedule')}
              className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline cursor-pointer shrink-0"
            >
              <span>일정 변경</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl space-y-1.5 text-xs text-on-surface">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[17px]">calendar_month</span>
              <span className="font-semibold">2024년 10월 17일 (목) 오후 07:00 ~ 07:50 (50분)</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-tertiary text-[17px]">videocam</span>
              <span>1:1 온라인 화상 멘토링 · Google Meet 링크 제공</span>
            </div>
          </div>
        </div>

        {/* 멘토링 신청 목적 (최대 2개 선택) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-label-lg font-bold text-on-surface">멘토링 신청 목적</h3>
            <span className="text-xs text-primary font-semibold">최대 2개 선택</span>
          </div>
          <p className="text-xs text-on-surface-variant">멘토링을 통해 가장 집중적으로 얻고 싶은 포인트를 선택해 주세요.</p>

          <div className="flex flex-col gap-2 pt-1">
            {purposeOptions.map((opt) => {
              const isSelected = selectedPurposes.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => togglePurpose(opt)}
                  className={`w-full py-2.5 px-3.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isSelected ? 'check' : 'add'}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 질문 및 고민 내용 * (필수 입력) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-label-lg font-bold text-on-surface">질문 및 고민 내용</h3>
              <span className="text-error font-bold">*</span>
            </div>
            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-bold">필수 입력</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            구체적으로 작성할수록 멘토가 사전에 검토하여 깊이 있는 맞춤 솔루션을 준비할 수 있습니다.
          </p>

          {/* 작성 팁 박스 */}
          <div className="p-3 bg-surface-container-low rounded-xl flex items-start gap-2 text-xs text-secondary">
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">lightbulb</span>
            <span>작성 팁: 현재 겪고 있는 병목 지점, 시도해본 방안, 멘토의 조언이 필요한 부분을 적어주세요.</span>
          </div>

          <div className="relative">
            <textarea
              rows={7}
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-surface-container bg-surface-container-lowest text-xs text-on-surface leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="멘토님께 질문할 상세 내용이나 검토받고 싶은 고민을 작성해 주세요."
            ></textarea>
            <div className="flex items-center justify-between pt-1 text-[11px] text-secondary">
              <span className="inline-flex items-center gap-1 text-tertiary font-bold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                내용 충실도 높음
              </span>
              <span>{questionContent.length} / 1,000자</span>
            </div>
          </div>
        </div>

        {/* 참고 자료 첨부 (선택) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-label-lg font-bold text-on-surface">참고 자료 첨부 (선택)</h3>
            <span className="text-xs text-secondary font-medium">사전 검토용</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            이력서, 포트폴리오 노션 링크나 GitHub 레포지토리를 첨부하시면 상세한 피드백이 가능합니다.
          </p>

          {/* 포트폴리오 / 이력서 링크 */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">link</span>
              포트폴리오 / 이력서 링크
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                <span className="material-symbols-outlined text-[18px]">language</span>
              </div>
              <input
                type="url"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:bg-surface-container-lowest"
                placeholder="https://notion.so/..."
              />
            </div>
          </div>

          {/* 파일 첨부 */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">attach_file</span>
              파일 첨부
            </label>

            {/* Drag & Drop Upload Zone */}
            <label className="border-2 border-dashed border-surface-container hover:border-primary/50 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-surface-container-low/50 block">
              <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
              <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
              </div>
              <div className="font-label-md text-on-surface font-semibold">PDF, Word 파일 첨부 (최대 20MB)</div>
              <div className="text-[11px] text-secondary mt-0.5">터치하여 디바이스에서 파일 선택</div>
            </label>

            {/* Attached File Preview Card */}
            {attachedFile && (
              <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between gap-2 border border-surface-container">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-on-surface truncate">{attachedFile.name}</div>
                    <div className="text-[11px] text-secondary">{attachedFile.size} · 업로드 완료</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAttachedFile(null);
                    showToast('첨부 파일이 삭제되었습니다.');
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 정부·지자체 바우처 적용 (지원 대상자 badge) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">정부·지자체 바우처 적용</h3>
            </div>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              지원 대상자
            </span>
          </div>

          {/* Voucher Info Box */}
          <div className="bg-primary-fixed/30 rounded-xl p-3.5 space-y-1.5 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded font-bold">
                2024 서울시 청년 취업 멘토링 지원사업
              </span>
              <span className="text-xs font-bold text-primary">잔여 1회</span>
            </div>
            <h4 className="font-label-lg font-bold text-on-primary-fixed pt-0.5">1:1 전문 멘토링 지원 바우처</h4>
            <p className="text-xs text-secondary leading-snug">
              선정 대상자 혜택으로 멘토링 수수료 100% 전액이 시 지원금으로 지급됩니다.
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
            <input
              type="checkbox"
              checked={voucherApplied}
              onChange={(e) => setVoucherApplied(e.target.checked)}
              className="w-4 h-4 rounded text-primary mt-0.5 cursor-pointer"
            />
            <div className="text-xs">
              <div className="font-bold text-on-surface">청년 취업 바우처 1회권 적용 (-75,000원)</div>
              <div className="text-tertiary font-medium">본인 부담금 0원으로 세션이 예약됩니다.</div>
            </div>
          </label>
        </div>

        {/* 예약 및 환불 규정 동의 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">예약 및 환불 규정 동의</h3>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded text-primary mt-0.5 cursor-pointer"
            />
            <span className="text-xs font-bold text-on-surface">멘토링 운영 정책 및 취소/환불 규정에 전액 동의합니다.</span>
          </label>

          <div className="p-3 bg-surface-container-low rounded-xl space-y-2 text-xs text-on-surface-variant">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">info</span>
              <span>멘토링 시작 24시간 전까지 100% 무료 취소 및 일정 변경이 가능합니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">notifications_active</span>
              <span>멘토 사전 질문지 검토 후 수락 시 최종 확정 알림(카카오 알림톡/이메일)이 발송됩니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">lock</span>
              <span>제출된 포트폴리오 및 질문지는 오직 본 세션 진행을 위해서만 암호화 보관됩니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Floating Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-surface-container">
        <div className="px-gutter-mobile pt-3 pb-3 max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="line-through text-outline">75,000원</span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold px-1.5 py-0.2 rounded text-[10px]">
                100% 지원
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-metric-stat text-metric-stat text-primary font-extrabold leading-none">0</span>
              <span className="font-label-lg font-bold text-on-surface">원</span>
              <span className="text-[11px] text-secondary font-medium ml-0.5">(바우처 적용)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>신청 완료하기</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
