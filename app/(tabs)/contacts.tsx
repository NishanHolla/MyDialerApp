import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSearchQuery } from "../../store/slices/contactsSlice";
import { useRouter } from "expo-router";

export default function ContactsScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const searchQuery = useSelector((state: RootState) => state.contacts.searchQuery);

  // Ensure `contacts` is an array before filtering
  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Contacts</Text>
      <TextInput
        placeholder="Search contacts..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, padding: 10, borderBottomWidth: 1 }}>
            {item.name} - {item.phone}
          </Text>
        )}
      />
      <TouchableOpacity
        onPress={() => router.push("/addContact")}
        style={{
          backgroundColor: "blue",
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
