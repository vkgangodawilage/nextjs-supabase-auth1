"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    checkUser();
    fetchTodos();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    }
  }

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTodos(data);
    }
  }

  async function addTodo() {
    if (!text.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("todos").insert({
      text,
      user_id: user?.id,
    });

    if (!error) {
      setText("");
      fetchTodos();
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    await supabase
      .from("todos")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    fetchTodos();
  }

  async function deleteTodo(id: string) {
    await supabase.from("todos").delete().eq("id", id);

    fetchTodos();
  }

  async function logout() {
    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-10">
      <div className="w-full max-w-xl">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Todo App
          </h1>

          <button
            onClick={logout}
            className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700"
          >
            Logout
          </button>
        </div>

        
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={addTodo}
            className="bg-white text-black px-6 rounded-xl font-semibold"
          >
            Add
          </button>
        </div>

        
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleTodo(todo.id, todo.completed)
                  }
                />

                <p
                  className={
                    todo.completed
                      ? "line-through text-zinc-500"
                      : ""
                  }
                >
                  {todo.text}
                </p>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}