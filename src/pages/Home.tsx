import Header from "@/components/common/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToastMessage } from "@/hooks/useMessage";
import { userSendMessage } from "@/interface/message.interface";
import { User } from "@/interface/users.interface";
import { getMessage, sendMessage } from "@/services/messageService";
import { getUsers } from "@/services/usersService";
import { optionsQuery } from "@/utils/options-query";
import { TokenUtils } from "@/utils/token-utils";
import { WebsocketContext } from "@/utils/websocket";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<userSendMessage[]>([]);
  const { chatId } = useParams();
  const socket = useContext(WebsocketContext);

  //me
  const info: User = TokenUtils.getInfo();
  const meId = info._id;

  const { toastLoading, toastSuccess, toastError } = useToastMessage();

  const options = optionsQuery;
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    ...options,
  });
  const users = data?.data;

  const { data: dataMess } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessage(chatId, meId),
    ...options,
  });

  useEffect(() => {
    setMessages(dataMess?.data.messages);
  }, [dataMess]);

  useEffect(() => {
    socket.on("connect", () => {
      toastSuccess("Kết nối websocket thành công");
    });
    socket.on("onMessage", (data: userSendMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const mutateSend = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toastSuccess("Gửi tin nhắn thành công");
    },
    onError: (error) => {
      toastError(error.message);
    },
  });

  const handleSendMessage = async () => {
    const messageInput: userSendMessage = { userId: meId, message: message };
    socket.emit("sendMessages", { id: chatId, message: messageInput });
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex flex-col border border-red-500">
          {users &&
            users
              .filter((user: User) => user._id !== meId)
              .map((user: User) => (
                <Link to={`/${user._id}`} key={user._id}>
                  <div className="flex cursor-pointer items-center gap-4 text-white">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{user.email}</h1>
                  </div>
                </Link>
              ))}
        </div>
        {/* Chat */}
        {chatId ? (
          <div className="mx-4 flex h-full min-h-[50vh] w-full flex-col justify-self-end rounded-xl bg-slate-300">
            <div className="mt-auto w-[100%]">
              {messages &&
                messages.map((m) => (
                  <div
                    className={`p-2 ${m.senderId === meId ? "text-end" : ""}`}
                  >
                    {m.message}
                  </div>
                ))}
              <div className="flex w-[100%]">
                <Input
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Email"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="ml-auto gap-1.5 bg-white"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>Chọn bạn để nhắn tin </div>
        )}
      </div>
    </>
  );
};

export default Home;
