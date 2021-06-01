import React from 'react';
import { PageHeader, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80%;
`;

const SPageHeader = styled(PageHeader)`
    border: 1px solid rgb(235, 237, 240);
`;

const ButtonContainer = styled.div`
    text-align: center;
    a {
        display: block;
        padding: 10px 20px;
        border: solid 1px black;
        color: inherit;
        &:hover {
            background: lightblue;
        }
    }
`;

const LoginSuggestion = () => {

    return (
        <Wrapper>
            <SPageHeader
                title="아직 로그인 안하셨어요?"
                subTitle="로그인하시면 게시물 등록이 가능합니다." 
            />
            <ButtonContainer>
                <Link href="/profile">
                    <a>로그인하러가기</a>
                </Link>
            </ButtonContainer>
        </Wrapper>
    );
};

export default LoginSuggestion;