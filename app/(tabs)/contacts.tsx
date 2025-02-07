import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSearchQuery } from "../../store/slices/contactsSlice";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";

export default function ContactsScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const searchQuery = useSelector(
    (state: RootState) => state.contacts.searchQuery
  );

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: textColor }}>
        Contacts
      </Text>
      <TextInput
        placeholder="Search contacts..."
        placeholderTextColor={backgroundColor === "#121212" ? "#BBB" : "#555"} // Lighter color for dark mode
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          borderColor: textColor,
          backgroundColor: backgroundColor === "#121212" ? "#333" : "white",
          color: textColor,
        }}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              borderBottomWidth: 1,
              color: textColor,
            }}
          >
            {item.name} - {item.phone}
          </Text>
        )}
      />
      <TouchableOpacity
        onPress={() => router.push("/addContact")}
        style={{
          backgroundColor: useThemeColor({}, "primary"),
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
