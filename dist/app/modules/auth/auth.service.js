'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const config_1 = __importDefault(require('../../../config'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
// login
const login = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
      where: {
        userName,
      },
      include: {
        superAdmin: true,
        admin: true,
        driver: true,
        helper: true,
      },
    });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    if (
      isUserExist.password &&
      !(yield bcrypt_1.default.compare(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect'
      );
    }
    // create access token and refresh token
    const { id, role, superAdmin, admin, driver, helper } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id,
        role,
        userName,
        fullName: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.fullName
          : admin
          ? admin.fullName
          : driver
          ? driver.fullName
          : helper === null || helper === void 0
          ? void 0
          : helper.fullName,
        profileImg: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.profileImg
          : admin
          ? admin.profileImg
          : driver
          ? driver.profileImg
          : helper === null || helper === void 0
          ? void 0
          : helper.profileImg,
      },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id,
        role,
        userName,
        fullName: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.fullName
          : admin
          ? admin.fullName
          : driver
          ? driver.fullName
          : helper === null || helper === void 0
          ? void 0
          : helper.fullName,
        profileImg: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.profileImg
          : admin
          ? admin.profileImg
          : driver
          ? driver.profileImg
          : helper === null || helper === void 0
          ? void 0
          : helper.profileImg,
      },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    return {
      accessToken,
      refreshToken,
    };
  });
// refresh token
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (err) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token'
      );
    }
    const { id } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield prisma_1.default.user.findUnique({
      where: {
        id,
      },
      include: {
        superAdmin: true,
        admin: true,
        driver: true,
        helper: true,
      },
    });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    const { role, userName, superAdmin, admin, driver, helper } = isUserExist;
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id,
        role,
        userName,
        fullName: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.fullName
          : admin
          ? admin.fullName
          : driver
          ? driver.fullName
          : helper === null || helper === void 0
          ? void 0
          : helper.fullName,
        profileImg: superAdmin
          ? superAdmin === null || superAdmin === void 0
            ? void 0
            : superAdmin.profileImg
          : admin
          ? admin.profileImg
          : driver
          ? driver.profileImg
          : helper === null || helper === void 0
          ? void 0
          : helper.profileImg,
      },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  login,
  refreshToken,
};
