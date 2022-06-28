import React, { createContext, useState } from "react";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";

import Cart from "./Pages/Cart";
import Main from "./Pages/Main";
import NotFoundPage from "./Pages/NotFoundPage";
import "./scss/app.scss";

export const AppContext = createContext({});

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Main searchValue={searchValue} />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
