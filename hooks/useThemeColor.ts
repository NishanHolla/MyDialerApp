import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/ThemeProvider"; // Use the new ThemeProvider

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useTheme(); // Use the shared theme
  return props[theme] ?? Colors[theme][colorName];
}
