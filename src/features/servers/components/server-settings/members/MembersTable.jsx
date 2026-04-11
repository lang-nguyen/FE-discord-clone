import { ScrollArea } from "@/shared/components/ui/ScrollArea";
import { MemberRow } from "./MemberRow";
import { useEffect, useRef } from "react";

export const MembersTable = ({
  members,
  searchQuery,
  onSearchChange,
  onTransferOwnership,
  onBanMember,
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
    <div className="bg-[#2b2d31] rounded-lg border border-[#3b3d44] overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-[#3b3d44] flex items-center justify-between bg-[#232428]">
        <h3 className="text-[15px] font-semibold text-gray-200">
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
              className="w-48 bg-[#1e1f22] text-sm text-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500"
            />
            <svg className="w-4 h-4 absolute right-2.5 top-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort & Prune buttons */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-[#35373c] rounded transition-colors bg-[#1e1f22]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort
          </button>
          <button className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#35373c] rounded transition-colors bg-[#1e1f22]">
            Prune
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_120px_120px_120px_100px_100px_auto] items-center px-4 py-2 border-b border-[#3b3d44] bg-[#2b2d31]">
        <div className="w-5" /> {/* Checkbox placeholder */}
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Name</div>
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 cursor-pointer">
          Member Since
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Joined Discord</div>
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Join Method</div>
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Roles</div>
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Signals</div>
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
          />
        ))}

        {members.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <p className="text-[#80848e] text-[15px]">
              Before searching, we need to index this server. Give us a mo'.
            </p>
          </div>
        )}

        {/* Intersection Observer Target */}
        {!searchQuery && (
          <div ref={observerRef} className="h-10 w-full flex items-center justify-center py-4">
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <span className="text-sm">Loading more members...</span>
              </div>
            )}
            {!hasMore && members.length > 0 && (
              <span className="text-sm text-gray-500">End of member list.</span>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 bg-[#232428] border-t border-[#3b3d44] text-xs text-gray-400">
        Showing <span className="font-semibold text-gray-300">{members.length}</span> members
      </div>
    </div>
  );
};
