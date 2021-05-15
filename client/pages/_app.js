import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: yellow;
    };
`;

const theme = {
    colors: {
        primary: '#0070f3'
    }
};

const App = ({ Component, pageProps }) => {

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
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

export default App;