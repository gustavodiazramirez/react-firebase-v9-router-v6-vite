import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import RequireAuth from "./components/RequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/userProvider";
import LayoutContainerForm from "./components/layoutContainerForm";
export const App = () => {
  const { user } = useContext(UserContext);
  if (user === false) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
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
        <Route path="/" element={<LayoutContainerForm/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
