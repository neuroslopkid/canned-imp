import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ApiUrl } from "@api/base";
import { BaseLayout } from "@shared/ui/layout/base-layout";

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
    <BaseLayout>
      <View style={styles.container}>
        <Text>{JSON.stringify(data)}</Text>
        <Button title="Fetch" onPress={fetchData} />
        {loading && <Text>Loading</Text>}
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    rowGap: 50,
  },
});
