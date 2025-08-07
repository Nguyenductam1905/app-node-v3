import mysql from 'mysql2/promise';

// Export một hàm để lấy kết nối, để bạn có thể gọi nó khi cần
export const getConnection = async () => {
    return await mysql.createConnection({
        // Đọc host từ biến môi trường DB_HOST, nếu không có thì mặc định là 'localhost' (chỉ dùng cho phát triển cục bộ không qua Docker)
        host: process.env.DB_HOST || 'localhost',
        // Đọc user từ biến môi trường DB_USER, nếu không có thì mặc định là 'root'
        user: process.env.DB_USER || 'root',
        // Đọc password từ biến môi trường DB_PASSWORD, nếu không có thì mặc định là chuỗi rỗng
        password: process.env.DB_PASSWORD || '',
        // Đọc database từ biến môi trường DB_DATABASE, nếu không có thì mặc định là 'nodejspro'
        database: process.env.DB_DATABASE || 'nodejspro',
        // Đọc port từ biến môi trường DB_PORT, chuyển sang số nguyên, nếu không có thì mặc định là 3306
        port: parseInt(process.env.DB_PORT || '3306', 10),
    });
};

// Nếu bạn đang xuất thẳng pool hoặc connection, hãy đảm bảo nó được khởi tạo một lần
// hoặc được quản lý bởi một hàm.
// Ví dụ: Nếu bạn có một pool kết nối global, có thể làm như sau:
/*
let pool: mysql.Pool;

export const initDbPool = () => {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'nodejspro',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};

export const getPool = () => {
    if (!pool) {
        initDbPool(); // Khởi tạo nếu chưa có
    }
    return pool;
};
*/

export default getConnection;