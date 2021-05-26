import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../redux/user/user.actions';

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 20px;
`;

const SCard = styled(Card)`
    width: 500px;
    background: #89cff0;    
    border: 2px solid black;
    .postMessage, .followings, .followers {
        color: black;
    }
    .ant-card-actions {
        background: #bbeeee;
        border-top: 1px solid black;
    }
    .ant-card-actions li:nth-child(2){
        border-left: 1px solid black;
        border-right: 1px solid black;
    }
`;

const SButton = styled(Button)`
    width: 80%;
    margin: 20px 0;
    border: 1px solid black;
    background: #f2fbf9;
    &:hover{
        background: #b8e9de;
    }
`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const { logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction);       
    });
    return (
        <ProfileWrapper>
            <SCard
                actions={[
                    <div className="postMessage" key="post-message">포스팅 <br/> 0</div>,
                    <div className="followings" key="followings">팔로잉 <br/> 0</div>,
                    <div className="followers" key="followers">팔로워 <br/> 0</div>
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>닉네임</Avatar>}
                    title="이현기"
                />
            </SCard>
            <SButton onClick={onLogOut} loading={logOutLoading}>로그아웃</SButton>
        </ProfileWrapper>
    );
};

export default UserProfile;