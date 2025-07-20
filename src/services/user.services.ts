import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant"
import bcript from "bcrypt"

const saltRounds = 10;

const hashPassword = async (plaintext: string) => {
    return await bcript.hash(plaintext, saltRounds)
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}
const getAllRoles = async () => {
    const roles = await prisma.role.findMany()
    return roles
}

const handleCreateUser = async (
    name: string,
    email: string,
    address: string,
    phone: string,
    avatar: any,
    role: any
) => {
    if (role === "USER") {
        role = 2
    }
    else {
        role = 1
    }
    const defaultPassword = await hashPassword("123456")
    await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            password: defaultPassword,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar || null,
            roleId: role
        }
    })
}

const handleDeleteUser = async (id: any) => {
    await prisma.user.delete({
        where: {
            id: id
        }
    })
}

const handleViewUser = async (id: any) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id,
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

const handleUpdateUser = async (id: any, name: string, email: string, address: string, phone: string, role: any, avatar: string) => {
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            fullName: name,
            // username: email,
            address: address,
            // password: defaultPassword,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: role,
            ...(avatar !== undefined && { avatar: avatar })
            
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


export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser, getAllRoles, hashPassword }