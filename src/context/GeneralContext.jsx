import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GeneralContext = createContext();

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralContextProvider");
  }
  return context;
};

export const GeneralContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const value = {
    loading,
    setLoading,
  };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};

export default GeneralContext;
