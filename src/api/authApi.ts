import instanceAxios from "./instanceAxios ";
import { LoginInput } from "@/interface/auth.interface";

const authApi = {
  login(params: LoginInput) {
    const url = "/auth/login";
    return instanceAxios.post(url, params);
  },
};

export default authApi;
