declare namespace TestScssScssNamespace {
  export interface ITestScssScss {
    testScss: string;
  }
}

declare const TestScssScssModule: TestScssScssNamespace.ITestScssScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TestScssScssNamespace.ITestScssScss;
};

export = TestScssScssModule;
