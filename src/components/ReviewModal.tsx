import React, { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  topic: string;
  onSubmit: (rating: number, reviewText: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  mentorName,
  topic,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState(
    '실제 현업 기술 심사관 관점에서 제 이력서와 포트폴리오를 봐주셔서 시야가 완전히 트였습니다. 질문마다 왜 그렇게 답해야 하는지 맥락을 짚어주셔서 감동했습니다.'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl relative border border-surface-container animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-outline hover:text-on-surface">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-tertiary text-[24px]">rate_review</span>
          <h3 className="font-headline-sm font-bold text-on-surface">멘토링 후기 작성</h3>
        </div>

        <div className="bg-surface-container-low p-2.5 rounded-xl text-xs text-secondary mb-3">
          <div className="font-bold text-on-surface">{mentorName} 멘토</div>
          <div className="truncate">{topic}</div>
        </div>

        <div className="bg-tertiary-fixed/30 p-2 rounded-lg flex items-center justify-between text-xs text-tertiary mb-3">
          <span className="font-semibold">후기 작성 완료 시 보상</span>
          <span className="font-bold text-primary">+3,000P 적립</span>
        </div>

        <div className="space-y-3">
          <div className="text-center py-1">
            <div className="text-xs text-secondary mb-1">세션 만족도 평점</div>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-500 transition-transform active:scale-125 cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            <div className="text-sm font-bold text-on-surface mt-1">{rating}.0 / 5.0</div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface block mb-1">상세 후기</label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-lowest text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="멘토링을 통해 얻은 인사이트와 솔직한 피드백을 남겨주세요."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                onSubmit(rating, reviewText);
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary-container transition-all"
            >
              후기 등록 (+3,000P)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
