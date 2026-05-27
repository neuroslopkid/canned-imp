import { Tag } from "@ui/tag";
import { View, Text, StyleSheet } from "react-native";

export const ViewsCube = () => {
  return (
    <>
      <View>
        <Text>
          {Tag("View")} is a div-alike component. You <Text style={{ fontWeight: "bold", color: "red" }}>HAVE</Text> to predefine it's size to prevent children
          from overflowing and it's children must be of a portion of parent size (not exceeds it).
        </Text>
      </View>

      <View style={styles.viewDemoContainer}>
        <View style={{ ...{ backgroundColor: "red", width: "25%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>1</Text>
        </View>
        <View style={{ ...{ backgroundColor: "green", width: "60%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>2</Text>
        </View>
        <View style={{ ...{ backgroundColor: "blue", width: "15%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>3</Text>
        </View>
        <View style={{ ...{ backgroundColor: "yellow", width: "15%" }, ...styles.viewDemoItem }}>
          <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>4</Text>
        </View>
        <View style={{ ...{ backgroundColor: "purple", width: "70%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>5</Text>
        </View>
        <View style={{ ...{ backgroundColor: "cyan", width: "15%" }, ...styles.viewDemoItem }}>
          <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>6</Text>
        </View>
        <View style={{ ...{ backgroundColor: "magenta", width: "50%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>7</Text>
        </View>
        <View style={{ ...{ backgroundColor: "gold", width: "25%" }, ...styles.viewDemoItem }}>
          <Text style={styles.viewDemoItemText}>8</Text>
        </View>
        <View style={{ ...{ backgroundColor: "ivory", width: "25%" }, ...styles.viewDemoItem }}>
          <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>9</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewDemoContainer: {
    flexDirection: "row",
    width: 100,
    height: 100,
    flexWrap: "wrap",
  },
  viewDemoItem: {
    height: "33.33%",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDemoItemText: {
    color: "white",
  },
});
