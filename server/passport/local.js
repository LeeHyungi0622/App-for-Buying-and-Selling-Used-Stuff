const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async(email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            // user가 존재하지 않는다면,
            if (!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
            }
            // user가 존재하는 경우, 비밀번호를 확인한다.
            const result = await bcrypt.compare(password, user.password);
            // 비밀번호가 일치하는 경우
            if (result) {
                // 서버에 user정보를 넘겨준다.
                return done(null, user);
            }
            // 비밀번호가 일치하지 않는 경우,
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }))
}