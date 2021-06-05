const express = require('express');

const router = express.Router();

// 회원가입 관련 Router
router.post('/', (req, res, next) => {
    res.send('회원가입 관련 라우터');
});

// 로그인 관련 Router
router.post('/login', (req, res, next) => {
    res.send('로그인 관련 라우터')
});

// 로그아웃 관련 Router
router.post('/logout', (req, res, next) => {
    res.send('로그아웃 관련 라우터')
});

module.exports = router;