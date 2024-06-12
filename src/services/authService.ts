import authApi from "@/api/authApi";
import { LoginInput } from "@/interface/auth.interface";
import { TokenUtils } from "@/utils/token-utils";

export const login = async (params: LoginInput) => {
  try {
    const response = await authApi.login(params);
    TokenUtils.setAccessToken(response.data.access_token);
    TokenUtils.setInfo(response.data.info);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("info");
  window.location.href = "/login";
};
