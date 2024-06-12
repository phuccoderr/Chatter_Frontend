import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToastMessage } from "@/hooks/useMessage";
import { login } from "@/services/authService";
import { createUser } from "@/services/usersService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { toastLoading, toastSuccess, toastError } = useToastMessage();
  const mutateCreate = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toastSuccess("Đăng ký thành công");
      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      toastError(error.message);
    },
  });

  const handleRegister = () => {
    toastLoading("Đang đăng ký...");
    mutateCreate.mutate({ email, password });
  };

  const mutateLogin = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toastSuccess("Đăng nhập thành công");
      setEmail("");
      setPassword("");
      navigate("/");
    },
    onError: (error) => {
      toastError(error.message);
    },
  });

  const handleLogin = () => {
    toastLoading("Đang đăng nhập...");
    mutateLogin.mutate({ email, password });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        APP CHATS
      </h2>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-600">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleLogin}
                className="w-full bg-white text-black hover:bg-slate-400"
              >
                LOGIN
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleRegister}
                className="w-full bg-white text-black hover:bg-slate-400"
              >
                REGISTER
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
