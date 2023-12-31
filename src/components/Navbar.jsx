import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userProvider";

export const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a>
            <span className="mb-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              URLSHORT APP
            </span>
          </a>
          <div className="flex sm:order-2">
            {user ? (
              <>
                <NavLink
                  to="/"
                  className="block sm:py-2 sm:px-3 sm:p-0 mt-1
                   text-gray-900 rounded
                    hover:bg-gray-100 
                    md:hover:bg-transparent
                     md:hover:text-blue-700
                      md:dark:hover:text-blue-500
                       dark:text-white dark:hover:bg-gray-700
                        dark:hover:text-white md:dark:hover:bg-transparent
                         dark:border-gray-700"
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/perfil"
                  className="block sm:py-2 sm:px-3 sm:p-0 mt-1
                   text-gray-900 rounded
                    hover:bg-gray-100 
                    md:hover:bg-transparent
                     md:hover:text-blue-700
                      md:dark:hover:text-blue-500
                       dark:text-white dark:hover:bg-gray-700
                        dark:hover:text-white md:dark:hover:bg-transparent
                         dark:border-gray-700"
                >
                  Perfil
                </NavLink>
                <span className="mx-10"></span>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleClickLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Inicio de sesión
                </NavLink>
                <span className="mx-10"></span>
                <NavLink
                  to="/register"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Registro de usuario
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
