const express = require('express');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const db = require('./models');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
// cors
app.use(cors({
    origin: true,
    credentials: false,
}))

// Server 구동시에 DB Sequelize 연결도 함께 실행
db.sequelize.sync()
    .then(() => {
        console.log('DB connection success');
    })
    .catch(console.error);

// passport 환경설정
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello api');
});

app.use('/user', userRouter);

app.listen(3066, () => {
    console.log('Server is running');
});