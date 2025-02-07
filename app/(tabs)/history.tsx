import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function HistoryScreen() {
  const callHistory = useSelector((state: RootState) => state.dialer.callHistory);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Call History</Text>
      {callHistory.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No call history yet.</Text>
      ) : (
        <FlatList
          data={callHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18, padding: 10, borderBottomWidth: 1 }}>{item}</Text>
          )}
        />
      )}
    </View>
  );
}
