"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@mui/material";
import { themes } from "@/theme/theme";
import { useAuth } from "./AuthContext"; 

export type ThemeKey = keyof typeof themes;

type ThemeContextType = {
  currentTheme: Theme;
  themeName: ThemeKey;
  setThemeName: (name: ThemeKey) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth(); 
  const [themeName, setThemeName] = useState<ThemeKey>("bloodMoon");

  useEffect(() => {
    if (userData?.themeName && Object.keys(themes).includes(userData.themeName)) {
      setThemeName(userData.themeName as ThemeKey);
    }
  }, [userData]);

  return (
    <ThemeContext.Provider value={{ currentTheme: themes[themeName], themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeCustom must be used inside ThemeProviderCustom");
  return context;
};
