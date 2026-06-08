import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ApiUrl } from "@api/base";
import { TestLayout } from "@ui/layout/test-layout";

export const MainScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch(`${ApiUrl}`)
      .then(async (res) => setData(await res.json()))
      .finally(() => setLoading(false));
  };

  return (
    <TestLayout>
      <View style={styles.container}>
        <Text>{JSON.stringify(data)}</Text>
        <Button title="Fetch" onPress={fetchData} />
        {loading && <Text>Loading... {ApiUrl}</Text>}
      </View>
    </TestLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    rowGap: 50,
  },
});
