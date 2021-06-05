const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// sequelize는 내부적으로 mysql2 driver를 사용하기 때문에 아래와 같이 연결에 필요한 정보를 인수로 넘겨서
// Node.js와 MySQL을 연결해준다.
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;