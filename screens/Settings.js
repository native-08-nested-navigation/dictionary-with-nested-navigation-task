import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { COLORS, COLORS_LIGHT } from "../constants";

export default function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleSwitch = () => setIsDarkTheme((previousState) => !previousState);

  const currentColors = isDarkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View style={[styles.container, { backgroundColor: currentColors.appBackground }]}>
      <View style={[styles.row, { backgroundColor: currentColors.appBackground }]}>
        <Text style={[styles.text, { color: currentColors.fontMain }]}>
          Choose color theme:
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: currentColors.primary900 }}
          thumbColor={isDarkTheme ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkTheme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
  },
});