import { useEffect, useState } from "react";

export const useThemeColor = () => {
  const [themeColor, setThemeColor] = useState("hsl(210, 100%, 85%)");

  useEffect(() => {
    const savedThemeColor = localStorage.getItem("theme-color");
    if (savedThemeColor) {
      setThemeColor(savedThemeColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme-color", themeColor);

    const [h, s, l] = themeColor.match(/\d+(\.\d+)?/g)?.map(Number) || [
      0, 0, 0,
    ];
    document.documentElement.style.setProperty(
      "--theme-color",
      `${h} ${s}% ${l}%`
    );
  }, [themeColor]);

  return { themeColor, setThemeColor };
};
