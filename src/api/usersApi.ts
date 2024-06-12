import { CreateUserInput } from "@/interface/users.interface";
import instanceAxios from "./instanceAxios ";

const usersApi = {
  create(params: CreateUserInput) {
    const url = "/users";
    return instanceAxios.post(url, params);
  },

  getAll() {
    const url = "/users";
    return instanceAxios.get(url);
  },
};

export default usersApi;
