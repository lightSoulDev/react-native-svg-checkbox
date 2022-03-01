import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SvgCheckbox from "./src/SvgCheckbox";

export default function App() {
  const [checked, setCheked] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <SvgCheckbox
        checked={checked}
        checkmarkColor="#2c2c2c"
        outlineColor="#2c2c2c"
        fillColor="#7850A8"
      />
      <Text
        style={styles.check}
        onPress={() => {
          setCheked(!checked);
        }}
      >
        CHECK
      </Text>
      <View style={{ height: 100 }}></View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  check: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
