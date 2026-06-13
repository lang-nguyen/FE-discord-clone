import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ChannelSidebar } from "@/features/channels/components/ChannelSidebar";

describe("ChannelSidebar", () => {
  it("renders categories without a synthetic channel container", () => {
    render(
      <MemoryRouter>
        <ChannelSidebar
          server={{ id: "server-1", name: "Community" }}
          channels={[]}
          categories={[
            { id: "category-1", name: "General", position: 1 },
            { id: "category-2", name: "Games", position: 2 },
          ]}
          onCreateChannel={vi.fn()}
          onCreateCategory={vi.fn()}
          onMoveChannel={vi.fn()}
          onReorderCategory={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText("CHANNELS")).not.toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.queryByText("Drop a channel here")).not.toBeInTheDocument();
  });
});
