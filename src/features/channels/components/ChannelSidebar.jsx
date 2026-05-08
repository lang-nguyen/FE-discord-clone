import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '@/store/slices/chatSlice';
import ServerHeader from '@/features/servers/components/ServerHeader';
import { ChannelCategory } from '@/features/channels/components/ChannelCategory';
import { ChannelItem } from '@/features/channels/components/ChannelItem';
import { ScrollArea } from '@/shared/components/ui/ScrollArea';
import { TooltipProvider } from '@/shared/components/ui/Tooltip';

export function ChannelSidebar() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat?.channels || []);
  const activeChannelId = useSelector(state => state.chat?.activeChannelId);
  const servers = useSelector(state => state.chat?.servers || []);
  const activeServerId = useSelector(state => state.chat?.activeServerId);

  const activeServer = servers.find(s => s.id === activeServerId);
  const textChannels = channels.filter(c => c.type === 'text');
  const voiceChannels = channels.filter(c => c.type === 'voice');

  return (
    <div className="w-[240px] bg-[#2B2D31] flex-shrink-0 flex flex-col">
      <ServerHeader
        serverName={activeServer?.name || 'Select a Server'}
        onClickHeader={() => {}}
        onClickInvite={() => {}}
      />

      <ScrollArea className="flex-1">
        <div className="pt-4">
          <ChannelCategory title="Text Channels" onAdd={() => {}}>
            {textChannels.map(channel => (
              <ChannelItem
                key={channel.id}
                type="text"
                name={channel.name}
                isActive={activeChannelId === channel.id}
                hasUnread={false}
                onChannelClick={() => dispatch(setActiveChannel(channel.id))}
              />
            ))}
          </ChannelCategory>

          <ChannelCategory title="Voice Channels" onAdd={() => {}}>
            {voiceChannels.map(channel => (
              <ChannelItem
                key={channel.id}
                type="voice"
                name={channel.name}
                isActive={activeChannelId === channel.id}
                hasUnread={false}
                onChannelClick={() => dispatch(setActiveChannel(channel.id))}
              />
            ))}
          </ChannelCategory>
        </div>
      </ScrollArea>
    </div>
  );
}
