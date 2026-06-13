import { useEffect, useMemo, useRef, useState } from "react";
import { useGetServerQuery, useUpdateServerMutation } from "@/features/servers/api/serversApi";

const EMPTY_PROFILE = {
  serverName: "",
  description: "",
  isPrivate: true,
  selectedBanner: "#5865F2",
  avatarUrl: "",
  iconId: null,
  iconMediaId: null,
  onlineCount: 0,
  membersCount: 0,
  establishedDate: "",
};

export function useServerProfile(serverId) {
  const { data, isLoading, error } = useGetServerQuery(serverId, {
    skip: !serverId,
  });
  const [updateServer, updateState] = useUpdateServerMutation();
  const initialData = useRef(EMPTY_PROFILE);
  const [profileData, setProfileData] = useState(EMPTY_PROFILE);

  useEffect(() => {
    if (!data) return;
    const next = { ...EMPTY_PROFILE, ...data };
    initialData.current = next;
    setProfileData(next);
  }, [data]);

  const hasChanges = useMemo(
    () => JSON.stringify(profileData) !== JSON.stringify(initialData.current),
    [profileData]
  );

  const saveProfile = async () => {
    await updateServer({ serverId, profile: profileData }).unwrap();
    initialData.current = { ...profileData };
    setProfileData((current) => ({ ...current }));
  };

  return {
    profileData,
    hasChanges,
    updateField: (field, value) => setProfileData((current) => ({ ...current, [field]: value })),
    resetProfile: () => setProfileData({ ...initialData.current }),
    saveProfile,
    isLoading,
    isSaving: updateState.isLoading,
    error,
  };
}
