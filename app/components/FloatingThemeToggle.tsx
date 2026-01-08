import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { LightColors, DarkColors } from "../constants/colors";

export default function FloatingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const Colors =
    resolvedTheme === "dark" ? DarkColors : LightColors;

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.container,
        { backgroundColor: Colors.card },
      ]}
    >
      <Text style={styles.icon}>
        {resolvedTheme === "dark" ? "☀️" : "🌙"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 20,

    width: 48,
    height: 48,
    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // elevation (Android)
    elevation: 6,
  },
  icon: {
    fontSize: 22,
  },
});
