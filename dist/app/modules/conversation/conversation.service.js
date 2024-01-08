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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleConversationFromDB = exports.updateSingleConversationToDB = exports.getSingleConversationFromDB = exports.getAllConversationFromDB = exports.createConversationToDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const conversation_constant_1 = require("./conversation.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createConversationToDB = (user, conversationData) => __awaiter(void 0, void 0, void 0, function* () {
    const { participants, message, senderId, receiverId } = conversationData;
    const newResult = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.conversation.findFirst({
            where: {
                participants: {
                    contains: receiverId,
                },
            },
        });
        if (isExist) {
            const resConversation = yield transactionClient.conversation.update({
                where: {
                    id: isExist.id,
                },
                data: { message },
                include: {
                    sender: true,
                    receiver: true,
                },
            });
            if (!resConversation) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update conversation');
            }
            const resMessage = yield transactionClient.message.create({
                data: {
                    message,
                    senderId,
                    receiverId,
                    conversationId: resConversation.id,
                },
                include: {
                    conversation: {
                        include: {
                            sender: true,
                            receiver: true,
                        },
                    },
                },
            });
            return { conversation: resConversation, message: resMessage };
            // return resConversation;
        }
        else {
            const resConversation = yield transactionClient.conversation.create({
                data: {
                    participants,
                    message,
                    senderId,
                    receiverId,
                },
                include: {
                    sender: true,
                    receiver: true,
                },
            });
            if (!resConversation) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create conversation');
            }
            const resMessage = yield transactionClient.message.create({
                data: {
                    message,
                    senderId,
                    receiverId,
                    conversationId: resConversation.id,
                },
                include: {
                    conversation: {
                        include: {
                            sender: true,
                            receiver: true,
                        },
                    },
                },
            });
            return { conversation: resConversation, message: resMessage };
            // return resConversation;
        }
    }));
    if (newResult) {
        // const responseData = await prisma.conversation.findUnique({
        //   where: {
        //     id: newResult.conversation.id,
        //     // id: newResult.id,
        //   },
        //   include: {
        //     sender: true,
        //     receiver: true,
        //   },
        // });
        // return { conversation: responseData, message: newResult.message };
        return newResult;
        // return responseData;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create/update conversation!');
    }
});
exports.createConversationToDB = createConversationToDB;
const getAllConversationFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: conversation_constant_1.conversationSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andCondition.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.conversation.findMany({
        where: whereCondition,
        include: {
            sender: true,
            receiver: true,
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.conversation.count();
    const totalPage = Number(total) / Number(limit);
    return {
        meta: {
            total,
            page,
            limit,
            totalPage: Math.ceil(totalPage),
        },
        data: result,
    };
});
exports.getAllConversationFromDB = getAllConversationFromDB;
const getSingleConversationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.conversation.findUnique({
        where: {
            id,
        },
        include: {
            sender: true,
            receiver: true,
        },
    });
    if (result) {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'There is no conversation with the id/Failed to fetched conversation');
    }
});
exports.getSingleConversationFromDB = getSingleConversationFromDB;
const updateSingleConversationToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.conversation.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Conversation Not Found');
    }
    const result = yield prisma_1.default.conversation.update({
        where: {
            id,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Conversation');
    }
    return result;
});
exports.updateSingleConversationToDB = updateSingleConversationToDB;
const deleteSingleConversationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteConversation = yield prisma_1.default.conversation.delete({
        where: {
            id,
        },
    });
    if (deleteConversation) {
        return deleteConversation;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'There is no conversation with the id/Failed to delete conversation');
    }
});
exports.deleteSingleConversationFromDB = deleteSingleConversationFromDB;
