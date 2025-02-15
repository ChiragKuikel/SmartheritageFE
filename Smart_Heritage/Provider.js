import React, { createContext, useContext, useState } from "react";

// Create Context
export const MyContext = createContext();

// Provider with Multiple States
const MyProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [voice, setVoice] = useState(false);

  return (
    <MyContext.Provider value={{ name, setName, voice, setVoice }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;