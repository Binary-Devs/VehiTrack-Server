'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError')
);
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const zod_1 = require('zod');
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError')
);
const client_1 = require('@prisma/client');
const handleClientError_1 = __importDefault(
  require('../../errors/handleClientError')
);
const config_1 = __importDefault(require('../../config'));
const globalErrorHandler = (err, req, res, next) => {
  // console error log
  console.log('global error handler', err);
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages = [];
  if (err instanceof client_1.Prisma.PrismaClientValidationError) {
    const simplifiedError = (0, handleValidationError_1.default)(err);
    statusCode =
      simplifiedError === null || simplifiedError === void 0
        ? void 0
        : simplifiedError.statusCode;
    message =
      simplifiedError === null || simplifiedError === void 0
        ? void 0
        : simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.default)(err);
    statusCode =
      simplifiedError === null || simplifiedError === void 0
        ? void 0
        : simplifiedError.statusCode;
    message =
      simplifiedError === null || simplifiedError === void 0
        ? void 0
        : simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = (0, handleClientError_1.default)(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError_1.default) {
    statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessages = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessages = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      config_1.default.env !== 'production'
        ? err === null || err === void 0
          ? void 0
          : err.stack
        : undefined,
  });
};
exports.default = globalErrorHandler;
