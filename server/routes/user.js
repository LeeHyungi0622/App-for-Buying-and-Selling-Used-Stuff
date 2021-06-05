const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

// 회원가입 관련 Router
router.post('/', async(req, res, next) => {
    try {
        // 회원가입을 하기 전에 email 중복검사
        const existingUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        // 이미 해당 email을 사용중이라면,
        if (existingUser) {
            // 403 status code와 함께 메시지를 클라이언트 사이드로 넘겨준다.
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        // 사용중인 email 계정이 아니라면, User model을 사용하여 새로운 사용자를 DB에 등록한다.
        // 숫자가 높을수록 암호화가 좋아진다.(하지만 높은 숫자의 암호화는 시간이 오래걸린다)
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('signup success!');
    } catch (error) {
        console.log(error);
        next(error);
    }
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