// active todo item

import { StyleSheet, Text, View } from "react-native"
import { TodoItem } from "../types"
import { useSelector } from "react-redux"
import { selectItems } from "../slices/itemsSlice"

interface ActiveTodoItemProps {
  itemId: string | undefined
}
export default function ActiveTodoItem({ itemId }: ActiveTodoItemProps) {
  const items = useSelector(selectItems)
  const item = items.find((item) => item.id === itemId)
  const name = item?.name

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fefefe",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
})