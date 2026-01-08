import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../types/todo";

const TODO_KEY = "TODOS";

export async function saveTodos(todos: Todo[]) {
  try {
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos));
  } catch (e) {
    console.log("❌ Error saving todos:", e);
  }
}

export async function loadTodos(): Promise<Todo[]> {
  try {
    const data = await AsyncStorage.getItem(TODO_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // defensive check
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (e) {
    console.log("❌ Error loading todos:", e);
    return [];
  }
}
