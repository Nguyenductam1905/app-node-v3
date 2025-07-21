import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/user.services"

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {name: "USER"}
    })
    if(userRole) {
        await prisma.user.create({
            data:{
                username: email,
                password: password,
                fullName: fullName,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id,
                address: "",
                avatar: "",
                phone: "",
            }
        })
    }
}

export {registerNewUser}