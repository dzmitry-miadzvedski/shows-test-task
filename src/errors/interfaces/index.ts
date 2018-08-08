interface CustomError extends Error {
  status?: number;
}

export {
  CustomError as Error
};
