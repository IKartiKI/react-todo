import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";

import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { Todo, Category } from "./types/todo";
import { saveTodos, loadTodos } from "./utils/storage";
import { LightColors, DarkColors } from "./constants/colors";
import { useTheme } from "./context/ThemeContext";
import FloatingThemeToggle from "./components/FloatingThemeToggle";


export default function Index() {
  //const scheme = useColorScheme();
  //const Colors = scheme === "dark" ? DarkColors : LightColors;
  const { resolvedTheme } = useTheme();
  const Colors = resolvedTheme === "dark" ? DarkColors : LightColors;


  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");


  // Load once
  useEffect(() => {
    async function init() {
      const storedTodos = await loadTodos();
      setTodos(storedTodos);
      setLoaded(true);
    }
    init();
  }, []);

  // Save on change
  useEffect(() => {
    if (!loaded) return;
    saveTodos(todos);
  }, [todos, loaded]);

  function addTodo(title: string, category: Category) {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        completed: false,
        category,
      },
    ]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function startEditing(todo: Todo) {
  setEditingId(todo.id);
  setEditingText(todo.title);
}

function saveEdit(id: string) {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, title: editingText } : todo
    )
  );
  setEditingId(null);
  setEditingText("");
}


  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 50,
      backgroundColor: Colors.background,
    },
    heading: {
      fontSize: 28,
      fontWeight: "800",
      color: Colors.text,
      marginBottom: 16,
    },
    empty: {
      textAlign: "center",
      marginTop: 60,
      fontSize: 16,
      color: Colors.muted,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>My Tasks 📝</Text>

        <TodoInput onAdd={addTodo} />

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item ? (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEditing}     // ✅ THIS WAS MISSING
                onSave={saveEdit}         // ✅ REQUIRED FOR EDIT
                editingId={editingId}
                editingText={editingText}
                setEditingText={setEditingText}
              />
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No tasks yet 👀</Text>
          }
        />
      </View>

      {/* 🌙☀️ Floating Toggle */}
      <FloatingThemeToggle />
    </View>
  );
}
