import { useGetUsers } from "./services/useLogin";

function App() {
  const data = useGetUsers();
  console.log("data", data);

  return (
    <>
      <h1 className="p-4 pt-2 text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
