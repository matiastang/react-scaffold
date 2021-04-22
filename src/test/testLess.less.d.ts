declare namespace TestLessLessNamespace {
  export interface ITestLessLess {
    testLess: string;
  }
}

declare const TestLessLessModule: TestLessLessNamespace.ITestLessLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TestLessLessNamespace.ITestLessLess;
};

export = TestLessLessModule;
