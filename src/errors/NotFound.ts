class NotFoundError extends Error {
  public readonly status = 404;

  constructor(message: string) {
    super(message);

    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
