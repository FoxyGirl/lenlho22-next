export const Roboto = () => (
  <>
    <link
      rel="preload"
      href="/fonts/Roboto/Roboto-Regular.ttf"
      as="font"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/fonts/Roboto/Roboto-Bold.ttf"
      as="font"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/fonts/Roboto/Roboto-Light.ttf"
      as="font"
      crossOrigin="anonymous"
    />

    {/* eslint-disable-next-line react/no-danger */}
    <style
      dangerouslySetInnerHTML={{
        __html: `

      @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local('Roboto-Light'),
          url('/fonts/Roboto/Roboto-Light.ttf') format('truetype');
      }

      @font-face {
        font-family: Roboto;
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: local('Roboto-LightItalic'),
          url('/fonts/Roboto/Roboto-LightItalic.ttf') format('truetype');
      }

      @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        unicode-range: U+000-5FF;
        src: local('Roboto-Regular'),
          url('/fonts/Roboto/Roboto-Regular.ttf') format('truetype');
      }

      @font-face {
        font-family: Roboto;
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        unicode-range: U+000-5FF;
        src: local('Roboto-Bold'),
          url('/fonts/Roboto/Roboto-Bold.ttf') format('truetype');
      }
      `,
      }}
    />
  </>
);
