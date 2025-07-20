import {prisma} from "config/client"
import { TProductSchema } from "src/validation/user.schema"
import id from "zod/v4/locales/id.cjs"

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    factory: string,
    quantity: number,
    target: string,
    image: string
    ) => {
    await prisma.product.create({
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            factory: factory,
            quantity: +quantity,
            target: target,
            ...(image && {image: image})
        }
    })
}

const getProductList = async () => {
    return await prisma.product.findMany()
}

const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: { id: id }
    })
}

const handleViewProduct = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {id: id}
    })
    console.log(product)
    return product
}

export {createProduct, getProductList, handleDeleteProduct, handleViewProduct}