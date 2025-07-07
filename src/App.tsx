import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Routes";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  return (
    <>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
