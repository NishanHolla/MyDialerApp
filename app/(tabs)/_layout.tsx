import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useTheme, ThemeProvider } from "@/hooks/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { View, Switch, Text } from "react-native";

function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#121212" : "white",
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: theme === "dark" ? "#121212" : "white",
        },
        headerTitleStyle: {
          color: theme === "dark" ? "white" : "black",
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 15,
            }}
          >
            <Text
              style={{
                color: theme === "dark" ? "white" : "black",
                marginRight: 10,
              }}
            >
              {theme.toUpperCase()}
            </Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dial Pad",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addContact"
        options={{
          title: "Add Contact",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function AppLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}
