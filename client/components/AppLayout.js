import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { Row, Col } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>중고시장</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>내 프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    Login section
                </Col>
                <Col xs={24} md={18}>
                    Children section           
                    { children }     
                </Col>
            </Row>
        </>
    );
};

export default AppLayout;