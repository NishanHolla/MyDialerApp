import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Appearance } from "react-native";

export function useColorScheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load theme from storage
    AsyncStorage.getItem("theme").then((storedTheme) => {
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme(Appearance.getColorScheme() ?? "light");
      }
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
}
