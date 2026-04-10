import { z } from "zod";
import { eq, and, asc, desc, like } from "drizzle-orm";
import { getDb } from "../db";
import { categories, products, heroSlides, siteSettings } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import { TRPCError } from "@trpc/server";

// Helper to check admin role
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Slugify helper
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const categoriesRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.sortOrder));
  }),

  listAll: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(categories).orderBy(asc(categories.sortOrder));
  }),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      sortOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const slug = slugify(input.name) + "-" + Date.now();
      await db.insert(categories).values({ ...input, slug });
      return { success: true };
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      sortOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      await db.update(categories).set(data).where(eq(categories.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),
});

export const productsRouter = router({
  list: publicProcedure
    .input(z.object({
      categoryId: z.number().optional(),
      featured: z.boolean().optional(),
      search: z.string().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { items: [], total: 0 };
      const conditions = [eq(products.isActive, true)];
      if (input?.categoryId) conditions.push(eq(products.categoryId, input.categoryId));
      if (input?.featured) conditions.push(eq(products.isFeatured, true));
      const items = await db
        .select({ product: products, category: categories })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(and(...conditions))
        .orderBy(asc(products.sortOrder), desc(products.createdAt))
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);
      return { items, total: items.length };
    }),

  listAll: adminProcedure
    .input(z.object({
      categoryId: z.number().optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { items: [], total: 0 };
      const conditions = [];
      if (input?.categoryId) conditions.push(eq(products.categoryId, input.categoryId));
      const query = db
        .select({ product: products, category: categories })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .orderBy(asc(products.sortOrder), desc(products.createdAt))
        .limit(input?.limit ?? 50)
        .offset(input?.offset ?? 0);
      const items = conditions.length > 0 ? await query.where(and(...conditions)) : await query;
      return { items, total: items.length };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db
        .select({ product: products, category: categories })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(eq(products.slug, input.slug))
        .limit(1);
      return result[0] ?? null;
    }),

  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db.select().from(products).where(eq(products.id, input.id)).limit(1);
      return result[0] ?? null;
    }),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      categoryId: z.number().optional(),
      description: z.string().optional(),
      price: z.string().optional(),
      oldPrice: z.string().optional(),
      imageUrl: z.string().optional(),
      images: z.string().optional(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      color: z.string().optional(),
      inStock: z.boolean().default(true),
      isFeatured: z.boolean().default(false),
      isNew: z.boolean().default(false),
      sortOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const slug = slugify(input.name) + "-" + Date.now();
      await db.insert(products).values({ ...input, slug });
      return { success: true };
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      categoryId: z.number().nullable().optional(),
      description: z.string().optional(),
      price: z.string().optional(),
      oldPrice: z.string().optional(),
      imageUrl: z.string().optional(),
      images: z.string().optional(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      color: z.string().optional(),
      inStock: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      isNew: z.boolean().optional(),
      sortOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      await db.update(products).set(data).where(eq(products.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(products).where(eq(products.id, input.id));
      return { success: true };
    }),
});

export const heroSlidesRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(heroSlides).where(eq(heroSlides.isActive, true)).orderBy(asc(heroSlides.sortOrder));
  }),

  listAll: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder));
  }),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      subtitle: z.string().optional(),
      buttonText: z.string().optional(),
      buttonLink: z.string().optional(),
      imageUrl: z.string().optional(),
      sortOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(heroSlides).values(input);
      return { success: true };
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      buttonText: z.string().optional(),
      buttonLink: z.string().optional(),
      imageUrl: z.string().optional(),
      sortOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      await db.update(heroSlides).set(data).where(eq(heroSlides.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(heroSlides).where(eq(heroSlides.id, input.id));
      return { success: true };
    }),
});

export const settingsRouter = router({
  get: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return {};
    const rows = await db.select().from(siteSettings);
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  }),

  update: adminProcedure
    .input(z.record(z.string(), z.string()))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      for (const [settingKey, settingValue] of Object.entries(input)) {
        await db
          .insert(siteSettings)
          .values({ key: settingKey, value: settingValue })
          .onDuplicateKeyUpdate({ set: { value: settingValue } });
      }
      return { success: true };
    }),
});

export const uploadRouter = router({
  uploadFile: adminProcedure
    .input(z.object({
      filename: z.string(),
      contentType: z.string(),
      base64Data: z.string(),
    }))
    .mutation(async ({ input }) => {
      const key = `furniture/${Date.now()}-${input.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const buffer = Buffer.from(input.base64Data, "base64");
      const { url } = await storagePut(key, buffer, input.contentType);
      return { url };
    }),
});
