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
    margin: 20px 0;
    padding: 10px;
    box-shadow: 5px 8px 24px 5px rgba(60, 60, 60, 0.6);
`;

const CommentWrapper = styled.div`
    border: 1px solid rgba(180, 180, 180, 0.8);
    padding: 10px;
    margin-bottom: 20px;
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
            liked ? (<><HeartTwoTone twoToneColor="#f70122" key="heart" onClick={onToggleLike} /><span>좋아요</span></>) : (<><HeartOutlined key="heart" onClick={onToggleLike} /><span>좋아요</span></>),
            <><MessageOutlined key="comment" onClick={onToggleCommentFormOpen} /><span>댓글보기</span></>,
            <Popover
                key="more"
                content={(
                    <Button.Group>
                        {id && post.User.id === id ? (
                        <>
                            <Button>수정하기</Button>
                            <Button type="danger" onClick={onRemove}>게시물 삭제하기</Button>
                        </>
                        ) : <Button>신고하기</Button>}
                    </Button.Group>
                )}
            >   
                <>
                    <EllipsisOutlined />
                    <span>더보기</span>
                </>
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
            <CommentWrapper>
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
            </CommentWrapper>
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