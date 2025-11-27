import AppContext from "../context/AppContext";
import { useContext } from "react";

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
};
