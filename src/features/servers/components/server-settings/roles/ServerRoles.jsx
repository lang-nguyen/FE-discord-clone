import { useState, useEffect } from "react";
import { RolesList } from "./RolesList";
import { EditRoleContent } from "./EditRoleContent";
import { useRoles } from "@/features/servers/hooks/useRoles";
import { UnsavedChangesBar } from "../UnsavedChangesBar";

export const ServerRoles = ({ serverName }) => {
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [draftRole, setDraftRole] = useState(null);
  const { roles, getRole, createRole, updateRole, deleteRole, STANDARD_COLORS } = useRoles(serverName);

  // Load draftRole when starting to edit
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
    setDraftRole(prev => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    if (draftRole) {
      updateRole(editingRoleId, draftRole);
      // Reset original role state for comparison
      // Actually, updateRole will change the roles in the hook, 
      // which will cause getRole(editingRoleId) to return the new version next time.
    }
  };

  const handleReset = () => {
    if (editingRoleId) {
      const originalRole = getRole(editingRoleId);
      setDraftRole({ ...originalRole });
    }
  };

  const originalRole = editingRoleId ? getRole(editingRoleId) : null;
  const hasChanges = draftRole && originalRole && JSON.stringify(draftRole) !== JSON.stringify(originalRole);

  return (
    <div className="w-full text-primary-text min-h-screen relative">
      {!editingRoleId ? (
        <RolesList 
          roles={roles} 
          onCreateRole={() => {
            const newId = createRole();
            setEditingRoleId(newId);
          }}
          onEditRole={setEditingRoleId}
        />
      ) : (
        <>
          <EditRoleContent
            role={draftRole || {}}
            roles={roles.map(r => r.id === editingRoleId ? (draftRole || r) : r)}
            onUpdate={handleUpdateDraft}
            onBack={() => setEditingRoleId(null)}
            onChangeActiveRole={(id) => {
                if (hasChanges) {
                    // Logic for switching while having changes is complex in Discord
                    // Usually it prompts or just switches and keeps changes if it's a global "draft"
                    // We'll just switch for now.
                }
                setEditingRoleId(id);
            }}
            STANDARD_COLORS={STANDARD_COLORS}
          />
          {hasChanges && (
            <UnsavedChangesBar onReset={handleReset} onSave={handleSave} />
          )}
        </>
      )}
    </div>
  );
};
