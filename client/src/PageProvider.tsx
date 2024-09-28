import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageContextType {
  currentPage: string;
}

interface PageProviderProps {
  children: ReactNode;
}

const contextValue: PageContextType = { currentPage: "" };
const PageContext = createContext<PageContextType>(contextValue);

const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const route = useLocation();

  useEffect(() => {
    console.log("Location changed:", location.pathname); // Debug log
    switch (route.pathname) {
      case "/":
        setCurrentPage("Home");
        break;
      case "/about":
        setCurrentPage("About");
        break;
      case "/build-maze":
        setCurrentPage("build-maze");
        break;
      default:
        setCurrentPage("");
    }
  }, [route]);

  return (
    <PageContext.Provider value={{ currentPage }}>
      {children}
    </PageContext.Provider>
  );
};

export { PageProvider, PageContext };
