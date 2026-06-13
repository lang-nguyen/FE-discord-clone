import { Hash, Volume2 } from "lucide-react";

export function ChannelHeader({ channel, recipient }) {
  return (
    <header className="z-10 flex h-12 shrink-0 items-center border-b border-black/20 bg-chat-bg px-4 shadow-sm">
      {recipient ? (
        <img
          src={
            recipient.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(recipient.displayName)}`
          }
          alt=""
          className="mr-2 h-7 w-7 rounded-full"
        />
      ) : channel.type === "voice" ? (
        <Volume2 className="mr-2 h-6 w-6 shrink-0 text-muted-text" />
      ) : (
        <Hash className="mr-2 h-6 w-6 shrink-0 text-muted-text" />
      )}
      <h1 className="truncate text-base font-bold">
        {recipient ? recipient.displayName : channel.name}
      </h1>
    </header>
  );
}
