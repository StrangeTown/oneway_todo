import { TouchableOpacity, View } from "react-native"
import { Text } from "./Themed"
import { StyleSheet } from "react-native"
import { TodoItem } from "../types"

interface AddButtonProps {
  onPress: () => void
}
export const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.addButton]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  )
}

interface TodoListItemProps {
  item: TodoItem
  isActive: boolean
  onPress: () => void
}
export function TodoListItem({ item, isActive, onPress }: TodoListItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        item.isImportant && styles.isImportant,
        item.isUrgent && styles.isUrgent,
        item.isImportant && item.isUrgent && styles.importantAndUrgent,
        isActive && styles.isActive,
      ]}
    >
      {/* <Text>{item?.name}</Text> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  isActive: {
    shadowOpacity: 0.1,
    shadowRadius: 1,
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 14,
    color: "#595a5c",
  },
  container: {
    width: 36,
    height: 36,
    backgroundColor: "#cdd5d5",
    borderRadius: 100,
    marginHorizontal: 6,
    marginVertical: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderColor: "#fff",
    borderWidth: 6,
  },
  addButton: {
    backgroundColor: "#fff",
  },
  isImportant: {
    backgroundColor: "#f5d76e",
  },
  isUrgent: {
    backgroundColor: "#ec6d71",
  },
  importantAndUrgent: {
    // gradient
    backgroundColor: "#595a5c",
  },
})
