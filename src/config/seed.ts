import {prisma} from "config/client"

const initDatabase = async () => {
    if(await prisma.user.count()){
        console.log("===>>>: Data INITED")
    }
    else{
        await prisma.user.createMany({
            data: [
                {
                    username: "admin@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM",
                    phone: "",
                    avatar: "",
                    fullName: "",
                    address: "",
                },
                {
                    username: "tam256562@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM",
                    phone: "0395796058",
                    avatar: "",
                    fullName: "Tam Nguyen",
                    address: "Ha Noi",
                }
            ]
        })        
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