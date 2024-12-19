const multer = require('multer');
const path = require('path');

// Cấu hình lưu tệp tải lên
const storage = multer.memoryStorage(); // Dùng memoryStorage vì Vercel không hỗ trợ lưu vào đĩa cứng
const upload = multer({ storage: storage });

module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Xử lý tệp video tải lên
        upload.single('video')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: 'Lỗi tải video' });
            }

            // Lấy dữ liệu từ body
            const { description, price, hashtag } = req.body;

            // Kiểm tra mô tả và giá
            if (!description || !price) {
                return res.status(400).json({ message: 'Mô tả và giá sản phẩm là bắt buộc' });
            }

            // Nếu tất cả hợp lệ
            res.status(200).json({
                message: 'Đăng bài thành công!',
                postResult: {
                    link: `https://shopee.vn/product/${generateRandomLink()}`,
                    description,
                    price,
                    videoUrl: `https://link-to-video.com/${Date.now()}`, // URL video giả, thực tế bạn cần phải lưu trữ video ở nơi khác
                    hashtag,
                },
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

// Hàm tạo link ngẫu nhiên
function generateRandomLink() {
    return Math.random().toString(36).substring(7);
}
