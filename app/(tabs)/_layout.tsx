import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import {store} from "@/store/store"; 

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen name="dialer" options={{ title: "Dial Pad" }} />
        <Tabs.Screen name="history" options={{ title: "Call History" }} />
        <Tabs.Screen name="contacts" options={{ title: "Contacts" }} />
      </Tabs>
    </Provider>
  );
}
