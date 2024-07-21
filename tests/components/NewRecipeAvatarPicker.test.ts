import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";
import NewRecipeAvatarPicker from "~/components/NewRecipe/AvatarPicker.vue";
import type { IconColor } from "~/types/recipe";

describe("NewRecipeAvatarPicker", () => {
  const recipe = {
    id: 7,
    name: "Test Recipe",
    iconColor: "red" as IconColor,
    ingredients: [],
  };

  it("can mount the component", async () => {
    const component = await mountSuspended(NewRecipeAvatarPicker, {
      props: { recipe },
    });
    expect(component.html()).toContain("bg-red-500");
  });

  it("emits the correct event when a color is clicked", async () => {
    const component = await mountSuspended(NewRecipeAvatarPicker, {
      props: { recipe },
    });

    const color = "green";
    const colorDiv = component.find(`.bg-${color}-500`);
    await colorDiv.trigger("click");
    await nextTick();

    expect(component.emitted("colorSelected")).toHaveLength(1);
    expect(component.emitted("colorSelected")?.[0]).toEqual([color]);
  });

  it("displays the correct icon when a color is selected", async () => {
    recipe.iconColor = "green" as IconColor;
    const component = await mountSuspended(NewRecipeAvatarPicker, {
      props: { recipe },
    });

    const color = "green";
    const icon = component.find(`.bg-${color}-500 .i-tabler-circle-check`);
    expect(icon.exists()).toBe(true);
  });
});
