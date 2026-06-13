import { useState } from "react";

const INITIAL_STATE = {
  createServer: false,
  createChannel: false,
  userProfile: false,
  userSettings: false,
};

export function useAppShellModals() {
  const [state, setState] = useState(INITIAL_STATE);
  const [targetCategoryId, setTargetCategoryId] = useState(null);

  const setOpen = (name, open) => {
    setState((current) => ({ ...current, [name]: open }));
    if (name === "createChannel" && !open) setTargetCategoryId(null);
  };

  const openCreateChannel = (categoryId = null) => {
    setTargetCategoryId(categoryId);
    setOpen("createChannel", true);
  };

  return {
    state,
    targetCategoryId,
    setOpen,
    openCreateChannel,
  };
}
