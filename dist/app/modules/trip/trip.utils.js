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
exports.generateTripNo = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
// find Last ID
const findLastId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentId = yield prisma_1.default.trip.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        tripNo: true,
      },
    });
    const splitCurrent = ((_a =
      currentId === null || currentId === void 0
        ? void 0
        : currentId.tripNo) === null || _a === void 0
      ? void 0
      : _a.split('T-')) || ['', '0'];
    return splitCurrent[1];
  });
// generate trip no
const generateTripNo = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId = parseInt(yield findLastId());
    const incrementId = currentId + 1;
    return incrementId === null || incrementId === void 0
      ? void 0
      : incrementId.toString().padStart(8, 'T-000000');
  });
exports.generateTripNo = generateTripNo;
