import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { Category } from "../types/todo";
import { useTheme } from "../context/ThemeContext";
import { LightColors, DarkColors } from "../constants/colors";

interface Props {
  onAdd: (text: string, category: Category) => void;
}

const categories: Category[] = ["Work", "Study", "Personal"];

export default function TodoInput({ onAdd }: Props) {
  const { resolvedTheme } = useTheme();
  const Colors = resolvedTheme === "dark" ? DarkColors : LightColors;

  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("Work");

  function handleAdd() {
    if (!text.trim()) return;
    onAdd(text, category);
    setText("");
  }

  const styles = StyleSheet.create({
    input: {
      backgroundColor: Colors.card,
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      marginBottom: 10,
      color: Colors.text,
    },
    row: {
      flexDirection: "row",
      marginBottom: 10,
    },
    chip: {
      flex: 1,
      padding: 8,
      borderRadius: 6,
      alignItems: "center",
      marginHorizontal: 4,
      backgroundColor: Colors.card,
    },
    chipSelected: {
      backgroundColor: Colors.muted,
    },
    addBtn: {
      backgroundColor: Colors.primary,
      padding: 14,
      borderRadius: 10,
      alignItems: "center", 
    },
    addText: {
      color: "#000",
      fontWeight: "600",
    },
  });

  return (
    <View>
      <TextInput
        placeholder="New note"
        placeholderTextColor={Colors.muted}
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <View style={styles.row}>
        {categories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[
              styles.chip,
              category === c && styles.chipSelected,
            ]}
          >
            <Text>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={handleAdd} style={styles.addBtn}>
        <Text style={styles.addText}>Add</Text>
      </Pressable>
    </View>
  );
}
