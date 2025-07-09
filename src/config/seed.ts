import {prisma} from "config/client"
import { hashPassword } from "services/user.services"
import { ACCOUNT_TYPE } from "config/constant"

const initDatabase = async () => {
    const defaultPassword = await hashPassword("123456")
        const adminRole = await prisma.role.findFirst({
            where:
                {
                    name: "ADMIN"
                }
        })
    if(await prisma.user.count()){
        console.log("===>>>: Data INITED")
    }
    else{
        if(adminRole){
            await prisma.user.createMany({
                data: [
                    {
                        username: "admin@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        phone: "",
                        avatar: "",
                        fullName: "Admin",
                        address: "",
                        roleId: adminRole.id
                    },
                    {
                        username: "tam256562@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        phone: "0395796058",
                        avatar: "",
                        fullName: "Tam Nguyen",
                        address: "Ha Noi",
                        roleId: adminRole.id
                    }
                ]
            })       
        }
         
    }
    if (await prisma.role.count() === 0){
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin of system"
                },
                {
                    name: "USER",
                    description: "User normally"
                },
            ]
        })
    }
}

export default initDatabase