import { useState, useEffect } from "react";
import { RolesList } from "./RolesList";
import { EditRoleContent } from "./EditRoleContent";
import { useRoles, mapRoleFromApi, mapRoleToCreateBody } from "@/features/servers/composables/roles";
import { UnsavedChangesBar } from "../UnsavedChangesBar";

export const ServerRoles = ({ serverId }) => {
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [draftRole, setDraftRole] = useState(null);
  const {
    roles,
    getRole,
    createRole,
    updateRole,
    isLoading,
    isError,
    isCreating,
    isUpdating,
    isMockMode,
    STANDARD_COLORS,
  } = useRoles(serverId);

  useEffect(() => {
    if (editingRoleId) {
      const originalRole = getRole(editingRoleId);
      if (originalRole) {
        setDraftRole({ ...originalRole });
      }
    } else {
      setDraftRole(null);
    }
  }, [editingRoleId, getRole]);

  const handleUpdateDraft = (updates) => {
    setDraftRole((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    if (!draftRole || !editingRoleId) return;
    const ok = await updateRole(editingRoleId, draftRole);
    if (ok) {
      const updated = getRole(editingRoleId);
      if (updated) setDraftRole({ ...updated });
    }
  };

  const handleReset = () => {
    if (editingRoleId) {
      const originalRole = getRole(editingRoleId);
      if (originalRole) setDraftRole({ ...originalRole });
    }
  };

  const handleCreateRole = async () => {
    const newId = await createRole();
    if (newId) {
      setDraftRole(mapRoleFromApi({
        id: newId,
        serverId,
        ...mapRoleToCreateBody(),
        position: 0,
        isDefault: false,
      }));
      setEditingRoleId(newId);
    }
  };

  const originalRole = editingRoleId ? getRole(editingRoleId) : null;
  const hasChanges =
    draftRole && originalRole && JSON.stringify(draftRole) !== JSON.stringify(originalRole);

  if (isLoading) {
    return (
      <div className="w-full text-gray-400 py-10 text-sm">
        Loading roles...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-[#da373c] py-10 text-sm">
        Failed to load roles. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full text-gray-200 min-h-screen relative">
      {isMockMode && (
        <div className="mb-4 rounded-md border border-[#f0b232]/40 bg-[#f0b232]/10 px-4 py-2 text-[13px] text-[#f0b232]">
          Dev mode: mock data (VITE_USE_MOCK_API=true). Không gọi BE.
        </div>
      )}
      {!editingRoleId ? (
        <RolesList
          roles={roles}
          onCreateRole={handleCreateRole}
          onEditRole={setEditingRoleId}
          isCreating={isCreating}
        />
      ) : (
        <>
          <EditRoleContent
            role={draftRole || {}}
            roles={roles.map((r) => (r.id === editingRoleId ? draftRole || r : r))}
            onUpdate={handleUpdateDraft}
            onBack={() => setEditingRoleId(null)}
            onChangeActiveRole={(id) => setEditingRoleId(id)}
            STANDARD_COLORS={STANDARD_COLORS}
          />
          {hasChanges && (
            <UnsavedChangesBar
              onReset={handleReset}
              onSave={handleSave}
              isSaving={isUpdating}
            />
          )}
        </>
      )}
    </div>
  );
};
