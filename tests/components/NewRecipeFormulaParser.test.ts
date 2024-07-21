import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import NewRecipeNewRecipeFormulaParser from "~/components/NewRecipe/FormulaParser.vue";
import { useIngredientStore } from "~/stores/ingredient";

describe("NewRecipeNewRecipeFormulaParser", () => {
  const ingredientStore = useIngredientStore();

  it("can mount the component", async () => {
    const component = await mountSuspended(NewRecipeNewRecipeFormulaParser);
    expect(component.html()).toContain(
      "Your formula should look like '100g * flour + 200ml * milk'"
    );
  });

  it("emits the correct value on input", async () => {
    const component = await mountSuspended(NewRecipeNewRecipeFormulaParser);
    const input = component.find("input");

    await input.setValue("100g * flour");
    await nextTick();

    expect(component.emitted("update:modelValue")?.[0]).toEqual([
      "100g * flour",
    ]);
  });

  it("shows suggestion and updates value on Tab key press", async () => {
    const component = await mountSuspended(NewRecipeNewRecipeFormulaParser);
    const input = component.find("input");

    await input.setValue("100g * flo");
    await nextTick();

    expect(component.html()).toContain("flour");
  });

  it("emits error on invalid formula", async () => {
    const component = await mountSuspended(NewRecipeNewRecipeFormulaParser);
    const input = component.find("input");

    await input.setValue("100g flour");
    await nextTick();

    expect(component.emitted("error")).toHaveLength(1);
    expect(component.emitted("error")?.[0]).toEqual(["Invalid formula"]);
  });

  it("emits valid on valid formula", async () => {
    const component = await mountSuspended(NewRecipeNewRecipeFormulaParser);
    const input = component.find("input");

    await input.setValue("100g * flour + 200ml * milk");
    await nextTick();

    expect(component.emitted("valid")).toHaveLength(1);
    expect(component.emitted("valid")?.[0]).toEqual([
      "100g * flour + 200ml * milk",
    ]);
  });
});
