import { useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

function formatTime(iso) {
  const d = new Date(iso);
  const t = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return d.toDateString() === new Date().toDateString() ? `Today at ${t}` : `${d.toLocaleDateString()} ${t}`;
}

function shouldGroup(msgs, i) {
  if (i === 0) return false;
  const cur = msgs[i], prev = msgs[i - 1];
  return cur.sender.id === prev.sender.id && (new Date(cur.timestamp) - new Date(prev.timestamp)) < 300000;
}

function MessageGroup({ message, isGrouped, isOwnMessage }) {
  return (
    <div className={cn("group flex gap-4 px-4 py-0.5 hover:bg-[#2E3035] transition-colors", isGrouped ? "mt-0" : "mt-4")}>
      <div className="w-10 flex-shrink-0 flex items-start justify-center">
        {!isGrouped ? (
          <img src={message.sender.avatar} alt="" className="w-10 h-10 rounded-full object-cover mt-0.5" />
        ) : (
          <span className="text-[11px] text-[#949BA4] opacity-0 group-hover:opacity-100 mt-1">
            {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {!isGrouped && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className={cn("text-[15px] font-medium hover:underline cursor-pointer", isOwnMessage ? "text-[#5865F2]" : "text-[#F2F3F5]")}>
              {message.sender.username}
            </span>
            <span className="text-[11px] text-[#949BA4]">{formatTime(message.timestamp)}</span>
          </div>
        )}
        <p className="text-[15px] text-[#DBDEE1] leading-[1.375rem] break-words">{message.content}</p>
      </div>
    </div>
  );
}

export function MessageList({ messages, currentUserId }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [messages.length]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
      <div className="px-4 pt-6 pb-2 mb-4">
        <div className="w-[68px] h-[68px] rounded-full bg-[#5865F2] flex items-center justify-center mb-4">
          <svg className="w-10 h-7 text-white" viewBox="0 0 28 20" fill="currentColor">
            <path d="M23.02 1.68C21.31.88 19.51.32 17.66 0c-.25.46-.48.93-.69 1.42-1.97-.3-3.97-.3-5.94 0-.2-.48-.43-.96-.69-1.42C8.49.32 6.69.88 4.98 1.68 1.36 7.05.39 12.27.88 17.42c1.98 1.48 3.92 2.37 5.82 2.95.57-.8 1.08-1.65 1.52-2.54-.85-.32-1.67-.71-2.44-1.17.21-.15.41-.3.6-.46 4.31 2 8.94 2 13.21 0 .2.16.4.31.61.46-.77.46-1.59.85-2.44 1.17.44.89.95 1.74 1.52 2.54 1.91-.58 3.85-1.47 5.83-2.95.58-5.98-.86-11.15-2.1-15.75zM8.69 14.27c-1.21 0-2.21-1.11-2.21-2.46s.97-2.47 2.21-2.47 2.23 1.12 2.21 2.47c0 1.35-.98 2.46-2.21 2.46zm10.62 0c-1.21 0-2.2-1.11-2.2-2.46s.98-2.47 2.2-2.47c1.24 0 2.23 1.12 2.21 2.47 0 1.35-.97 2.46-2.21 2.46z" />
          </svg>
        </div>
        <h2 className="text-[32px] font-bold text-white mb-2">Welcome to #general</h2>
        <p className="text-[15px] text-[#949BA4]">This is the start of the #general channel. Say hi! 👋</p>
      </div>
      <div className="pb-6">
        {messages.map((msg, i) => (
          <MessageGroup key={msg.id} message={msg} isGrouped={shouldGroup(messages, i)} isOwnMessage={msg.sender.id === currentUserId} />
        ))}
      </div>
    </div>
  );
}
