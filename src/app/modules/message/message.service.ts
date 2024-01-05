/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Message } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { messageSearchableFields } from './message.constant';
import { IMessageFilters } from './message.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';

export const createMessageToDB = async (
  user: JwtPayload | null,
  messageData: Message
): Promise<any> => {
  const { message, conversationId } = messageData;

  const result = await prisma.message.create({
    data: {
      message,
      conversationId,
    },
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create message!');
  }
};

export const getAllMessageFromDB = async (
  filters: IMessageFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Message[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: messageSearchableFields.map(field => ({
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
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.MessageWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.message.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.message.count();
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
};

export const getSingleMessageFromDB = async (
  id: string
): Promise<Message | null> => {
  const result = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is no message with the id/Failed to fetched message'
    );
  }
};

export const updateSingleMessageToDB = async (
  id: string,
  payload: Message
): Promise<Partial<Message> | null> => {
  // check is exist
  const isExist = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message Not Found');
  }

  const result = await prisma.message.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Message');
  }

  return result;
};

export const deleteSingleMessageFromDB = async (
  id: string
): Promise<Partial<Message> | undefined> => {
  const deleteMessage = await prisma.message.delete({
    where: {
      id,
    },
  });

  if (deleteMessage) {
    return deleteMessage;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is no message with the id/Failed to delete message'
    );
  }
};
