import { prisma } from "config/client"

const getProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: {id}
    })
}

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {id: productId}
    })

    if(cart){
        //update
        await prisma.cart.update({
            where: {id: cart.id},
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
    }else{
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

export {
    getProduct, getProductById, addProductToCart
}