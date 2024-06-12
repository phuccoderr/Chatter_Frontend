import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import { WebsocketProvider, socket } from "./utils/websocket";

function App() {
  // const data = useGetUsers();
  // console.log("data", data);

  return (
    <WebsocketProvider value={socket}>
      <div className="h-screen bg-black">
        <div className="container">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" Component={Home} />
              <Route path="/:chatId" Component={Home} />
            </Route>
            <Route path="/login" Component={Login} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </WebsocketProvider>
  );
}

export default App;
