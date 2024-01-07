import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Standard meta tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        /> */}
        <meta name="Izimart" content="Izimart" />
        <meta name="description" content="Get all your nearby products" />

        {/* Favicon */}
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://izimart.com/" />
        <meta property="og:title" content="Izimart" />
        <meta
          property="og:description"
          content="Get all your nearby products"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
        />

        <meta name="twitter:card" content="Izimart" />
        <meta name="twitter:site" content="izimart.com" />
        <meta name="twitter:title" content="Izimart" />
        <meta
          name="twitter:description"
          content="Get all your nearby products"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
        />

        {/* Additional meta tags or stylesheets as needed */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
