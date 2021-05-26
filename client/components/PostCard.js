import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';
import { Card, Button } from 'antd';
import { RetweetOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons'

const PostCard = ({ post }) => {
    const [liked, onChangeLiked, setLiked] = useInput(false);
    const [commentFormOpened, onChangeCommentFormOpened, setCommentFormOpened] = useInput(false);
    const { currentUser } = useSelector((state) => state.user);
    const id = currentUser?.id;

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleCommentFormOpen = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    return (
     <>
        <Card
            cover={}
            actions={[]}
        >
            <Card.Meta
                avatar={}
                title={}
                description={}
            />
        </Card>
        {commentFormOpened && (
            <div>
                댓글 부분
                {/* <CommentForm /> component*/}
                {/* <Comments /> component */}
            </div>
        )}
     </>   
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

