const express = require('express');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();

// Server 구동시에 DB Sequelize 연결도 함께 실행
db.sequelize.sync()
    .then(() => {
        console.log('DB connection success');
    })
    .catch(console.error);


app.get('/', (req, res) => {
    res.send('hello api');
});

app.use('/user', userRouter);

app.listen(3066, () => {
    console.log('Server is running');
});