import usersApi from "@/api/usersApi";
import { CreateUserInput } from "@/interface/users.interface";

export const createUser = async (data: CreateUserInput) => {
  try {
    const response = await usersApi.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await usersApi.getAll();
    return response;
  } catch (error) {
    throw error;
  }
};
