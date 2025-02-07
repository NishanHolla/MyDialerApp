import { Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedText(props: Text["props"]) {
  const color = useThemeColor({}, "text");
  return <Text {...props} style={[props.style, { color }]} />;
}
