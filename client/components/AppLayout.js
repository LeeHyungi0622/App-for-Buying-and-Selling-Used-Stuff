import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Header = styled.header`
    height: 10vh;
    border: 1px solid black;
    background: #233e8b;
    padding: 10px;
`;

const Logo = styled.img`
    height: 100%;
    line-height: 1;
`;

const Title = styled.h1`
    display: inline-block;
    vertical-align: middle;
    font-size: 1.5rem;
    margin-left: 10px;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    line-height: 1;
    height: 100%;
`;

const SRow = styled(Row)`
    height: 80vh;
`;

const SMenu = styled(Menu)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #3d84b8;
    border: 1px solid black;
    height: 10vh;
    font-size: 1.2rem;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    a {
        color: white;
    }
`;


const AppLayout = ({ children }) => {
    return (
        <>
            <Header>
                <Logo src="/logo.png" alt="메인 로고"/>
                <Title>중고장터</Title>
            </Header>
            <SRow>         
                { children }     
            </SRow>
            <SMenu mode="horizontal">
                <Link href="/"><a>메인페이지</a></Link>
                <Link href="/cart"><a>내가 찜한 목록</a></Link>
                <Link href="/profile"><a>마이 페이지</a></Link>
                <Link href="/login"><a>로그인</a></Link>
                <Link href="/signup"><a>회원가입</a></Link>     
            </SMenu>
        </>
    );
};

export default AppLayout;