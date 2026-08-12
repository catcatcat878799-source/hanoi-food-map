import { describe, expect, it } from "vitest";
import { batchValidate } from "./batch-import";
import { categories, restaurants } from "./restaurants";

describe("restaurants dataset", () => {
  it("exposes only the four restaurant categories", () => {
    expect(categories.map(category => category.id)).toEqual([
      "fine-dining",
      "local",
      "street-food",
      "cafe-dessert",
    ]);
  });

  it("contains 30 unique Hanoi restaurants", () => {
    expect(restaurants).toHaveLength(30);
    expect(new Set(restaurants.map(restaurant => restaurant.id)).size).toBe(
      restaurants.length
    );
    expect(
      restaurants.every(restaurant => restaurant.district.startsWith("河內"))
    ).toBe(true);
  });

  it("keeps category totals consistent", () => {
    const categoryTotal = categories.reduce(
      (total, category) =>
        total +
        restaurants.filter(restaurant => restaurant.category === category.id)
          .length,
      0
    );

    expect(categoryTotal).toBe(restaurants.length);
  });

  it("passes the built-in import validation", () => {
    const result = batchValidate(restaurants);

    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("uses valid Google Maps search links", () => {
    for (const restaurant of restaurants) {
      const url = new URL(restaurant.mapsUrl);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("www.google.com");
      expect(url.pathname).toBe("/maps/search/");
    }
  });
});
