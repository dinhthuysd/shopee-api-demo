const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware để phân tích dữ liệu JSON
app.use(bodyParser.json());

// Mô phỏng dữ liệu bài đăng
let posts = [];

// API để đăng bài
app.post('/api/post', (req, res) => {
    const { productName, productPrice, videoDescription, videoFile, hashtags } = req.body;

    if (!productName || !productPrice || !videoDescription || !videoFile) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
    }

    const post = {
        id: posts.length + 1,
        link: `https://shopee.vn/product/${Math.floor(Math.random() * 1000000000)}`,
        status: 'Đăng thành công',
        productName,
        productPrice,
        videoDescription,
        videoFile,
        hashtags: hashtags || '',
        postedAt: new Date().toISOString(),
    };

    posts.push(post);

    res.status(201).json({
        message: 'Đăng bài thành công',
        post: post
    });
});

// API để lấy danh sách bài viết
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
