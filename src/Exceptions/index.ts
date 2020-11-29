
export class DivideByZeroException extends Error {
  constructor() {
    super("Division by zero")
    Object.setPrototypeOf(this, DivideByZeroException.prototype);
  }
}

export class InvalidArguments extends Error {
  constructor(msg) {
    super(msg)
    Object.setPrototypeOf(this, InvalidArguments.prototype);
  }
}

export class AssertionError extends Error {
  constructor(msg) {
    super(msg)
    Object.setPrototypeOf(this, AssertionError.prototype);
  }
}
