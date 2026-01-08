export type Category = "work" | "personal" | "study" | "others";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
}
