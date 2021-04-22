declare namespace TestCssCssNamespace {
  export interface ITestCssCss {
    testCss: string;
  }
}

declare const TestCssCssModule: TestCssCssNamespace.ITestCssCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TestCssCssNamespace.ITestCssCss;
};

export = TestCssCssModule;
