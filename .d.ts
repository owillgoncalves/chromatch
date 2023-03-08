interface CustomMatchers<R = unknown> {
  toBeResponseLike(expected: any): R;
  toBeThwownErrorLike({ message: string, status: number }): R;
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }

  // Note: augmenting jest.Matchers interface will also work.
}

export {};
