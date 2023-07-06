// active todo item
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { selectItems } from "../slices/itemsSlice"
import { useAppSelector } from "../hooks/reduxHooks"

interface ActiveTodoItemProps {
  itemId: string | undefined
  onRemoveClick: () => void
}
export default function ActiveTodoItem({
  itemId,
  onRemoveClick,
}: ActiveTodoItemProps) {
  const items = useAppSelector(selectItems)
  const item = items.find((item) => item.id === itemId)
  const name = item?.name

  const handleRemove = () => {
    onRemoveClick()
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>No item yet
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.itemName}>{name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  notFound: {
    fontSize: 16,
    color: "#5b5c5a",
    textAlign: "center",
  },
  itemName: {
    fontSize: 20,
    color: "#5b5c5a",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    // backgroundColor: "#eee",
  },
  removeButton: {
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#cb464a",
    textDecorationLine: "underline",
    opacity: 0.8,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fefefe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
})
