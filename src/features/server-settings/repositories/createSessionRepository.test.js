import { describe, expect, it } from "vitest";
import { createSessionRepository } from "@/features/server-settings/repositories/createSessionRepository";

describe("session repository", () => {
  it("supports list, create, update and remove without mutating fixtures", async () => {
    const fixtures = [{ id: "1", name: "Initial" }];
    const repository = createSessionRepository({
      storageKey: "repository-test",
      initialItems: fixtures,
    });

    await repository.create({ id: "2", name: "Created" });
    await repository.update("1", { name: "Updated" });
    await repository.remove("2");

    expect(await repository.list()).toEqual([{ id: "1", name: "Updated" }]);
    expect(fixtures).toEqual([{ id: "1", name: "Initial" }]);
  });
});
