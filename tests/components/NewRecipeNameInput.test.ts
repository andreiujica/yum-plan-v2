import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import NewRecipeNameInput from "~/components/NewRecipe/NameInput.vue";

describe("RecipeNameInput", () => {
  it("can mount the component", async () => {
    const component = await mountSuspended(NewRecipeNameInput, {
      props: {
        initialName: "Initial Recipe Name",
      },
    });
    expect(component.html()).toContain("Enter a name like 'Unicorn Brownie'");
  });

  it("updates the recipe name and emits the correct event", async () => {
    const component = await mountSuspended(NewRecipeNameInput, {
      props: {
        initialName: "Initial Recipe Name",
      },
    });

    const input = component.find("input");
    await input.setValue("New Recipe Name");
    await nextTick();

    expect(component.emitted("update:recipeName")).toHaveLength(1);
    expect(component.emitted("update:recipeName")?.[0]).toEqual([
      "New Recipe Name",
    ]);
  });
});
