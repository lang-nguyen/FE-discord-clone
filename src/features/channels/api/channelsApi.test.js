import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it, vi } from "vitest";
import { store } from "@/app/store/store";
import { channelsApi } from "@/features/channels/api/channelsApi";
import { baseApi } from "@/shared/api/baseApi";
import { server } from "@/test/server";

describe("channelsApi", () => {
  afterEach(() => {
    store.dispatch(baseApi.util.resetApiState());
  });

  it("creates a channel without refetching the channel list", async () => {
    let listRequests = 0;
    server.use(
      http.get("*/api/servers/server-1/channels", () => {
        listRequests += 1;
        return HttpResponse.json([
          {
            Id: "channel-1",
            Name: "general",
            Type: "text",
            Position: 1000,
            CategoryId: null,
          },
        ]);
      }),
      http.post("*/api/servers/server-1/channels", () =>
        HttpResponse.json({
          Id: "channel-2",
          Name: "updates",
          Type: "text",
          Position: 2000,
          CategoryId: null,
        })
      )
    );

    const subscription = store.dispatch(channelsApi.endpoints.getChannels.initiate("server-1"));
    await subscription.unwrap();
    await store
      .dispatch(
        channelsApi.endpoints.createChannel.initiate({
          serverId: "server-1",
          channel: { name: "updates", type: "text", isPrivate: false, categoryId: null },
        })
      )
      .unwrap();

    await vi.waitFor(() => {
      const cached = channelsApi.endpoints.getChannels.select("server-1")(store.getState()).data;
      expect(cached).toEqual([
        expect.objectContaining({ id: "channel-1" }),
        expect.objectContaining({ id: "channel-2", name: "updates" }),
      ]);
    });
    expect(listRequests).toBe(1);
    subscription.unsubscribe();
  });

  it("merges the authoritative layout after moving a channel", async () => {
    server.use(
      http.get("*/api/servers/server-1/channels", () =>
        HttpResponse.json([
          { Id: "channel-1", Name: "one", Type: "text", Position: 1000, CategoryId: null },
          {
            Id: "channel-2",
            Name: "two",
            Type: "text",
            Position: 1000,
            CategoryId: "category-1",
          },
        ])
      ),
      http.put("*/api/servers/server-1/channels/channel-1/move", () =>
        HttpResponse.json({
          channels: [
            { id: "channel-2", categoryId: "category-1", position: 1000 },
            { id: "channel-1", categoryId: "category-1", position: 2000 },
          ],
        })
      )
    );

    const subscription = store.dispatch(channelsApi.endpoints.getChannels.initiate("server-1"));
    await subscription.unwrap();
    await store
      .dispatch(
        channelsApi.endpoints.moveChannel.initiate({
          serverId: "server-1",
          channelId: "channel-1",
          targetCategoryId: "category-1",
          beforeChannelId: "channel-2",
          afterChannelId: null,
        })
      )
      .unwrap();

    const cached = channelsApi.endpoints.getChannels.select("server-1")(store.getState()).data;
    expect(cached.find((channel) => channel.id === "channel-1")).toMatchObject({
      categoryId: "category-1",
      position: 2000,
    });
    subscription.unsubscribe();
  });

  it("moves a channel to the start when dropped on the top zone", async () => {
    let requestBody;
    server.use(
      http.get("*/api/servers/server-1/channels", () =>
        HttpResponse.json([
          { Id: "channel-1", Name: "one", Type: "text", Position: 1000, CategoryId: null },
          { Id: "channel-2", Name: "two", Type: "text", Position: 2000, CategoryId: null },
        ])
      ),
      http.put("*/api/servers/server-1/channels/channel-2/move", async ({ request }) => {
        requestBody = await request.json();
        return HttpResponse.json({
          channels: [
            { id: "channel-2", categoryId: null, position: 1000 },
            { id: "channel-1", categoryId: null, position: 2000 },
          ],
        });
      })
    );

    const subscription = store.dispatch(channelsApi.endpoints.getChannels.initiate("server-1"));
    await subscription.unwrap();
    await store
      .dispatch(
        channelsApi.endpoints.moveChannel.initiate({
          serverId: "server-1",
          channelId: "channel-2",
          targetCategoryId: null,
          beforeChannelId: null,
          afterChannelId: null,
          placement: "start",
        })
      )
      .unwrap();

    expect(requestBody.placement).toBe("start");
    const cached = channelsApi.endpoints.getChannels.select("server-1")(store.getState()).data;
    expect(cached.find((channel) => channel.id === "channel-2").position).toBe(1000);
    subscription.unsubscribe();
  });
});
