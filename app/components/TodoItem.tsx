import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { Todo } from "../types/todo";
import { LightColors, DarkColors } from "../constants/colors";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  if (!todo) return null;

  const scheme = useColorScheme();
  const Colors = scheme === "dark" ? DarkColors : LightColors;

  function getCategoryColor() {
    switch (todo.category) {
      case "Work":
        return Colors.work;
      case "Study":
        return Colors.study;
      case "Personal":
        return Colors.personal;
    }
  }

  const styles = StyleSheet.create({
    item: {
      backgroundColor: Colors.card,
      padding: 16,
      borderRadius: 14,
      marginBottom: 12,
    },
    text: {
      fontSize: 16,
      color: Colors.text,
    },
    completed: {
      textDecorationLine: "line-through",
      color: Colors.muted,
    },
    badge: {
      marginTop: 6,
      alignSelf: "flex-start",
      backgroundColor: getCategoryColor(),
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
    deleteBox: {
      backgroundColor: "#EF4444",
      justifyContent: "center",
      alignItems: "center",
      width: 90,
      borderRadius: 14,
      marginBottom: 12,
    },
    deleteText: {
      color: "#fff",
      fontWeight: "700",
    },
  });

  return (
    <Swipeable
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
        <Text
          onPress={() => onToggle(todo.id)}
          style={[
            styles.text,
            todo.completed && styles.completed,
          ]}
        >
          {todo.title}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{todo.category}</Text>
        </View>
      </View>
    </Swipeable>
  );
}
