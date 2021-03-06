import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';


class GDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="dark">
                <Head>
                    <meta charSet="utf-8" />
                </Head>
                <body className="bg-zinc-800 text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default GDocument;
