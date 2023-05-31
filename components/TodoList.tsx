import React from "react"
import { View } from "../components/Themed"

import { StyleSheet } from "react-native"
import { AddButton, ReviewButton, TodoListItem } from "./TodoListItem"
import { useSelector } from "react-redux"
import { selectDisplayedItems } from "../slices/itemsSlice"
import AddModal from "./AddModal"

interface TodoListProps {
  activeItemId: string | undefined
  onSelectedItemIdChange: (id: string) => void
}
export default function TodoList({
  activeItemId,
  onSelectedItemIdChange,
}: TodoListProps) {
  const items = useSelector(selectDisplayedItems)
  const [addModalVisible, setAddModalVisible] = React.useState(false)

  return (
    <View style={styles.container}>
      <AddButton onPress={() => setAddModalVisible(true)} />

      {items.map((item) => {
        const isActive = item.id === activeItemId
        return (
          <TodoListItem
            key={item.id}
            item={item}
            isActive={isActive}
            onPress={() => {
              onSelectedItemIdChange(item.id)
            }}
          />
        )
      })}

      <ReviewButton onPress={() => {}} />

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
