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
      {
        item.isImportant && item.isUrgent && (

          // half is urgent color and half is important color
          <View style={styles.importantAndUrgentIcon} >
            <View style={styles.importantAndUrgentIconLeft} />
          </View>
        )
      }
      {/* <Text>{item?.name}</Text> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  importantAndUrgentIcon: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#ec6d71",
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  importantAndUrgentIconLeft: {
    width: 12,
    height: 24,
    backgroundColor: "#f5d76e",
    position: "absolute",
    top: 0,
    left: 0,
  },
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
    position: "relative",
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
    // backgroundColor: "#595a5c",
    // backgroundColor: "rgb(245,215,110)",
    backgroundColor: "linear-gradient(53deg, rgba(245,215,110,1) 9%, rgba(236,109,113,1) 100%)",

  },
})
