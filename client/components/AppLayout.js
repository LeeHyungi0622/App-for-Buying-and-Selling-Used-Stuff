import React, { useEffect } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Header = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    height: 80px;
    border: 1px solid black;
    background: #233e8b;
    padding: 10px;
    overflow: hidden;
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
    padding: 80px 0;
`;

const SMenu = styled(Menu)`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #3d84b8;
    border: 1px solid black;
    height: 80px;
    font-size: 1.2rem;
    overflow: hidden;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    a {
        color: white;
    }
`;

const AppLayout = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    
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
                <Link href="/profile"><a>마이 페이지</a></Link>
                { !currentUser && <Link href="/signup"><a>회원가입</a></Link> }   
            </SMenu>
        </>
    );
};

export default AppLayout;