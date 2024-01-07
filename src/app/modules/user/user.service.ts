import {
  Admin,
  Driver,
  Helper,
  Prisma,
  SuperAdmin,
  User,
  UserRole,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { generateDriverId } from '../driver/driver.utils';
import { generateHelperId } from '../helper/helper.utils';
import { IUserFilters } from './user.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constant';

// create super admin
const createSuperAdmin = async (
  user: User,
  superAdmin: SuperAdmin
): Promise<User | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  user.role = UserRole.super_admin;

  const result = await prisma.user.create({
    data: { ...user, superAdmin: { create: superAdmin } },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// create admin
const createAdmin = async (user: User, admin: Admin): Promise<User | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  user.role = UserRole.admin;

  const result = await prisma.user.create({
    data: { ...user, admin: { create: admin } },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// create driver
const createDriver = async (
  user: User,
  driver: Driver
): Promise<User | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  user.role = UserRole.driver;

  // generate driver id
  const driverId = await generateDriverId();

  // set driver id
  driver.driverId = driverId;

  const result = await prisma.user.create({
    data: { ...user, driver: { create: driver } },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// create helper
const createHelper = async (
  user: User,
  helper: Helper
): Promise<User | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  user.role = UserRole.helper;

  // generate helper id
  const helperId = await generateHelperId();

  // set helper id
  helper.helperId = helperId;

  const result = await prisma.user.create({
    data: { ...user, helper: { create: helper } },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { searchTerm, role } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (role) {
    andConditions.push({
      role: role,
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      superAdmin: true,
      admin: true,
      driver: true,
      helper: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

export const UserService = {
  createSuperAdmin,
  createAdmin,
  createDriver,
  createHelper,
  getAll,
};
