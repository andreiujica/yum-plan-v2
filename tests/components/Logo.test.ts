import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect } from "vitest";
import Logo from "~/components/Logo.vue";

describe("Logo", () => {
  it("can mount the component", async () => {
    const component = await mountSuspended(Logo);
    expect(component.html()).toContain("Yum");
  });
});
