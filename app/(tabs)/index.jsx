import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addDigit,
  deleteDigit,
  clearNumber,
  addCallToHistory,
} from "../../store/slices/dialerSlice";
import { RootState } from "../../store/store";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

export default function DialPadScreen() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(
    (state: RootState) => state.dialer.phoneNumber
  );
  const router = useRouter();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "button");
  const callColor = useThemeColor({}, "primary");

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      dispatch(addCallToHistory());
      // router.push("/history");
    }
  };

  const dialPadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Display Dialed Number */}
      <Text style={[styles.phoneNumber, { color: textColor }]}>
        {phoneNumber || "Enter Number"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dialPad: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  controlButton: {
    padding: 15,
    borderRadius: 10,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  callButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  callText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
