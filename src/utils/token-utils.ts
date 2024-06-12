import { User } from "@/interface/users.interface";

export class TokenUtils {
  static setAccessToken(accessToken: string) {
    localStorage.setItem("access_token", accessToken);
  }

  static getAccessToken(): string | null {
    const token = window.localStorage.getItem("access_token");
    return token;
  }

  static setInfo(info: User) {
    localStorage.setItem("info", JSON.stringify(info));
  }

  static getInfo(): User {
    const info = JSON.parse(localStorage.getItem("info")!);
    return info;
  }
}
