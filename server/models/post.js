module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 포함
        collate: 'utf8mb4_general_ci', // 한글 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        // N:N
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        // getLikers를 통해 게시글의 좋아요를 누른 사용자들에 대한 정보를 가져올 수 있다.
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Post.belongsTo(db.Post, { as: 'Retweet' });
    };
    return Post;
}