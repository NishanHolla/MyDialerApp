import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSearchQuery,
  blockContact,
  unblockContact,
  setContacts,
} from "../../store/slices/contactsSlice";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import axios from "axios";

const fetchGoogleContacts = async (accessToken) => {
  try {
    const contactsResponse = await axios.get("https://people.googleapis.com/v1/people/me/connections", {
      params: {
        personFields: "names,phoneNumbers",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const contacts = contactsResponse.data.connections?.map((connection) => ({
      id: connection.resourceName,
      name: connection.names?.[0]?.displayName || "No Name",
      phone: connection.phoneNumbers?.[0]?.value || "No Phone Number",
      countryCode: connection.phoneNumbers?.[0]?.canonicalForm.split(" ")[0] || "+1",
    }));

    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export default function ContactsScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const blockedContacts = useSelector(
    (state: RootState) => state.contacts.blockedContacts
  );
  const searchQuery = useSelector(
    (state: RootState) => state.contacts.searchQuery
  );

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const { promptAsync } = useGoogleAuth(async (accessToken) => {
    const contacts = await fetchGoogleContacts(accessToken);
    dispatch(setContacts(contacts));
  });

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
        placeholderTextColor={backgroundColor === "#121212" ? "#BBB" : "#555"}
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
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.countryCode}${item.phone}`)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: textColor,
            }}
          >
            <Text style={{ fontSize: 18, color: textColor }}>
              {item.name} - {item.countryCode} {item.phone}
            </Text>
            {blockedContacts.includes(item.id) ? (
              <TouchableOpacity
                onPress={() => dispatch(unblockContact(item.id))}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Unblock</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => dispatch(blockContact(item.id))}
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Block</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => promptAsync()} // Trigger OAuth prompt
        style={{
          backgroundColor: useThemeColor({}, "primary"),
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Fetch Contacts</Text>
      </TouchableOpacity>
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
