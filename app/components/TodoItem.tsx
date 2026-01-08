import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { Todo } from "../types/todo";
import { useTheme } from "../context/ThemeContext";
import { LightColors, DarkColors } from "../constants/colors";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onSave: (id: string) => void;
  editingId: string | null;
  editingText: string;
  setEditingText: (text: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  editingId,
  editingText,
  setEditingText,
}: Props) {
  const { resolvedTheme } = useTheme();
  const Colors = resolvedTheme === "dark" ? DarkColors : LightColors;

  const isEditing = editingId === todo.id;

  function getCategoryColor() {
    switch (todo.category) {
      case "Work":
        return Colors.work;
      case "Study":
        return Colors.study;
      case "Personal":
        return Colors.personal;
      default:
        return Colors.card;
    }
  }

  const styles = StyleSheet.create({
    item: {
      backgroundColor: Colors.card,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    text: {
      fontSize: 16,
      color: Colors.text,
    },
    completed: {
      textDecorationLine: "line-through",
      color: Colors.muted,
    },
    editInput: {
      fontSize: 16,
      color: Colors.text,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
      paddingVertical: 2,
    },
    badge: {
      marginTop: 6,
      alignSelf: "flex-start",
      backgroundColor: getCategoryColor(),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    badgeText: {
      fontSize: 11,
      color: Colors.text,
      fontWeight: "500",
    },
    deleteBox: {
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      borderRadius: 10,
      marginBottom: 10,
    },
    deleteText: {
      color: "#000",
      fontWeight: "600",
    },
  });

  return (
    <Swipeable
      enabled={!isEditing}
      renderRightActions={() => (
        <View style={styles.deleteBox}>
          <Text
            style={styles.deleteText}
            onPress={() => onDelete(todo.id)}
          >
            Delete
          </Text>
        </View>
      )}
    >
      <View style={styles.item}>
        {isEditing ? (
          <TextInput
            value={editingText}
            onChangeText={setEditingText}
            autoFocus
            onSubmitEditing={() => onSave(todo.id)}
            style={styles.editInput}
            returnKeyType="done"
          />
        ) : (
          <Text
            onPress={() => onEdit?.(todo)}
            onLongPress={() => onToggle(todo.id)}
            style={[
              styles.text,
              todo.completed && styles.completed,
            ]}
          >
            {todo.title}
          </Text>
        )}

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{todo.category}</Text>
        </View>
      </View>
    </Swipeable>
  );
}
