import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/Avatar";
import { cn } from "@/shared/lib/utils";

export const MemberAvatar = ({ member, className, fallbackClassName }) => {
  if (!member) return null;

  return (
    <Avatar className={className}>
      {member.avatarUrl ? (
        <AvatarImage src={member.avatarUrl} alt={member.name || member.username} />
      ) : (
        <AvatarFallback 
          className={cn(
            "flex items-center justify-center w-full h-full text-white bg-[#5865f2]", 
            fallbackClassName
          )}
        >
          {member.name?.charAt(0)?.toUpperCase() || member.username?.charAt(0)?.toUpperCase() || "M"}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
