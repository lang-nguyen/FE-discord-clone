import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it, vi } from "vitest";
import { store } from "@/app/store/store";
import { serversApi } from "@/features/servers/api/serversApi";
import { baseApi } from "@/shared/api/baseApi";
import { server } from "@/test/server";

describe("serversApi", () => {
  afterEach(() => {
    store.dispatch(baseApi.util.resetApiState());
  });

  it("normalizes list responses and refetches after create", async () => {
    let listRequests = 0;
    server.use(
      http.get("*/api/v1/server", () => {
        listRequests += 1;
        return HttpResponse.json([{ Id: "server-1", Name: "Community" }]);
      }),
      http.post("*/api/v1/server", () =>
        HttpResponse.json({ Id: "server-2", Name: "Created" })
      )
    );

    const subscription = store.dispatch(serversApi.endpoints.getServers.initiate());
    expect(await subscription.unwrap()).toEqual([
      expect.objectContaining({ id: "server-1", name: "Community" }),
    ]);

    await store
      .dispatch(
        serversApi.endpoints.createServer.initiate({
          serverName: "Created",
        })
      )
      .unwrap();

    await vi.waitFor(() => expect(listRequests).toBeGreaterThan(1));
    subscription.unsubscribe();
  });
});
