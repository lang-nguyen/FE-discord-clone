import { describe, expect, it } from "vitest";
import { normalizeChannel, normalizeMessage, normalizeServer } from "@/shared/lib/normalizers";

describe("API normalizers", () => {
  it("normalizes PascalCase server responses", () => {
    expect(
      normalizeServer({
        Id: "server-1",
        Name: "Community",
        BannerColor: "#123456",
        IsPublic: false,
      })
    ).toMatchObject({
      id: "server-1",
      name: "Community",
      bannerColor: "#123456",
      isPublic: false,
    });
  });

  it("normalizes numeric voice channels", () => {
    expect(normalizeChannel({ Id: "voice-1", Name: "General", Type: 1 })).toMatchObject({
      id: "voice-1",
      name: "General",
      type: "voice",
    });
  });

  it("normalizes nested message senders", () => {
    expect(
      normalizeMessage({
        Id: "message-1",
        ChannelId: "channel-1",
        Content: "Hello",
        Sender: { Id: "user-1", DisplayName: "Minh" },
      })
    ).toMatchObject({
      id: "message-1",
      channelId: "channel-1",
      sender: { id: "user-1", username: "Minh" },
    });
  });
});
