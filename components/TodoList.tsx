import React from "react"
import { View } from "../components/Themed"

import { Alert, StyleSheet } from "react-native"
import { AddButton, ReviewButton, TodoListItem } from "./TodoListItem"
import { useSelector } from "react-redux"
import { selectDisplayedItems } from "../slices/itemsSlice"
import AddModal from "./AddModal"
import ReviewModal from "./ReviewModal"

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
  const [reviewModalVisible, setReviewModalVisible] = React.useState(false)

  const handleAdd = () => {
    const itemsLength = items.length
    
    // equivalent or bigger than 12, alert
    if (itemsLength >= 12) {
      Alert.alert(
        // 积压了太多事项
        "Too many items",
        "Please remove some items before adding new ones",
        [{ text: "OK" }],
      )
      return
    }
    setAddModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <AddButton onPress={handleAdd} />

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

      <ReviewButton onPress={() => setReviewModalVisible(true)} />

      <AddModal
        isVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />

      <ReviewModal
        isVisible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
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
