import React, { useState } from 'react';
import { Mentor } from '../types';

interface AIMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentors: Mentor[];
  onSelectMentor: (mentor: Mentor) => void;
}

export const AIMatchingModal: React.FC<AIMatchingModalProps> = ({
  isOpen,
  onClose,
  mentors,
  onSelectMentor,
}) => {
  const [stage, setStage] = useState<'question' | 'analyzing' | 'result'>('question');
  const [selectedGoal, setSelectedGoal] = useState<string>('백엔드 이직 및 대용량 트래픽 코칭');
  const [selectedExp, setSelectedExp] = useState<string>('주니어 (1~3년차)');

  if (!isOpen) return null;

  const handleStartAnalysis = () => {
    setStage('analyzing');
    setTimeout(() => {
      setStage('result');
    }, 1200);
  };

  const matchedMentor =
    selectedGoal.includes('사업계획서') || selectedGoal.includes('정부지원사업')
      ? mentors.find((m) => m.id === 'lee-startup') || mentors[0]
      : selectedGoal.includes('마케팅')
      ? mentors.find((m) => m.id === 'park-marketing') || mentors[0]
      : mentors.find((m) => m.id === 'kim-dev') || mentors[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl relative border border-surface-container animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {stage === 'question' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
              </div>
              <h3 className="font-headline-sm font-bold text-on-surface">30초 AI 맞춤 멘토 매칭</h3>
            </div>
            <p className="font-body-sm text-secondary">
              현재 해결하고 싶은 가장 중요한 커리어/사업 과제를 선택해 주세요.
            </p>

            <div className="space-y-2">
              <label className="font-label-md font-semibold text-on-surface">해결하고 싶은 과제</label>
              <div className="space-y-1.5">
                {[
                  '백엔드 이직 및 대용량 트래픽 코칭',
                  '정부지원사업/초창패 사업계획서 검토',
                  '초기 스타트업 CAC 절감 및 마케팅 퍼널',
                  '생성형 AI RAG 파이프라인 상용화',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedGoal(item)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedGoal === item
                        ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                        : 'border-surface-container hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md font-semibold text-on-surface">현재 연차 및 상태</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['취업 준비생', '주니어 (1~3년차)', '미들 (4~7년차)', '예비 창업가'].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setSelectedExp(exp)}
                    className={`p-2 rounded-xl text-xs text-center border transition-all cursor-pointer ${
                      selectedExp === exp
                        ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                        : 'border-surface-container hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-md hover:bg-on-primary-fixed-variant transition-all mt-2 cursor-pointer active:scale-95"
            >
              AI 추천 멘토 찾기
            </button>
          </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary-fixed mx-auto flex items-center justify-center text-primary animate-spin">
              <span className="material-symbols-outlined text-[28px]">smart_toy</span>
            </div>
            <h4 className="font-headline-sm font-bold text-on-surface">멘토 매칭 알고리즘 가동 중...</h4>
            <p className="font-body-sm text-secondary">
              선택하신 '{selectedGoal}' 목표에 최적화된 142명의 현직자를 분석 중입니다.
            </p>
          </div>
        )}

        {stage === 'result' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold px-2.5 py-0.5 rounded-full mb-1">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                적합도 99% 매칭
              </span>
              <h3 className="font-headline-sm font-bold text-on-surface">김멘티님을 위한 1순위 추천 멘토</h3>
            </div>

            <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
              <img
                src={matchedMentor.avatar}
                alt={matchedMentor.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg font-bold text-on-surface">{matchedMentor.name}</span>
                  <span className="text-[11px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded font-bold">
                    {matchedMentor.years}년차
                  </span>
                </div>
                <div className="text-xs text-secondary truncate mt-0.5">{matchedMentor.role}</div>
                <div className="flex items-center gap-1 text-xs text-primary font-bold mt-1">
                  <span>★ {matchedMentor.rating}</span>
                  <span className="text-outline font-normal">({matchedMentor.reviewCount}회 코칭)</span>
                </div>
              </div>
            </div>

            <p className="text-xs bg-surface-container-lowest p-2.5 rounded-lg border border-surface-container text-on-surface leading-relaxed">
              "{matchedMentor.quote}"
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setStage('question')}
                className="py-2.5 rounded-xl bg-surface-container text-on-surface font-label-sm font-semibold hover:bg-surface-container-high transition-colors"
              >
                다시 설정
              </button>
              <button
                onClick={() => {
                  onSelectMentor(matchedMentor);
                  onClose();
                }}
                className="py-2.5 rounded-xl bg-primary text-on-primary font-label-sm font-bold shadow-sm hover:opacity-95 transition-all"
              >
                세션 확인하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
