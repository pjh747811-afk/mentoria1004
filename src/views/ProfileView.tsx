import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ProfileViewProps {
  onNavigate: (screen: ScreenType) => void;
  voucherPoints: number;
  onOpenReviewModal: (mentorName: string, topic: string) => void;
  onOpenLiveRoom: (mentorName: string, topic: string) => void;
  showToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  voucherPoints,
  onOpenReviewModal,
  onOpenLiveRoom,
  showToast,
}) => {
  const [notiActive, setNotiActive] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="px-gutter-mobile pt-space-md pb-space-lg flex flex-col gap-space-lg">
        {/* Profile Card */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col gap-space-lg">
          <div className="flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-container flex-shrink-0 shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVh1ZL_u9v4t0dwcmjh3S4yefRWmhfA-IkLU2RG7WYsSCnCZGPJf8o1xZJcWIrmedmXCMTXKDHhrL4Bkcv9wyUYh4pmlqAe2mix2CE1TsoUArYg7LbbpyGcin-t6OPsNRYiy-NmZR84ZxypsMq7Acq5883vLXXoO0VtJ3zK_1J1D-EXEjSRHlR3mwt3-ibNQHx_IZougoStcXwE26SYxYy98tsnL1y5gy95lB2nYtY9Q11jWbKzaSn"
                  alt="김멘티 프로필"
                />
                <button
                  aria-label="프로필 이미지 변경"
                  onClick={() => showToast('프로필 사진 변경 기능이 열립니다.')}
                  className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                </button>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">김멘티</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                    성장 레벨 2
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary truncate mt-0.5">
                  예비 창업가 · 주니어 백엔드 취준생
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('프로필 기본 정보 수정 화면으로 이동합니다.')}
              className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex-shrink-0 flex items-center gap-1 cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">edit</span>
              수정
            </button>
          </div>

          {/* Quick 3 Stats */}
          <div className="grid grid-cols-3 gap-2 bg-surface-container-low rounded-lg p-space-sm">
            <div
              className="flex flex-col items-center justify-center p-2 rounded bg-surface-container-lowest text-center shadow-xs cursor-pointer hover:bg-surface transition-colors"
              onClick={() => onNavigate('my-mentoring')}
            >
              <span className="font-label-sm text-label-sm text-secondary">신청/진행</span>
              <span className="font-metric-stat text-metric-stat text-primary mt-0.5">
                3<span className="font-label-md text-label-md ml-0.5">건</span>
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center p-2 rounded bg-surface-container-lowest text-center shadow-xs cursor-pointer hover:bg-surface transition-colors"
              onClick={() => onNavigate('my-mentoring')}
            >
              <span className="font-label-sm text-label-sm text-secondary">완료 세션</span>
              <span className="font-metric-stat text-metric-stat text-tertiary mt-0.5">
                5<span className="font-label-md text-label-md ml-0.5">건</span>
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center p-2 rounded bg-surface-container-lowest text-center shadow-xs cursor-pointer hover:bg-surface transition-colors"
              onClick={() => onNavigate('mentors')}
            >
              <span className="font-label-sm text-label-sm text-secondary">북마크/찜</span>
              <span className="font-metric-stat text-metric-stat text-on-surface mt-0.5">
                8<span className="font-label-md text-label-md ml-0.5">건</span>
              </span>
            </div>
          </div>

          {/* 포인트 카드 */}
          <div className="flex items-center justify-between px-space-md py-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
              <span className="font-label-md text-label-md font-semibold">나의 멘토링 바우처 포인트</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
              {voucherPoints.toLocaleString()} <span className="font-label-sm text-label-sm">P</span>
            </span>
          </div>
        </div>

        {/* 멘토링 관리 */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-lg text-label-lg text-secondary uppercase tracking-wider font-semibold">
              멘토링 관리
            </span>
            <span className="font-label-sm text-label-sm text-secondary">최근 업데이트 오늘</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div
              className="p-space-md bg-primary-fixed-dim/20 flex items-center justify-between cursor-pointer hover:bg-primary-fixed-dim/30 transition-colors"
              onClick={() => onOpenLiveRoom('김현직', '클라우드 아키텍처 실무')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px]">videocam</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">내 멘토링 예약 내역</span>
                    <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold animate-pulse">
                      입장 대기 1
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">
                    오늘 오후 7:30 [클라우드 아키텍처 실무] 세션
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>

            <div
              className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => showToast('사전 질문지 및 포트폴리오 첨부 보관함 4건을 확인합니다.')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[22px]">inventory_2</span>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    신청서 및 사전 질문지 보관함
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">작성 완료된 質問지 4건 · 임시저장 1건</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>

            <div
              className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => onOpenReviewModal('박정우', '백엔드 트래픽 최적화')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[22px]">rate_review</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      작성 가능한 멘토링 리뷰
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      +3,000P 적립
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">박정우 멘토와의 세션 피드백을 남겨주세요</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>
          </div>
        </div>

        {/* 지원사업 연계 현황 */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-lg text-label-lg text-secondary uppercase tracking-wider font-semibold">
              지원사업 연계 현황
            </span>
            <span className="font-label-sm text-label-sm text-tertiary font-bold">공공 매칭 활성화</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-md flex flex-col gap-space-md">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-surface-container-low p-2 rounded-lg transition-colors"
              onClick={() => onNavigate('grants')}
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">bookmark</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    스크랩한 맞춤 지원사업
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">접수 마감 임박 2건 포함</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-label-lg text-label-lg text-primary font-bold">5건</span>
                <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    사업계획서 멘토 전문 첨삭
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold">
                  검토 완료 1건
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-body-sm text-body-sm text-on-surface truncate font-medium">
                  2025 청년창업사관학교 제15기 대비 사업계획서
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary flex-shrink-0">100%</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-body-sm text-[11px] text-secondary">담당 멘토: 한수진 심사역 (피드백 리포트 생성됨)</span>
                <button
                  type="button"
                  onClick={() => showToast('한수진 심사역의 사업계획서 첨삭 리포트 PDF를 내려받습니다.')}
                  className="px-2.5 py-1 rounded bg-surface-container-lowest text-tertiary text-label-sm font-label-sm font-bold shadow-xs hover:bg-surface transition-colors cursor-pointer"
                >
                  리포트 확인
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 계정 및 알림 설정 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-label-lg text-label-lg text-secondary uppercase tracking-wider px-1 font-semibold">
            계정 및 알림 설정
          </span>
          <div className="bg-surface-container-lowest rounded-xl shadow-xs divide-y divide-surface-container overflow-hidden">
            <div className="p-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    멘토링 시작 15분 전 알림
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">카카오 알림톡 및 푸시 알림 발송</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notiActive}
                  onChange={(e) => {
                    setNotiActive(e.target.checked);
                    showToast(e.target.checked ? '멘토링 시작 15분 전 알림이 활성화되었습니다.' : '알림이 해제되었습니다.');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-on-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div
              className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => showToast('관심 직무 및 창업 단계 수정 모달을 엽니다.')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    관심 직무 및 창업 단계 설정
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    IT/소프트웨어 · 예비창업 패키지 타겟
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>

            <div
              className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => showToast('멘토리아 1:1 고객센터 상담창으로 연결합니다.')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[22px]">support_agent</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  고객센터 &amp; 자주 묻는 질문
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>

            <div
              className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => showToast('멘토리아 공지사항 및 서비스 이용약관 페이지를 엽니다.')}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[22px]">campaign</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  공지사항 및 이용약관
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-space-sm py-space-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('로그아웃 되었습니다.')}
              className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors cursor-pointer"
            >
              로그아웃
            </button>
            <span className="text-surface-container-highest text-label-sm">|</span>
            <button
              onClick={() => showToast('회원 탈퇴 안내 페이지로 이동합니다.')}
              className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors cursor-pointer"
            >
              회원 탈퇴
            </button>
          </div>
          <span className="font-label-sm text-[11px] text-secondary/70">앱 버전 Mentoria v1.2.0 (최신 버전)</span>
        </div>
      </div>
    </div>
  );
};
