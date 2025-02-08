import { useState } from "react";
import { View, TextInput, Alert, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addContact } from "../../store/slices/contactsSlice";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Toast from "react-native-toast-message"; // Import the toast library

export default function AddContactScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const buttonColor = useThemeColor({}, "primary");

  const handleSaveContact = () => {
    if (!name || !phoneNumber) {
      Alert.alert("Error", "Both name and phone number are required");
      return;
    }
    dispatch(addContact({ name, phone: phoneNumber }));
    Toast.show({
      type: "success",
      text1: "Contact Added",
      text2: `${name} has been added successfully.`,
    });
    setName(""); // Clear the input fields
    setPhoneNumber("");
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor }}>
      <ThemedText
        style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
      >
        Add Contact
      </ThemedText>

      <TextInput
        placeholder="Name"
        placeholderTextColor={textColor === "#FFFFFF" ? "#BBB" : "#555"}
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor,
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
          color: textColor === "#FFFFFF" ? "white" : "black", // Ensure text is visible in both modes
          backgroundColor: backgroundColor === "#121212" ? "#333" : "white",
        }}
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={textColor === "#FFFFFF" ? "#BBB" : "#555"}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          color: textColor === "#FFFFFF" ? "white" : "black", // Ensure text is visible in both modes
          backgroundColor: backgroundColor === "#121212" ? "#333" : "white",
        }}
      />

      <TouchableOpacity
        onPress={handleSaveContact}
        style={{
          backgroundColor: buttonColor,
          padding: 15,
          borderRadius: 8,
        }}
      >
        <ThemedText
          style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
        >
          Save Contact
        </ThemedText>
      </TouchableOpacity>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}
