import {prisma} from 'config/client'

const handleGetAllUser = async () =>{
    return await prisma.user.findMany()
}
const handleGetAllUserByID = async (id: any) =>{
    return await prisma.user.findUnique({
        where: {id: +id}
    })
}

const handleUpdateUserById = async (id: number, fullName: string, address: string, phone: string, avatar: string) => {
    return await prisma.user.update({
        where:{id: id},
        data: {
            fullName: fullName,
            address: address,
            phone: phone,
            ...(avatar !== undefined && {avatar: avatar})
        }
    })
}
export {
    handleGetAllUser,
    handleGetAllUserByID,
    handleUpdateUserById
}