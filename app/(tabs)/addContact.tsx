import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addContact } from "../../store/slices/contactsSlice";
import { useRouter } from "expo-router";

export default function AddContactScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSaveContact = () => {
    if (!name || !phoneNumber) {
      Alert.alert("Error", "Both name and phone number are required");
      return;
    }
    dispatch(addContact({ name: name, phone: phoneNumber }));
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Add Contact</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
      />
      <Button title="Save Contact" onPress={handleSaveContact} />
    </View>
  );
}
``
