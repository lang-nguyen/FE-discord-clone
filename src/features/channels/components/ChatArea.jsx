import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '@/store/slices/chatSlice';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatArea() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);
  const activeChannelId = useSelector(state => state.chat.activeChannelId);
  const messages = useSelector(state => state.chat.messages);
  const currentUser = useSelector(state => state.chat.currentUser);

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const handleSendMessage = (content) => {
    if (!content.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      content: content.trim(),
      sender: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      timestamp: new Date().toISOString(),
    };
    dispatch(sendMessage(msg));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#313338] min-w-0 h-full min-h-0">
      <ChatHeader channelName={activeChannel?.name || 'general'} />
      <MessageList messages={messages} currentUserId={currentUser.id} />
      <MessageInput
        channelName={activeChannel?.name || 'general'}
        onSend={handleSendMessage}
      />
    </div>
  );
}
