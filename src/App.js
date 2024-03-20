import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CookiesProvider, useCookies } from "react-cookie";
import LoginForm from "./components/loginSchool/loginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Exams from "./components/Exams/Exams";

import { createContext, useEffect, useState } from "react";
const UserContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [menuSide, setMenuSide] = useState([]);
  const [menuMain, setMenuMain] = useState([]);
  const [cookies, setCookie] = useCookies(["JSESSIONID"]);

  return (
    <div className="App">
      <CookiesProvider>
        <UserContext.Provider
          value={{
            user: [user, setUser],
            menuSide: [menuSide, setMenuSide],
            menuMain: [menuMain, setMenuMain],
            cookies: [cookies, setCookie],
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/exams" element={<Exams />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </CookiesProvider>
    </div>
  );
}

export { App, UserContext };
