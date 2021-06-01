import React, { useCallback } from 'react';
import { Card, Avatar, Button, List, Typography } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../redux/user/user.actions';
import { UserOutlined } from '@ant-design/icons';

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 20px;
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

const Contents = styled.div`
    width: 500px;
    h2 {
        text-align: center;
        font-size: 30px;
        font-weight: 700;
    }
`;

const NameCard = styled(Card)`
    margin-top: 20px;
    .ant-card-body {
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-radius: 10px;
        box-shadow: 5px 8px 24px 5px rgba(60, 60, 60, 0.6);
    }
`;

const ActivityCard = styled(Card)`
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 5px 8px 24px 5px rgba(60, 60, 60, 0.6);
`;

const SList = styled.ul`
`;

const SItem = styled.li`
    display: flex;
    justify-content: space-around;
    font-size: 15px;
`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const { logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction);       
    });

    const { Title } = Typography;
    return (
        <ProfileWrapper>
            <Contents>
                <h2>마이 페이지</h2>
                <NameCard>
                    <Avatar size={64}>이</Avatar><Title level={2} style={{ margin: 'auto' }}>이현기</Title>
                </NameCard>

                <ActivityCard title="활동내역" bordered={true}>
                    <SList>
                        <SItem><span>포스팅</span><span>0</span></SItem> 
                        <SItem><span>팔로워</span><span>0</span></SItem> 
                        <SItem><span>팔로잉</span><span>0</span></SItem> 
                    </SList>
                </ActivityCard>
            </Contents>
            <SButton onClick={onLogOut} loading={logOutLoading}>로그아웃</SButton>
        </ProfileWrapper>
    );
};

export default UserProfile;