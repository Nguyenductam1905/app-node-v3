import {prisma} from "config/client"

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}


const handleCreateUser = async (
    name: string,
    email: string,
    address: string) => {
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: address
        }
    })
}

const handleDeleteUser = async (id:any) => {
    await prisma.user.delete({
        where: {
            id: id
        }
    })
}

const handleViewUser = async (id:any) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
    return user
    // const connection = await getConnection();
    // try{
    //     const sql = 'SELECT * FROM `User` WHERE `id` = ?';
    //     const value = [id];
    //     const [result,fields] = await connection.execute(sql, value) as [RowDataPacket[], FieldPacket[]]
    //     return result[0]
    // }
    // catch(err){
    //     console.log(err);
    // }
}

const handleUpdateUser = async (id: any, name: string, email: string, address: string) => {
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            address: address,
            email: email
        },
    })
    // const connection = await getConnection();
    // try{
    //     const sql = 'UPDATE `User` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?';
    //     const value = [name, email, address, id];
    //     await connection.execute(sql, value)
    // }
    // catch(err){
    //     console.log(err);

    // }
}

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser }