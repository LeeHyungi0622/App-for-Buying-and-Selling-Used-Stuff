import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../redux/user/user.actions';

const Logo = styled.img`
    display: block;
    width: 150px;
    height: 200px;
    margin: 0 auto;
`;

const Greeting = styled.h2`
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
`;

const SForm = styled(Form)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SButton = styled(Button)`
    height: 50px;
    background-color: #a7d0cd;
    &:hover{
        background-color: #1eae98;
    }
`;

const WrapperContainer = styled.div`
    width: 50%;
`;

const LoginForm = () => {
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    return (
        <SForm onFinish={onSubmitForm}>
            <WrapperContainer>
                <Logo src="/logo.png" alt="로고 이미지"/>
                <Greeting>오늘 하루도 인생템 득템하세요!</Greeting>
                <Form.Item
                    rules={[{ required: true, message: '이메일을 입력해주세요!' }]}>
                    <label htmlFor="user-email">이메일</label>
                    <Input 
                        name="user-email"
                        value={email}
                        onChange={onChangeEmail}  
                        required
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
                    <label htmlFor="user-password">비밀번호</label>
                    <Input.Password
                        name="user-password"
                        value={password}
                        onChange={onChangePassword}
                        required  
                    />
                </Form.Item>
                <Form.Item>
                    <SButton type="primary" htmlType="submit" style={{ width: '100%' }}>
                        로그인
                    </SButton>
                </Form.Item>
            </WrapperContainer>
        </SForm>
    );
}

export default LoginForm;