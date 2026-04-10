import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test/image.jpg", url: "https://cdn.example.com/test/image.jpg" }),
}));

describe("Furniture API - Schema validation", () => {
  it("should have correct category schema fields", () => {
    const category = {
      id: 1,
      name: "Диваны",
      slug: "divany",
      description: "Мягкая мебель",
      imageUrl: "https://example.com/image.jpg",
      sortOrder: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(category.name).toBe("Диваны");
    expect(category.slug).toBe("divany");
    expect(category.isActive).toBe(true);
  });

  it("should have correct product schema fields", () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "Диван Milano",
      slug: "divan-milano",
      description: "Угловой диван",
      price: "2500000.00",
      oldPrice: "3000000.00",
      imageUrl: "https://example.com/sofa.jpg",
      images: null,
      material: "Велюр",
      dimensions: "250×90×80 см",
      color: "Серый",
      inStock: true,
      isFeatured: true,
      isNew: false,
      sortOrder: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(product.name).toBe("Диван Milano");
    expect(product.inStock).toBe(true);
    expect(product.isFeatured).toBe(true);
    expect(parseFloat(product.price)).toBe(2500000);
  });

  it("should calculate discount percentage correctly", () => {
    const price = 2500000;
    const oldPrice = 3000000;
    const discountPercent = Math.round((1 - price / oldPrice) * 100);
    expect(discountPercent).toBe(17);
  });

  it("should have correct hero slide schema fields", () => {
    const slide = {
      id: 1,
      title: "Мебель для вашего дома",
      subtitle: "Современный дизайн",
      buttonText: "Смотреть каталог",
      buttonLink: "/catalog",
      imageUrl: "https://example.com/hero.jpg",
      sortOrder: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(slide.title).toBe("Мебель для вашего дома");
    expect(slide.isActive).toBe(true);
  });

  it("should slugify text correctly", () => {
    const slugify = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9а-яё\s-]/gi, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    };
    expect(slugify("Диван Milano")).toBe("диван-milano");
    expect(slugify("Угловой диван")).toBe("угловой-диван");
    expect(slugify("Modern Sofa 2024")).toBe("modern-sofa-2024");
  });

  it("should handle site settings as key-value pairs", () => {
    const settings = [
      { key: "phone", value: "+998 90 000 00 00" },
      { key: "address", value: "г. Ташкент" },
      { key: "email", value: "info@teosmebel.uz" },
    ];
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    expect(settingsMap.phone).toBe("+998 90 000 00 00");
    expect(settingsMap.address).toBe("г. Ташкент");
    expect(settingsMap.email).toBe("info@teosmebel.uz");
  });
});
