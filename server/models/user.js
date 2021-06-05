module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {
        // 1:N
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        // through를 통해 중간 테이블의 이름지정
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        // foreign key
        // 같은 테이블 간의 중간 테이블을 생성하는 경우에는 foreign key로 이름을 바꿔준다. 
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    }
    return User;
}