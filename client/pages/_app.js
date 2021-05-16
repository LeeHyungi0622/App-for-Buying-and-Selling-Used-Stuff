import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import wrapper from '../redux/store';

const GlobalStyle = createGlobalStyle`
    body {
        ${reset};
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #ffffc7;
        font-family: sans-serif;
    };
`;


const App = ({ Component, pageProps }) => {

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
                <title>Second hand shop</title>
            </Head>
            <GlobalStyle />
            <Component {...pageProps}/>
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);