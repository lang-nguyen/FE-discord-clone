import { ScrollArea } from "@/shared/components/ui/ScrollArea";
import { MemberRow } from "./MemberRow";
import { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/Dropdown";

export const MembersTable = ({
  members,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  onTransferOwnership,
  onBanMember,
  onChangeNickname,
  onBlockMember,
  onTimeoutMember,
  onKickMember,
  onPrune,
  isLoading,
  hasMore,
  fetchNextPage,
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !searchQuery) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, fetchNextPage, searchQuery]);

  return (
    <div className="bg-nav-sidebar-bg rounded-lg border border-black/20 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-black/10 flex items-center justify-between bg-user-panel-bg">
        <h3 className="text-[15px] font-semibold text-primary-text">
          Recent Members
        </h3>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by username or ID"
              className="w-48 bg-server-sidebar-bg text-sm text-primary-text rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#5865f2] placeholder:text-muted-text/60"
            />
            <svg className="w-4 h-4 absolute right-2.5 top-2 text-muted-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-text hover:text-primary-text hover:bg-hover-bg rounded transition-colors bg-server-sidebar-bg">
                <svg className="w-4 h-4 text-muted-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span>Sort</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] bg-server-sidebar-bg border-black/20 shadow-2xl p-2 rounded-md">
              {[
                { label: "Member Since (Newest first)", value: "member-newest" },
                { label: "Member Since (Oldest first)", value: "member-oldest" },
                { label: "Joined Discord (Newest first)", value: "discord-newest" },
                { label: "Joined Discord (Oldest first)", value: "discord-oldest" },
              ].map((opt) => (
                <DropdownMenuItem 
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer hover:bg-primary-accent hover:text-white transition-colors group ${
                    sortMode === opt.value ? "bg-hover-bg" : ""
                  }`}
                >
                  <span className={`text-[15px] font-medium ${sortMode === opt.value ? "text-primary-text" : "text-muted-text"}`}>
                    {opt.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    sortMode === opt.value 
                      ? "border-[#5865f2] bg-[#5865f2]" 
                      : "border-muted-text bg-transparent group-hover:border-white"
                  }`}>
                    {sortMode === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button 
            onClick={onPrune}
            className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-hover-bg rounded transition-colors bg-server-sidebar-bg"
          >
            Prune
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_120px_120px_120px_100px_100px_auto] items-center px-4 py-2 border-b border-black/10 bg-nav-sidebar-bg">
        <div className="w-5" /> {/* Checkbox placeholder */}
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide">Name</div>
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide flex items-center gap-1 cursor-pointer">
          Member Since
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide">Joined Discord</div>
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide">Join Method</div>
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide">Roles</div>
        <div className="text-[12px] font-bold text-muted-text uppercase tracking-wide">Signals</div>
        <div className="w-8" /> {/* Actions placeholder */}
      </div>

      {/* Table Body */}
      <ScrollArea className="h-[500px]">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onTransferOwnership={onTransferOwnership}
            onBanMember={onBanMember}
            onChangeNickname={onChangeNickname}
            onBlockMember={onBlockMember}
            onTimeoutMember={onTimeoutMember}
            onKickMember={onKickMember}
          />
        ))}

        {members.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <p className="text-muted-text text-[15px]">
              Before searching, we need to index this server. Give us a mo&apos;.
            </p>
          </div>
        )}

        {/* Intersection Observer Target */}
        {!searchQuery && (
          <div ref={observerRef} className="h-10 w-full flex items-center justify-center py-4">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-text">
                <span className="w-4 h-4 rounded-full border-2 border-[#5865f2] border-t-transparent animate-spin" />
                <span className="text-sm">Loading more members...</span>
              </div>
            )}
            {!hasMore && members.length > 0 && (
              <span className="text-sm text-muted-text">End of member list.</span>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 bg-user-panel-bg border-t border-black/10 text-xs text-muted-text">
        Showing <span className="font-semibold text-primary-text">{members.length}</span> members
      </div>
    </div>
  );
};
