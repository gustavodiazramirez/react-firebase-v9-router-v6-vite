import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import RequireAuth from "./components/RequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/userProvider";
export const App = () => {
  
  const { user } = useContext(UserContext);
  if (user === false) {
    return <h1>Loading...</h1>;
  } 

  return (
    <>
      <h1>APP</h1>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
export default App;
