import { useState, useRef } from 'react';
import { PlusCircle, Smile, Gift, Sticker } from 'lucide-react';

export function MessageInput({ channelName, onSend }) {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 pb-6 pt-1">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-[#383A40] rounded-lg">
          {/* Plus button */}
          <button type="button" className="flex-shrink-0 p-3 text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
            <PlusCircle className="w-6 h-6" />
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}`}
            className="flex-1 bg-transparent text-[15px] text-[#DBDEE1] placeholder:text-[#6D6F78] py-[11px] focus:outline-none"
          />

          {/* Right actions */}
          <div className="flex items-center gap-1 pr-3 flex-shrink-0">
            <button type="button" className="p-1.5 text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
              <Gift className="w-5 h-5" />
            </button>
            <button type="button" className="p-1.5 text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
              <Sticker className="w-5 h-5" />
            </button>
            <button type="button" className="p-1.5 text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
