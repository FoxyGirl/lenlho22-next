// Core
import Document, { Html, Main } from "next/document";

// Elements
import { Roboto } from "../elements/Roboto";

// Optimization
import { NextHeadCustom, NextScriptCustom } from "../init/document";

export default class CustomDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    const userAgent = context.req && context.req.headers["user-agent"];

    return {
      ...initialProps,
      userAgent,
    };
  }

  render() {
    return (
      <Html lang="en">
        <NextHeadCustom />
        <Roboto />
        <body>
          <Main />
          <NextScriptCustom />
        </body>
      </Html>
    );
  }
}
