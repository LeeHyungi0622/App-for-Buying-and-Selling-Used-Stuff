import Document from 'next/document';
// Import styled-components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        // ServerStyleSheet instance를 생성한다.
        const sheet = new ServerStyleSheet();
        // Page에 있는 컴포넌트에서 style을 검색한다.
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => 
                // page의 컴포넌트에 적용된 스타일을 검색한다.
                originalRenderPage({
                    enhanceApp: (App) => (props) => 
                        sheet.collectStyles(<App {...props} />),
            });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}