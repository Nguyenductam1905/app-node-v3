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

const deleteProductToCart = async (id: number, userId: number) => {
    // Sử dụng transaction để đảm bảo tất cả các thao tác đều thành công hoặc rollback
    return await prisma.$transaction(async (tx) => {
        // Bước 1: Tìm chi tiết giỏ hàng (cartDetail) cần xóa
        // Đồng thời kiểm tra xem nó có thực sự thuộc về người dùng (userId) này không
        const cartDetailToDelete = await tx.cartDetail.findFirst({
            where: {
                id: id,          // ID của dòng sản phẩm trong giỏ hàng
                cart: {
                    userId: userId // Giỏ hàng phải thuộc về user này
                }
            },
            include: {
                cart: true // Lấy luôn thông tin giỏ hàng cha
            }
        });

        // Nếu không tìm thấy, nghĩa là cartDetailId không hợp lệ hoặc không thuộc về user
        if (!cartDetailToDelete) {
            throw new Error("Sản phẩm trong giỏ hàng không tồn tại hoặc bạn không có quyền xóa.");
        }
        
        const { cart, quantity, price } = cartDetailToDelete;
        
        // Bước 2: Cập nhật giỏ hàng chính (Cart)
        // Trừ đi số lượng của sản phẩm sắp bị xóa
        const updatedCart = await tx.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    decrement: quantity
                }
                // Lưu ý: Nếu bạn có trường `totalPrice` trong Cart, hãy trừ nó ở đây
                // totalPrice: {
                //     decrement: quantity * price
                // }
            }
        });

        // Bước 3: Xóa bản ghi cartDetail
        await tx.cartDetail.delete({
            where: {
                id: id
            }
        });

        // Bước 4: Nếu giỏ hàng rỗng sau khi xóa (sum <= 0), thì xóa luôn giỏ hàng
        if (updatedCart.sum <= 0) {
            await tx.cart.delete({
                where: {
                    id: updatedCart.id
                }
            });
        }
        
        // Trả về chi tiết sản phẩm đã xóa để xác nhận
        return { message: "Đã xóa sản phẩm khỏi giỏ hàng thành công.", deletedItem: cartDetailToDelete };
    });
}

const getQuantityByProductId = async (id : number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: {id: id}
    })
    return cartDetail?.quantity
}

export {
    getProduct, getProductById, addProductToCart, getCartUserInfoById, getProductByUserCart, getQuantityByProductId, deleteProductToCart,
}