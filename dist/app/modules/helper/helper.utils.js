"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHelperId = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// find Last ID
const findLastId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentId = yield prisma_1.default.helper.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            helperId: true,
        },
    });
    const splitCurrent = ((_a = currentId === null || currentId === void 0 ? void 0 : currentId.helperId) === null || _a === void 0 ? void 0 : _a.split('H-')) || ['', '0'];
    return splitCurrent[1];
});
// generate helper ID
const generateHelperId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = parseInt(yield findLastId());
    const incrementId = currentId + 1;
    return incrementId === null || incrementId === void 0 ? void 0 : incrementId.toString().padStart(6, 'H-00000');
});
exports.generateHelperId = generateHelperId;
