import React from 'react';
import { Grant } from '../types';

interface GrantDetailModalProps {
  grant: Grant | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestMentor: (grantTitle: string) => void;
  onApply: (grantTitle: string) => void;
}

export const GrantDetailModal: React.FC<GrantDetailModalProps> = ({
  grant,
  isOpen,
  onClose,
  onRequestMentor,
  onApply,
}) => {
  if (!isOpen || !grant) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl relative border border-surface-container animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-outline hover:text-on-surface">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
              {grant.agency}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
              {grant.dDay}
            </span>
          </div>

          <h3 className="font-headline-sm font-bold text-on-surface leading-tight">
            {grant.title}
          </h3>

          <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[11px] text-secondary">멘토리아 적합도</div>
              <div className="text-base font-bold text-tertiary">{grant.matchScore}% 일치</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-secondary">최대 지원 한도</div>
              <div className="text-base font-extrabold text-primary">
                {grant.maxAmount} <span className="text-xs font-normal text-on-surface">{grant.maxAmountSub}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-on-surface">주요 지원 혜택 및 신청 자격</h4>
            <div className="space-y-1.5 text-xs text-on-surface-variant">
              {grant.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[15px] shrink-0 mt-0.5">check</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary-fixed/50 p-3 rounded-xl flex items-center justify-between gap-2">
            <div className="text-xs text-on-secondary-fixed font-medium truncate">
              {grant.mentorHighlight}
            </div>
            <button
              onClick={() => {
                onRequestMentor(grant.title);
                onClose();
              }}
              className="px-2.5 py-1 rounded-md bg-primary text-on-primary text-xs font-bold shrink-0 hover:bg-primary-container"
            >
              전담 멘토
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onClose}
              className="py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onApply(grant.title);
                onClose();
              }}
              className="py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:opacity-95 transition-all"
            >
              신청서 서식 다운
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
