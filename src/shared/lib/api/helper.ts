export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  // eslint-disable-next-line no-nested-ternary
  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};
