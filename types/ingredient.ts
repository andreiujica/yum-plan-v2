type MeasurementUnit = "g" | "kg" | "ml" | "l" | "piece";

export interface Ingredient {
  id: number;
  name: string;
  measurementUnits: MeasurementUnit[];
}
