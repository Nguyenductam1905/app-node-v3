import { z } from "zod"

export const ProductSchema = z.object({
    name: z.string().trim().min(1, {message: "Tên không được để trống"}),
    price: z.preprocess(
        (val) => typeof val === "string" ? Number(val) : val,
        z.number().refine((num) => num > 0, {message: "Số tiền tối thiểu là 1"})
    ),
    detailDesc: z.string().trim().min(1, {message: "Detail description không được để trống"}),
    shortDesc: z.string().trim().min(1, {message: "Short description không được để trống"}),
    quantity: z.preprocess(
        (val) => typeof val === "string" ? Number(val) : val,
        z.number().refine((num) => num > 0, {message: "Số lượng tối thiểu là 1"})
    ),
    factory: z.string().trim().min(1, {message: "Factory không được để trống"}),
    target: z.string().trim().min(1, {message: "Target không được để trống"})
    // image      String? @db.VarChar(255)
    // detailDesc String  @db.VarChar(255)
    // shortDesc  String  @db.VarChar(255)
    // factory    String  @db.VarChar(255)
    // quantity   Int
    // target     String  @db.VarChar(255)
    // sold       Int     @default(0)
})

export type TProductSchema = z.infer<typeof ProductSchema>;
