"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();

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
    const { data } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTodos(data);
  }

  async function addTodo() {
    if (!text) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("todos").insert({
      text,
      user_id: user?.id,
    });

    setText("");
    fetchTodos();
  }

  async function toggleTodo(id: string, completed: boolean) {
    await supabase
      .from("todos")
      .update({ completed: !completed })
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Todos</h1>

          <button
            onClick={logout}
            className="bg-zinc-800 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo..."
            className="flex-1 bg-zinc-900 p-4 rounded-xl outline-none"
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
              className="bg-zinc-900 p-4 rounded-xl flex justify-between items-center"
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
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {todo.text}
                </p>
              </div>

              <button onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}