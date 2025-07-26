import { prisma } from "config/client"

const getProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    })
}

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: { id: productId }
    })

    if (cart) {
        //update
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                //ham prisma tang theo so luong
                sum: {
                    increment: quantity
                },
                userId: user.id,

            }
        })
        //update + create to cartdetail
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                product_id: productId,
                cart_id: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0, // Use 0 or another invalid id if null, or handle differently if needed
                cart_id: cart.id
            },
            update: { quantity: { increment: quantity } },
            create: {
                price: product?.price ?? 0,
                quantity: quantity,
                cart_id: cart.id,
                product_id: productId
            }
        })
    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product?.price || 0,
                            quantity: quantity,
                            product_id: productId
                        }
                    ]
                }
            }
        })
    }
}

const getCartUserInfoById = async (user: any) => {
    console.log(user.id)
    const cart = await prisma.cart.findMany({
        where: {
            userId:  user.id,
        }
    })
    return cart
}

// [
//   { id: 1, cart_id: 1, product_id: 1, quantity: 1, price: 17490000 },
//   { id: 2, cart_id: 1, product_id: 2, quantity: 1, price: 15490000 }
// ]

const getProductByUserCart = async (cartDetail: any) => {
    const products: Promise <any[]> = Promise.all((cartDetail).map(async (cart: any) : Promise<any> => {
        return await prisma.product.findUnique({
            where: {id: cart.id}
        })
    }))
    return products
}

const getQuantityByProductId = async (id : number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: {id: id}
    })
    return cartDetail?.quantity
}

export {
    getProduct, getProductById, addProductToCart, getCartUserInfoById, getProductByUserCart, getQuantityByProductId
}