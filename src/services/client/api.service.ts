import { prisma } from 'config/client'
import { comparePassword, hashPassword } from 'services/user.services'
import jwt from 'jsonwebtoken'
import { use } from 'passport'
// import process from 'dotenv'


const handleGetAllUser = async () => {
    return await prisma.user.findMany()
}
const handleGetAllUserByID = async (id: any) => {
    return await prisma.user.findUnique({
        where: { id: +id }
    })
}

const handleUpdateUserById = async (id: number, fullName: string, address: string, phone: string, avatar: string) => {
    return await prisma.user.update({
        where: { id: id },
        data: {
            fullName: fullName,
            address: address,
            phone: phone,
            ...(avatar !== undefined && { avatar: avatar })
        }
    })
}

const handleUserLogin = async (username: string, password: string) => {

    const user = await prisma.user.findUnique({ // Tìm người dùng trong cơ sở dữ liệu dựa trên username.
        where: {
            username: "horashidev@gmail.com"
        }
    })

    if (!user) { // Nếu không tìm thấy người dùng:
        // Gọi callback với (lỗi, người dùng đã xác thực, thông báo lỗi).
        // null: không có lỗi; false: xác thực thất bại; object: thông báo lỗi.
        throw new Error(`Username: ${username} not found`)
        // throw new Error(`Username: ${username} not found`) // Có thể ném lỗi nhưng cách trên phù hợp với luồng của Passport hơn.
    }
    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã được mã hóa trong cơ sở dữ liệu.
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) { // Nếu mật khẩu không khớp:
        throw new Error(`Username/Password invalid`)

    }
    // console.log(user)
    //handle user login => define access token jwt.sign(payload, secretPrivateKey, [option, cb])
    const payload = {
        id: user.id,
        username: user.username,
        password,
        role: user.roleId,
        name: user.fullName,
        accountType: user.accountType,
        address: user.address,
        phone: user.phone
        
    }
    console.log(payload)
    const expriseIn: any = process.env.JWT_EXPRISE_IN || '3h';
    const secret = process.env.JWT_SECRET || "horashi dev jwt";
    const access_token = jwt.sign(payload, secret,  { expiresIn: expriseIn } )
    // console.log(jwt.verify(access_token, process.env.JWT_SECRET as string))
    return access_token
}

export {
    handleGetAllUser,
    handleGetAllUserByID,
    handleUpdateUserById,
    handleUserLogin
}