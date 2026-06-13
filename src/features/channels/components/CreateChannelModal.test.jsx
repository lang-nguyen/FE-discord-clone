import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CreateChannelModal from "./CreateChannelModal";

describe("CreateChannelModal", () => {
  it("does not submit a one-character channel name", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(
      <CreateChannelModal isOpen onClose={vi.fn()} onCreate={onCreate} />
    );

    await user.type(screen.getByLabelText("Channel Name"), "a");

    expect(screen.getByRole("button", { name: "Create Channel" })).toBeDisabled();
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("submits a valid channel name", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(
      <CreateChannelModal isOpen onClose={vi.fn()} onCreate={onCreate} />
    );

    await user.type(screen.getByLabelText("Channel Name"), "chat");
    await user.click(screen.getByRole("button", { name: "Create Channel" }));

    expect(onCreate).toHaveBeenCalledWith({
      name: "chat",
      type: "text",
      isPrivate: false,
    });
  });

  it("shows the API error and keeps the dialog open when creation fails", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onCreate = vi.fn().mockRejectedValue({
      data: { message: "You do not have permission to manage channels." },
    });

    render(<CreateChannelModal isOpen onClose={onClose} onCreate={onCreate} />);

    await user.type(screen.getByLabelText("Channel Name"), "chat");
    await user.click(screen.getByRole("button", { name: "Create Channel" }));

    expect(
      await screen.findByText("You do not have permission to manage channels.")
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});
