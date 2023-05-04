import React from "react"
import { View, Text } from "../components/Themed"

import { StyleSheet } from "react-native"
import { AddButton, TodoListItem } from "./TodoListItem"
import { useSelector } from "react-redux"
import { selectItems } from "../slices/itemsSlice"
import AddModal from "./AddModal"

const resortItems = (items: any[]) => {
  // order: normal, important, urgent, important and urgent
  const normalItems = items.filter(
    (item) => !item.isImportant && !item.isUrgent
  )
  const importantItems = items.filter(
    (item) => item.isImportant && !item.isUrgent
  )
  const urgentItems = items.filter((item) => item.isUrgent && !item.isImportant)
  const importantAndUrgentItems = items.filter(
    (item) => item.isImportant && item.isUrgent
  )
  return [
    ...normalItems,
    ...importantItems,
    ...urgentItems,
    ...importantAndUrgentItems,
  ]
}

export default function TodoList() {
  const items = useSelector(selectItems)
  const [addModalVisible, setAddModalVisible] = React.useState(false)
  const sortedItems = resortItems(items)

  return (
    <View style={styles.container}>
      <AddButton onPress={() => setAddModalVisible(true)} />
      {sortedItems.map((item) => {
        return <TodoListItem key={item.id} item={item} />
      })}

      <AddModal
        isVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "transparent",
    flexWrap: "wrap",
  },
})
