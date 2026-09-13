import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";
import { Button } from "./components/ui/button";
import { Spinner } from "./components/ui/spinner";

import { api } from "./api/client"

import { useState, useEffect } from "react";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

// export function App() {
//   return (
//     <div className="container mx-auto p-8 text-center relative z-10">
//       <div className="flex justify-center items-center gap-8 mb-8">
//         <img
//           src={logo}
//           alt="Bun Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
//         />
//         <img
//           src={reactLogo}
//           alt="React Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
//         />
//       </div>
//       <Card>
//         <CardHeader className="gap-4">
//           <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
//           <CardDescription>
//             Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
//             test HMR
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <APITester />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export function App() {

  const [message, setMessage] = useState("");
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(()=>{
    api.get("/getDateTime")
    .then(data => {
    if (data) {
      console.log(`Info is ${data["message"]}`)
      setMessage(data["message"]);
      setDataIsLoaded(true);
    }
  }
  ).catch(error=>{
    console.log(error)
    setDataIsLoaded(false)
  }
  )
  }, [])

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async function updateMessage(){
    setUpdateStatus(true);
    try {
      const data = await api.get("/getDateTime");

      if (data && data.message) {
        console.log(`Info need to get updated ${data.message}`);
        await sleep(2000);
        setMessage(data.message);
        setUpdateStatus(false);
      }
    } catch (error) {
      console.error(error);
      setDataIsLoaded(false);
    } 
  }

  if (!dataIsLoaded) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Spinner className="size-6 text-red-400" />
        <h1>Loading, the data</h1>
      </div>
    )
  }
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
        <div className="m-1 p-6 border-2 border-green-200 border-solid rounded-2xl flex justify-center items-center gap-2 bg-gray-200">
          <Button onClick={updateMessage}>Update Time</Button>
          <h1 className="w-60 h-10 border-2 border-solid border-red-200 p-2 rounded-2xl bg-gray-100 flex justify-center items-center">{updateStatus ? <Spinner />: message}</h1>
        </div>
    </div>
  )
}
export default App;
