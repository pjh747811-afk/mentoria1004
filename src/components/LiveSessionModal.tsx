import React, { useState, useEffect } from 'react';

interface LiveSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  topic: string;
}

export const LiveSessionModal: React.FC<LiveSessionModalProps> = ({
  isOpen,
  onClose,
  mentorName,
  topic,
}) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { sender: mentorName, text: '안녕하세요 멘티님! 음성과 화면 잘 보이시나요?', time: '19:00' },
    { sender: '나 (김멘티)', text: '네 멘토님! 잘 들립니다. 오늘 이력서 봐주셔서 감사합니다.', time: '19:01' },
    { sender: mentorName, text: '네, 사전 제출해주신 카프카 이벤트 유실 방지 아키텍처 다이어그램 화면 공유 중입니다.', time: '19:01' },
  ]);
  const [newMsg, setNewMsg] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(145);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    const msg = {
      sender: '나 (김멘티)',
      text: newMsg.trim(),
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, msg]);
    setNewMsg('');

    // Simulate mentor reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: mentorName,
          text: '좋은 질문입니다! Saga 패턴 도입 시 보상 트랜잭션 타임아웃 처리가 특히 핵심입니다.',
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#191c1e]/90 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="h-14 px-4 bg-[#2d3133]/90 text-white flex items-center justify-between z-10 border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-label-lg font-bold text-white truncate">{topic}</span>
          <span className="bg-white/15 text-white/90 font-mono text-[12px] px-2 py-0.5 rounded-md">
            {formatTimer(elapsedSeconds)} / 50:00
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-xs hidden sm:inline">Google Meet 보안 연결됨</span>
          <button
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            onClick={() => setShowChat(!showChat)}
            title="채팅창 토글"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </button>
        </div>
      </div>

      {/* Main Video Stage */}
      <div className="flex-1 relative p-3 flex flex-col sm:flex-row gap-3 overflow-hidden">
        {/* Mentor Video Feed / Shared Screen */}
        <div className="flex-1 rounded-2xl bg-black overflow-hidden relative flex flex-col items-center justify-center border border-white/10 shadow-2xl">
          {isScreenSharing ? (
            <div className="w-full h-full bg-[#1e293b] p-4 flex flex-col justify-between relative overflow-auto">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-white/70">
                <span className="flex items-center gap-1.5 font-medium text-white">
                  <span className="material-symbols-outlined text-[16px] text-primary-fixed">screen_share</span>
                  {mentorName} 멘토님의 화면 공유: MSA 분산 트랜잭션 & 이력서 피드백
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">1080p 고화질</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-4 text-left font-mono text-xs text-slate-200 space-y-2">
                  <div className="text-emerald-400 font-bold">// 1. Kafka Event Publishing & Outbox Pattern</div>
                  <div className="text-slate-400">OrderCreatedEvent -&gt; Outbox Table (ACID Tx) -&gt; Debezium CDC</div>
                  <div className="text-amber-300 font-bold pt-2">// 2. Resume Feedback Highlights</div>
                  <div className="text-white">
                    * 프로젝트 트러블슈팅: "장애 상황 지표(TPS, Latency, Error Rate)를 정량적 수치로 보완하기"
                  </div>
                  <div className="text-white">
                    * Redis 캐시 스탬피드 현상 방지: "Mutex Lock vs Probabilistic Early Expiration 비교"
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQJOdSuuZf7lYAD8n-XX8bRBx3lUWzpGvdKTP23b0w2qTgykgmzVJxEv02SY5Qz8zJgczCUDciSRry7eRkSpVWeSCCZsC-fhZHc4vgDMG8dtxkkQnzfCwZYg8IvSsd0SeVh02HTQGN1pvxuAbTsOr0ahWuvZBa0KgHpNsyuDMJI2LyIw17B0QHa1eAh8fs7Hvfi9aQjs1J230uhBtBA9bEv4o4uyeX1nL3PpEkMsUJGhw5RS0ZT3J5"
                alt="Mentor Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            </div>
          )}

          {/* Floating Mentor Picture-in-Picture */}
          <div className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-primary shadow-xl bg-black">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz3BzY_xrJsY0dUu4Ut8faOhZ8RrhvD19uQOTSLvhebFud1IEbuRhQ3eT__oSpLVs2C13mi-QtafIuHXfrPoQx7G46wX8pKF9b9t9JIioyspRBr4eP51Mewu3t6DL8EEFEv35ozuDOXZB_iO6FhpHrYk_6GcoApdstaFGG9ILlp23ItDw2WISqMV5q7vnjIFJoNefhRWFwG4aEe5iaV1fHN91G5jrxa6SysZyiZ-yQVvFEDQnXAuZ_"
              alt={mentorName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
              <span className="truncate font-semibold">{mentorName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {/* Floating Mentee Preview */}
          <div className="absolute bottom-4 left-4 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-white/30 shadow-xl bg-zinc-900">
            {camOn ? (
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVh1ZL_u9v4t0dwcmjh3S4yefRWmhfA-IkLU2RG7WYsSCnCZGPJf8o1xZJcWIrmedmXCMTXKDHhrL4Bkcv9wyUYh4pmlqAe2mix2CE1TsoUArYg7LbbpyGcin-t6OPsNRYiy-NmZR84ZxypsMq7Acq5883vLXXoO0VtJ3zK_1J1D-EXEjSRHlR3mwt3-ibNQHx_IZougoStcXwE26SYxYy98tsnL1y5gy95lB2nYtY9Q11jWbKzaSn"
                alt="My preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/50 text-xs">
                <span className="material-symbols-outlined text-[24px]">videocam_off</span>
                <span>카메라 꺼짐</span>
              </div>
            )}
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
              <span className="truncate">나 (김멘티)</span>
              <span className={`w-2 h-2 rounded-full ${micOn ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
            </div>
          </div>
        </div>

        {/* Live Chat Drawer */}
        {showChat && (
          <div className="w-full sm:w-80 h-64 sm:h-full bg-[#2d3133] rounded-2xl p-3 flex flex-col justify-between border border-white/10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white font-label-md">
              <span>세션 실시간 채팅</span>
              <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2 space-y-2 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg ${
                    msg.sender.startsWith('나')
                      ? 'bg-primary text-white ml-6 text-right'
                      : 'bg-white/10 text-white mr-6 text-left'
                  }`}
                >
                  <div className="text-[10px] opacity-70 mb-0.5">{msg.sender} · {msg.time}</div>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendChat} className="pt-2 flex gap-1">
              <input
                type="text"
                placeholder="메시지 입력..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg bg-black/40 text-white text-xs outline-none focus:ring-1 focus:ring-primary border border-white/10"
              />
              <button
                type="submit"
                className="h-9 px-3 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container"
              >
                전송
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Meeting Controls */}
      <div className="h-20 bg-[#2d3133] px-4 flex items-center justify-center gap-3 sm:gap-4 border-t border-white/10">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            micOn ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-rose-600 text-white'
          }`}
          title={micOn ? '마이크 끄기' : '마이크 켜기'}
        >
          <span className="material-symbols-outlined text-[22px]">{micOn ? 'mic' : 'mic_off'}</span>
        </button>

        <button
          onClick={() => setCamOn(!camOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            camOn ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-rose-600 text-white'
          }`}
          title={camOn ? '카메라 끄기' : '카메라 켜기'}
        >
          <span className="material-symbols-outlined text-[22px]">{camOn ? 'videocam' : 'videocam_off'}</span>
        </button>

        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isScreenSharing ? 'bg-primary text-white' : 'bg-white/15 text-white hover:bg-white/25'
          }`}
          title="화면 공유 토글"
        >
          <span className="material-symbols-outlined text-[22px]">present_to_all</span>
        </button>

        <button
          onClick={onClose}
          className="px-6 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-label-md font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">call_end</span>
          <span>통화 종료</span>
        </button>
      </div>
    </div>
  );
};
