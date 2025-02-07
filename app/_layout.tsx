import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="dialer/index" options={{ title: "Dial Pad" }} />
      <Tabs.Screen name="history/index" options={{ title: "Call History" }} />
      <Tabs.Screen name="contacts/index" options={{ title: "Contacts" }} />
    </Tabs>
  );
}
