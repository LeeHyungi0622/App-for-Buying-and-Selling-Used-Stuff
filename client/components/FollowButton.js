import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { followRequestAction, unfollowRequestAction } from '../redux/user/user.actions';
import PropTypes from 'prop-types';

const FollowButton = ({ post }) => {

    const { currentUser } = useSelector((state) => state.user);
    const isFollowing = currentUser?.Followings.find((v) => v.id === post.User.id);
    const dispatch = useDispatch();
    const onFollow = useCallback(() => {
        if (isFollowing) {
            // 팔로우하고 있는 상태라면, 언팔로우 처리
            dispatch(unfollowRequestAction(post.User.id));
        } else {
            // 언팔로우 상태라면, 팔로우 처리
            dispatch(followRequestAction(post.User.id));
        }
    }, [isFollowing]);
    return (
        <Button onClick={onFollow}>
            { isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );   
};

FollowButton.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        User: PropTypes.object,
        Images: PropTypes.array,
        Comments: PropTypes.array
    })
}

export default FollowButton;