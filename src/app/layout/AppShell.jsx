import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ServerSidebar from "@/layouts/components/Sidebar/ServerSidebar";
import { ChannelSidebar } from "@/features/channels/components/ChannelSidebar";
import { UserPanelContainer } from "@/features/users/components/UserPanelContainer";
import { UserProfileModal } from "@/features/users/components/UserProfileModal";
import { UserSettingsModal } from "@/features/users/components/UserSettingsModal";
import CreateServerModal from "@/features/servers/components/CreateServerModal";
import CreateChannelModal from "@/features/channels/components/CreateChannelModal";
import { CreateCategoryDialog } from "@/features/channels/components/CreateCategoryDialog";
import { useCreateServerMutation, useGetServersQuery } from "@/features/servers/api/serversApi";
import {
  useCreateCategoryMutation,
  useCreateChannelMutation,
  useGetChannelsQuery,
} from "@/features/channels/api/channelsApi";
import { getErrorMessage } from "@/shared/api/error";
import { useToast } from "@/shared/ui/ToastProvider";
import { useAppShellModals } from "@/app/layout/useAppShellModals";
import { useGetConversationsQuery } from "@/features/messages/api/messagesApi";
import { NewDirectMessageDialog } from "@/features/messages/components/NewDirectMessageDialog";

export function AppShell() {
  const navigate = useNavigate();
  const { serverId, channelId, recipientId } = useParams();
  const { user, profile } = useSelector((state) => state.auth);
  const { showToast } = useToast();
  const modals = useAppShellModals();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [directMessageDialogOpen, setDirectMessageDialogOpen] = useState(false);
  const { data: conversations = [] } = useGetConversationsQuery();

  const {
    data: servers = [],
    isLoading: serversLoading,
    isError: serversError,
  } = useGetServersQuery();
  const {
    data: channels = [],
    isLoading: channelsLoading,
    isError: channelsError,
  } = useGetChannelsQuery(serverId, {
    skip: !serverId,
  });
  const [createServer, createServerState] = useCreateServerMutation();
  const [createChannel, createChannelState] = useCreateChannelMutation();
  const [createCategory, createCategoryState] = useCreateCategoryMutation();

  const activeServer = useMemo(
    () => servers.find((server) => server.id === serverId) || null,
    [serverId, servers]
  );

  useEffect(() => {
    if (!serverId || channelId || channelsLoading || !channels.length) return;
    navigate(`/channels/${serverId}/${channels[0].id}`, { replace: true });
  }, [channelId, channels, channelsLoading, navigate, serverId]);

  useEffect(() => {
    if (serversError) {
      showToast({
        title: "Unable to load servers",
        description: "Check your connection and try again.",
        variant: "error",
      });
    }
  }, [serversError, showToast]);

  useEffect(() => {
    if (channelsError) {
      showToast({
        title: "Unable to load channels",
        description: "Check your connection and try again.",
        variant: "error",
      });
    }
  }, [channelsError, showToast]);

  const handleCreateServer = async (name) => {
    try {
      const server = await createServer({
        serverName: name,
        serverDescription: "A new Discord server",
        serverIconId: null,
        serverBanner: "#5865F2",
      }).unwrap();
      if (server.id) {
        const results = await Promise.allSettled([
          createChannel({
            serverId: server.id,
            channel: { name: "general", type: "text", isPrivate: false },
          }).unwrap(),
          createChannel({
            serverId: server.id,
            channel: { name: "General Voice", type: "voice", isPrivate: false },
          }).unwrap(),
        ]);
        if (results.some((result) => result.status === "rejected")) {
          showToast({
            title: "Server created",
            description: "Some default channels could not be created.",
            variant: "error",
          });
        }
      }
      navigate(server.id ? `/channels/${server.id}` : "/channels/@me");
    } catch (error) {
      showToast({
        title: "Unable to create server",
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  };

  const handleCreateChannel = async (channel) => {
    try {
      const created = await createChannel({
        serverId,
        channel: { ...channel, categoryId: modals.targetCategoryId },
      }).unwrap();
      if (created.id) navigate(`/channels/${serverId}/${created.id}`);
    } catch (error) {
      showToast({
        title: "Unable to create channel",
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  };

  const handleCreateCategory = async (category) => {
    try {
      await createCategory({ serverId, category }).unwrap();
    } catch (error) {
      showToast({
        title: "Unable to create category",
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  };

  return (
    <div className="flex h-screen w-full pl-[72px]">
      <ServerSidebar
        servers={servers}
        activeServerId={serverId || null}
        isLoading={serversLoading}
        onServerClick={(id) => navigate(`/channels/${id}`)}
        onHomeClick={() => navigate("/channels/@me")}
        onAddClick={() => modals.setOpen("createServer", true)}
      />

      <ChannelSidebar
        server={activeServer}
        channels={channels}
        activeChannelId={channelId}
        onCreateChannel={modals.openCreateChannel}
        onCreateCategory={() => setCategoryDialogOpen(true)}
        footer={
          <UserPanelContainer
            onOpenProfile={() => modals.setOpen("userProfile", true)}
            onOpenSettings={() => modals.setOpen("userSettings", true)}
          />
        }
        conversations={conversations}
        activeRecipientId={recipientId}
        onNewDirectMessage={() => setDirectMessageDialogOpen(true)}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-chat-bg">
        <Outlet context={{ server: activeServer, channels }} />
      </main>

      <UserSettingsModal
        open={modals.state.userSettings}
        onOpenChange={(open) => modals.setOpen("userSettings", open)}
      />
      <UserProfileModal
        open={modals.state.userProfile}
        onOpenChange={(open) => modals.setOpen("userProfile", open)}
        user={user}
        profile={profile}
      />
      <CreateServerModal
        isOpen={modals.state.createServer}
        onClose={() => modals.setOpen("createServer", false)}
        onCreate={handleCreateServer}
        isLoading={createServerState.isLoading}
      />
      <CreateChannelModal
        isOpen={modals.state.createChannel}
        onClose={() => modals.setOpen("createChannel", false)}
        onCreate={handleCreateChannel}
        isLoading={createChannelState.isLoading}
      />
      <CreateCategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onCreate={handleCreateCategory}
        isLoading={createCategoryState.isLoading}
      />
      <NewDirectMessageDialog
        open={directMessageDialogOpen}
        onOpenChange={setDirectMessageDialogOpen}
        onSelect={(selectedProfile) => {
          setDirectMessageDialogOpen(false);
          navigate(`/channels/@me/${selectedProfile.id}`);
        }}
      />
    </div>
  );
}
