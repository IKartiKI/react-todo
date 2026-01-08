import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { Category } from "../types/todo";
import { LightColors, DarkColors } from "../constants/colors";

interface Props {
  onAdd: (text: string, category: Category) => void;
}

const categories: Category[] = ["Work", "Study", "Personal"];

export default function TodoInput({ onAdd }: Props) {
  const scheme = useColorScheme();
  const Colors = scheme === "dark" ? DarkColors : LightColors;

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
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      marginBottom: 12,
      color: Colors.text,
    },
    categoryRow: {
      flexDirection: "row",
      marginBottom: 12,
    },
    category: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: Colors.muted,
    },
    selectedCategory: {
      backgroundColor: Colors.primary,
    },
    categoryText: {
      color: Colors.text,
    },
    selectedText: {
      color: "#fff",
      fontWeight: "600",
    },
    addBtn: {
      backgroundColor: Colors.primary,
      padding: 16,
      borderRadius: 14,
      alignItems: "center",
    },
    addText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
  });

  return (
    <View>
      <TextInput
        placeholder="Add a new task..."
        placeholderTextColor={Colors.muted}
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <View style={styles.categoryRow}>
        {categories.map((cat) => {
          const selected = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[
                styles.category,
                selected && styles.selectedCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selected && styles.selectedText,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>Add Task</Text>
      </Pressable>
    </View>
  );
}
