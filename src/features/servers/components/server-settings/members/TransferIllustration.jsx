import { MemberAvatar } from "./MemberAvatar";

export const TransferIllustration = ({ currentUser, targetMember }) => {
  return (
    <div className="relative flex items-center justify-center mt-12 mb-8 mx-auto w-[132px]">
      {/* Arrow */}
      <svg
        className="absolute left-0 right-0 top-[-30px] w-full h-[50px] text-muted-text"
        fill="none"
        viewBox="0 0 132 50"
      >
        <path
          d="M 36 44 L 36 14 L 90 14 L 90 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinejoin="round"
        />
        <polyline
          points="84,38 90,44 96,38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <MemberAvatar
        member={currentUser}
        className="w-[72px] h-[72px] rounded-full opacity-[0.45] z-0"
        fallbackClassName="text-3xl font-bold bg-[#5865f2]"
      />

      <div className="relative z-10 -ml-6 rounded-full bg-chat-bg p-1.5 flex shrink-0">
        <MemberAvatar
          member={targetMember}
          className="w-[72px] h-[72px] rounded-full bg-[#5865f2]"
          fallbackClassName="text-3xl font-bold bg-transparent"
        />
      </div>
    </div>
  );
};
