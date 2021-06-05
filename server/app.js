const express = require('express');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const db = require('./models');
const cors = require('cors');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello api');
});

app.use('/user', userRouter);

app.listen(3066, () => {
    console.log('Server is running');
});