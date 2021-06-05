const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.get('/', (req, res) => {
    res.send('hello api');
});

app.use('/user', userRouter);

app.listen(3066, () => {
    console.log('Server is running');
});