import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, SettingFilled } from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import styled from 'styled-components';
import { removeComment, removePost } from '../redux/post/post.actions';
import LoginSuggestion from './LoginSuggestion';
import FollowButton from './FollowButton';

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

const SettingButton = styled(Button)`
    border: none;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const CommentListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    &:first-child {
        border-top: 1px solid gray;
    }
    border-bottom: 1px solid gray;
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

    const onDeleteComment = (id) => () => {
        dispatch(removeComment({
            postId: post.id,
            commentId: id,
        }))
    }

    const hoverContent = (
        <Button.Group>
            {id && post.User.id === id ? (
            <>
                <Button>????????????</Button>
                <Button type="danger" onClick={onRemove}>????????? ????????????</Button>
            </>
            ) : <Button>????????????</Button>}
        </Button.Group>
    );

    return (
     <CardWrapper>
        <SCard
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
            liked ? (<><HeartTwoTone twoToneColor="#f70122" key="heart" onClick={onToggleLike} /><span>?????????</span></>) : (<><HeartOutlined key="heart" onClick={onToggleLike} /><span>?????????</span></>),
            <><MessageOutlined key="comment" onClick={onToggleCommentFormOpen} /><span>????????????</span></>,
            <Popover
                key="more"
                content={hoverContent}
                trigger="hover"
            >   
                <SettingButton>
                    <SettingFilled />
                    <span>????????? ??????/??????</span>
                </SettingButton>
            </Popover>,
            ]}
            extra={currentUser && <FollowButton post={post} />}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
            />
        </SCard>
        {commentFormOpened && (
            <CommentWrapper>
                { currentUser ? <CommentForm post={post} /> : <LoginSuggestion />}
                <List
                    header={`${post.Comments.length}?????? ??????`}
                    itemLayout="horizontal"
                                // datasource??? post.Comments ?????? ????????? ????????????.
                    dataSource={post.Comments}
                                // dataSource????????? ???????????? comment item??? ?????? ????????????.
                    renderItem={(item) => (
                    <CommentListItem>
                        <Comment
                        author={item.User.nickname}
                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                        content={item.content}
                        />
                        {currentUser && currentUser.nickname === item.User.nickname && (
                        <Button
                            type="danger"
                            onClick={onDeleteComment(item.id)}
                        >
                            ?????? ??????
                        </Button>)}
                    </CommentListItem>
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