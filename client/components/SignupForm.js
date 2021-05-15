import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Message from '../components/Message';

const Logo = styled.img`
    display: block;
    width: 25%;
    height: 50%;
    margin-right: 30px;
`;

const Greeting = styled.h3`
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
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

const SignupForm = () => {
    // 이메일 입력
    const [email, onChangeEmail] = useInput('');
    // 닉네임 입력
    const [nickname, onChangeNickname] = useInput('');
    // 비밀번호 입력/확인 
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    // 약관동의
    const [termCheck, setTermCheck] = useState(false);
    const [termCheckError, setTermCheckError] = useState(true);

    const onPasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    });
    
    const onTermChange = useCallback((e) => {
        // 체크한 경우에는 에더false
        setTermCheckError(!e.target.checked);
        setTermCheck(e.target.checked);
    },[]);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
    }, []);

    return (
        <SForm>
                <Logo src="/logo.png" alt="로고 이미지"/>
            <WrapperContainer>
                <Greeting>잠깐! 신규회원에게는 30% 할인쿠폰 쏩니다.</Greeting>
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
                    rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}>
                    <label htmlFor="user-email">닉네임</label>
                    <Input 
                        name="user-nickname"
                        value={nickname}
                        onChange={onChangeNickname}  
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
                <Form.Item
                    rules={[{ required: true, message: '비밀번호를 한 번 더 입력해주세요!' }]}>
                    <label htmlFor="user-password">비밀번호 체크</label>
                    <Input.Password
                        name="user-password-check"
                        value={passwordCheck}
                        onChange={onPasswordCheck}
                        required  
                    />
                </Form.Item>
                { passwordError && <Message color="#cf0000" contents="비밀번호를 다시 확인 후 입력해주세요."/> }
                <Form.Item>
                <Form.Item>
                    <label htmlFor="user-term">이용약관</label>
                    <Checkbox name="user-term" checked={termCheck} onChange={onTermChange} />
                    { termCheckError && <Message color="#cf0000" contents="약관에 동의하셔야 가입이 가능합니다."/> }
                </Form.Item>
                    <SButton type="primary" htmlType="submit" style={{ width: '100%' }}>
                        로그인
                    </SButton>
                </Form.Item>
            </WrapperContainer>
        </SForm>
    );
}

export default SignupForm;