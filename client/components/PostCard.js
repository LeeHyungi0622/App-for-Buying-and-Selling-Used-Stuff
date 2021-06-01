import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import styled from 'styled-components';
import { removePost } from '../redux/post/post.actions';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 900px;
`;

const SCard = styled(Card)`
    background: transparent;
`;

const PostCard = ({ post }) => {
    const [liked, onChangeLiked, setLiked] = useInput(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const id = currentUser?.id;
    const dispatch = useDispatch();

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleCommentFormOpen = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemove = () => {
        dispatch(removePost(post.id));
    }
    return (
     <CardWrapper>
        <SCard
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
            <RetweetOutlined key="retweet" />,
            liked ? (<HeartTwoTone twoToneColor="#f70122" key="heart" onClick={onToggleLike} />) : (<HeartOutlined key="heart" onClick={onToggleLike} />),
            <MessageOutlined key="comment" onClick={onToggleCommentFormOpen} />,
            <Popover
                key="more"
                content={(
                    <Button.Group>
                        {id && post.User.id === id ? (
                        <>
                            <Button>수정</Button>
                            <Button type="danger" onClick={onRemove}>삭제</Button>
                        </>
                        ) : <Button>신고</Button>}
                    </Button.Group>
                )}
            >
                <EllipsisOutlined />
            </Popover>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
            />
        </SCard>
        {commentFormOpened && (
            <div>
                <CommentForm post={post} />
                <List
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                                // datasource로 post.Comments 내의 객체를 순회한다.
                    dataSource={post.Comments}
                                // dataSource로부터 넘겨받은 comment item을 반복 순회한다.
                    renderItem={(item) => (
                    <li>
                        <Comment
                        author={item.User.nickname}
                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                        content={item.content}
                        />
                    </li>
                    )}
                />
            </div>
        )}
     </CardWrapper>   
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comment: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
};

export default PostCard;