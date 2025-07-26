import passport from "passport"; // Import thư viện Passport.js để quản lý xác thực.
import crypto from "crypto"; // Import thư viện crypto để mã hóa (hiện không được sử dụng trực tiếp trong đoạn mã này, nhưng thường dùng cho các tác vụ bảo mật).
import { Strategy as LocalStrategy } from "passport-local"; // Import LocalStrategy từ passport-local, dùng để xác thực bằng tên người dùng/mật khẩu.
import { prisma } from "config/client"; // Import đối tượng prisma client để tương tác với cơ sở dữ liệu.
import { comparePassword, handleViewUser } from "services/user.services"; // Import hàm comparePassword từ user.services để so sánh mật khẩu đã nhập với mật khẩu trong DB.
import { getCartDetail, getUserSumCart, getUserWithRoleById } from "controllers/client/auth.controller";


const configPassportLocal = () => {
    // Khởi tạo và cấu hình chiến lược Local Strategy cho Passport.
    passport.use(new LocalStrategy({
        // usernameField: "email", passwordField: "password" // (Tùy chọn) Có thể chỉ định tên trường cho username và password nếu khác với mặc định.
        passReqToCallback: true // Đặt thành true để truyền đối tượng req (request) vào hàm verify.
    }, async function verify(req, username, password, callback) { // Hàm verify sẽ được gọi khi Passport cố gắng xác thực người dùng.
        // console.log(">>> Check user: ", username, password); // In ra tên người dùng và mật khẩu để debug (KHÔNG NÊN LÀM TRONG MÔI TRƯỜNG SẢN XUẤT VÌ VẤN ĐỀ BẢO MẬT).
        const session = req.session as any; // Lấy đối tượng session từ request.
        let messages = session?.messages ?? [] // Lấy các tin nhắn từ session (ví dụ: thông báo lỗi).
        if(messages.length){
            session.messages = [] // Xóa các tin nhắn sau khi đã lấy để tránh hiển thị lại.
        }
        const user: any = await prisma.user.findUnique({ // Tìm người dùng trong cơ sở dữ liệu dựa trên username.
            where: {
                username
            }
        })
        if (!user) { // Nếu không tìm thấy người dùng:
            // Gọi callback với (lỗi, người dùng đã xác thực, thông báo lỗi).
            // null: không có lỗi; false: xác thực thất bại; object: thông báo lỗi.
            return callback(null, false, { message: `Username/password invalid` });
            // throw new Error(`Username: ${username} not found`) // Có thể ném lỗi nhưng cách trên phù hợp với luồng của Passport hơn.
        }
        // So sánh mật khẩu người dùng nhập vào với mật khẩu đã được mã hóa trong cơ sở dữ liệu.
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) { // Nếu mật khẩu không khớp:
            return callback(null, false, { message: `Username/Password invalid` }); // Trả về lỗi mật khẩu không hợp lệ.

        }
        // Nếu xác thực thành công, gọi callback với (không lỗi, đối tượng người dùng).
        return callback(null, user)
    }
    ));

    // Hàm serializeUser: Quyết định dữ liệu nào của người dùng sẽ được lưu vào session sau khi xác thực thành công.
    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    // Hàm deserializeUser: Được gọi trong mỗi request tiếp theo để lấy lại thông tin người dùng từ session.
    passport.deserializeUser(function (user: any, cb) {
        process.nextTick(async function () {

            const {id, username} = user
            //truy van vao database
            const userInDB: any = await getUserWithRoleById(id)
            const cart = await getUserSumCart(id)
            const cartDetail = await getCartDetail(cart?.id ?? 0)
            return cb(null, {...userInDB, sumCart: cart?.sum, cardId: cart?.id, cartDetail: cartDetail});
        });
    });
}

export default configPassportLocal; // Xuất hàm cấu hình để sử dụng ở nơi khác trong ứng dụng.