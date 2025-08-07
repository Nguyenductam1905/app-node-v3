import { Role, User as UserPrisma, Cart, CartDetail } from "@prisma/client";

declare global {
    namespace Express {
        interface User extends UserPrisma {
            role?: Role,
            sumCart?: Cart,
            cardId: CartDetail,
            cartDetail: CartDetail,
        }
    }
}