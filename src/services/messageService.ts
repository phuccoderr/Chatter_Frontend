import messageApi from "@/api/messageApi";
import { userSendMessage } from "@/interface/message.interface";

export const getMessage = async (id: string | undefined, userId: string) => {
  try {
    const response = await messageApi.getMessages(id, userId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async ({
  id,
  data,
}: {
  id: string;
  data: userSendMessage;
}) => {
  try {
    const response = await messageApi.sendMessage(id, data);
    return response;
  } catch (error) {
    throw error;
  }
};
