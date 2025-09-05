import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, SafeAreaView, Alert, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import TodoItem from "./components/TodoItem";
import { api } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setBusy(true);
      const data = await api("/todos");
      setTodos(data);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setBusy(false);
    }
  }

  async function addTodo() {
    if (!title.trim()) return;
    try {
      setBusy(true);
      const created = await api("/todos", { method: "POST", body: JSON.stringify({ title: title.trim() }) });
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggle(todo) {
    try {
      const updated = await api(`/todos/${todo._id}`, { method: "PATCH", body: JSON.stringify({ completed: !todo.completed }) });
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function remove(todo) {
    try {
      await api(`/todos/${todo._id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
      <View style={styles.container}>
        <Text style={styles.h1}>Todos</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Add a new todo..."
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            editable={!busy}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable style={[styles.btn, busy && styles.btnDisabled]} onPress={addTodo} disabled={busy}>
            <Text style={styles.btnTxt}>Add</Text>
          </Pressable>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoItem todo={item} onToggle={() => toggle(item)} onDelete={() => remove(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshing={busy}
          onRefresh={load}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  row: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  btn: { backgroundColor: "#111827", paddingHorizontal: 16, borderRadius: 10, justifyContent: "center" },
  btnDisabled: { opacity: 0.5 },
  btnTxt: { color: "#fff", fontWeight: "600" },
  sep: { height: 1, backgroundColor: "#e5e7eb" },
});
