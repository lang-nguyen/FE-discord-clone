import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export function CreateCategoryDialog({ open, onOpenChange, onCreate, isLoading }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    setError("");
    try {
      await onCreate({ name: name.trim(), isPrivate: false });
      onOpenChange(false);
    } catch {
      setError("Unable to create the category. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/20 bg-chat-bg text-primary-text">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            autoFocus
          />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || isLoading}>
              {isLoading ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
