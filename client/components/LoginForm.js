import React,{ useState } from 'react';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Logo = styled.img`
    display: block;
    width: 150px;
    height: 200px;
    margin: 0 auto;
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
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    
    return (
        <SForm>
            <WrapperContainer>
                <Logo src="/logo.png" alt="로고 이미지"/>
                <Form.Item
                    rules={[{ required: true, message: '이메일을 입력해주세요!' }]}>
                    <label htmlFor="user-email">이메일</label>
                    <Input 
                        name="user-email"
                        value={email}
                        onChange={setEmail}  
                        required
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
                    <label htmlFor="user-password">비밀번호</label>
                    <Input.Password
                        name="user-password"
                        value={password}
                        onChange={setPassword}
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