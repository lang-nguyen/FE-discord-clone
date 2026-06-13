import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { useLazySearchProfilesQuery } from "@/features/users/api/profilesApi";

export function NewDirectMessageDialog({ open, onOpenChange, onSelect }) {
  const [query, setQuery] = useState("");
  const [search, { data: profiles = [], isFetching }] = useLazySearchProfilesQuery();

  useEffect(() => {
    if (!open || query.trim().length < 2) return undefined;
    const timeout = window.setTimeout(() => search(query.trim()), 250);
    return () => window.clearTimeout(timeout);
  }, [open, query, search]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/20 bg-server-sidebar-bg text-primary-text">
        <DialogHeader>
          <DialogTitle>Find or start a conversation</DialogTitle>
          <DialogDescription className="text-muted-text">
            Search by display name and select a person to open a direct message.
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search users"
        />
        <div className="max-h-72 space-y-1 overflow-y-auto">
          {isFetching && <p className="p-3 text-sm text-muted-text">Searching...</p>}
          {!isFetching &&
            profiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => onSelect(profile)}
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-hover-bg"
              >
                <img
                  src={
                    profile.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}`
                  }
                  alt=""
                  className="h-9 w-9 rounded-full"
                />
                <span className="font-medium">{profile.displayName}</span>
              </button>
            ))}
          {query.trim().length >= 2 && !isFetching && !profiles.length && (
            <p className="p-3 text-sm text-muted-text">No users found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
