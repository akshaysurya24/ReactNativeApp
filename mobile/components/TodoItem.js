import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onToggle} style={[styles.checkbox, todo.completed && styles.checked]} />
      <Text style={[styles.title, todo.completed && styles.done]} numberOfLines={2}>
        {todo.title}
      </Text>
      <Pressable onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteTxt}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 12,
  },
  checked: { backgroundColor: "#999" },
  title: { flex: 1, fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#666" },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 4 },
  deleteTxt: { fontSize: 18 },
});
