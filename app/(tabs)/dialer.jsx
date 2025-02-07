import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDigit, deleteDigit, clearNumber } from "../../store/slices/dialerSlice";
import { RootState } from "../../store/store";
import { useRouter } from "expo-router";

export default function DialPadScreen() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state: RootState) => state.dialer.phoneNumber);
  const router = useRouter();

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      router.push("/history"); // Simulate navigation to history after call
    }
  };

  const dialPadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  return (
    <View style={styles.container}>
      {/* Display Dialed Number */}
      <Text style={styles.phoneNumber}>{phoneNumber || "Enter Number"}</Text>

      {/* Dial Pad */}
      <View style={styles.dialPad}>
        {dialPadButtons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.button}
                onPress={() => dispatch(addDigit(num))}
              >
                <Text style={styles.buttonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => dispatch(deleteDigit())}>
          <Text style={styles.controlText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => dispatch(clearNumber())}>
          <Text style={styles.controlText}>Clear</Text>
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
    backgroundColor: "#f5f5f5",
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    margin: 10,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  controlButton: {
    padding: 15,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  callButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  callText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
