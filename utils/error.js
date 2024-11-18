export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

/**
 * Sends an error response with a standard format.
 *
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - The error message to send.
 * @param {Array} errors - (Optional) An array of error details (e.g., validation errors).
 */
export const sendErrorResponse = (res, statusCode, message, errors = []) => {
  const response = {
    status: "error",
    message,
    errors,
  };

  res.status(statusCode).json(response);
};
