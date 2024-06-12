import { sendMessage } from "@/services/messageService";
import instanceAxios from "./instanceAxios ";
import { userSendMessage } from "@/interface/message.interface";

const messageApi = {
  getMessages(id: string | undefined, userId: string) {
    const url = `/message/${id}`;
    return instanceAxios.get(url, { params: { userId } });
  },
  sendMessage(id: string, userSendMessageInput: userSendMessage) {
    const url = `/message/send/${id}`;
    return instanceAxios.post(url, userSendMessageInput);
  },
};

export default messageApi;
