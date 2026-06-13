import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MessageComposer } from "@/features/messages/components/MessageComposer";

describe("MessageComposer", () => {
  it("submits trimmed content", async () => {
    const onSend = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(
      <MessageComposer
        channel={{ id: "channel-1", name: "general" }}
        onSend={onSend}
        isSending={false}
      />
    );

    const input = screen.getByLabelText("Message #general");
    await user.type(input, "  hello world  {enter}");

    expect(onSend).toHaveBeenCalledWith("hello world");
    expect(input).toHaveValue("");
  });
});
