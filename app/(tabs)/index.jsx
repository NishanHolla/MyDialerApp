import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { Linking } from "react-native";
import {
  addDigit,
  deleteDigit,
  clearNumber,
  addCallToHistory,
  setCountryCode,
} from "../../store/slices/dialerSlice";
import { RootState } from "../../store/store";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import styles from "../styles/dialerStyle";
import countryCodes from "../utils/countryCodes";
import dialPadButtons from "../utils/dialpadButtons";

export default function DialPadScreen() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(
    (state: RootState) => state.dialer.phoneNumber
  );
  const countryCode = useSelector(
    (state: RootState) => state.dialer.countryCode
  );
  const router = useRouter();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "button");
  const callColor = useThemeColor({}, "primary");

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      dispatch(addCallToHistory());
      const phoneNumberWithCode = `${countryCode}${phoneNumber}`;
      Linking.openURL(`tel:${phoneNumberWithCode}`);
    }
  };  

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      {/* Country Code Picker */}
      <Picker
        selectedValue={countryCode}
        onValueChange={(itemValue) => dispatch(setCountryCode(itemValue))}
        style={[styles.picker, { color: textColor }]}
      >
        {countryCodes.map((country) => (
          <Picker.Item
            key={country.code}
            label={`${country.label} (${country.code})`}
            value={country.code}
          />
        ))}
      </Picker>

      {/* Display Dialed Number */}
      <Text style={[styles.phoneNumber, { color: textColor }]}> 
        {countryCode} {phoneNumber || "Enter Number"} 
      </Text>

      {/* Dial Pad */}
      <View style={styles.dialPad}>
        {dialPadButtons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.button, { backgroundColor: buttonColor }]}
                onPress={() => dispatch(addDigit(num))}
              >
                <Text style={[styles.buttonText, { color: textColor }]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: buttonColor }]}
          onPress={() => dispatch(deleteDigit())}
        >
          <Text style={[styles.controlText, { color: textColor }]}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.callButton, { backgroundColor: callColor }]}
          onPress={handleCall}
        >
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: buttonColor }]}
          onPress={() => dispatch(clearNumber())}
        >
          <Text style={[styles.controlText, { color: textColor }]}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}