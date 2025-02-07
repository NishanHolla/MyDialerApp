import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function HistoryScreen() {
  const callHistory = useSelector((state: RootState) => state.dialer.callHistory);

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
        Call History
      </ThemedText>
      {callHistory.length === 0 ? (
        <ThemedText style={{ marginTop: 20 }}>No call history yet.</ThemedText>
      ) : (
        <FlatList
          data={callHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ThemedText style={{ fontSize: 18, padding: 10, borderBottomWidth: 1 }}>
              {item}
            </ThemedText>
          )}
        />
      )}
    </ThemedView>
  );
}
