import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { LightColors, DarkColors } from "../constants/colors";

export default function FloatingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const Colors =
    resolvedTheme === "dark" ? DarkColors : LightColors;

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Pressable
      onPress={toggle}
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
    bottom: 20,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.85,
  },
  icon: {
    fontSize: 18,
  },
});
