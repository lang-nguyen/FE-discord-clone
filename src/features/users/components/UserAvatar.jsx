import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/Avatar";

export function UserAvatar({
  avatarUrl,
  displayName,
  status,
  className,
  fallbackClassName,
}) {
  const fallback = displayName?.charAt(0)?.toUpperCase() || "U";

  return (
    <Avatar className={className} status={status}>
      <AvatarImage src={avatarUrl} alt={displayName} />
      <AvatarFallback className={fallbackClassName}>{fallback}</AvatarFallback>
    </Avatar>
  );
}
