class BadRequestError extends Error {
  public readonly status = 400;

  constructor(message: string) {
    super(message);

    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
