import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView(props: View["props"]) {
  const backgroundColor = useThemeColor({}, "background");
  return <View {...props} style={[props.style, { backgroundColor }]} />;
}
