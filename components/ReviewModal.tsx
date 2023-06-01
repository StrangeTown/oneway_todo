import { Modal, StyleSheet, Text, View } from "react-native"
import { selectCompletedItems } from "../slices/itemsSlice"
import { useSelector } from "react-redux"
import { TodoItem } from "../types"

interface TasksSection {
  items: TodoItem[]
  title: string
}
const TasksSection = ({ items, title }: TasksSection) => {
  if (items.length === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => {
        return (
          <Text style={styles.text} key={item.id}>
            {item.name}
          </Text>
        )
      })}
    </View>
  )
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

interface ReviewModalProps {
  isVisible: boolean
  onClose: () => void
}

export default function ReviewModal({ isVisible, onClose }: ReviewModalProps) {
  const completedItems = useSelector(selectCompletedItems)

  const [todayCompletedItems, yesterdayCompletedItems] = completedItems.reduce(
    (acc, item) => {
      const date = item.updateTimestamp ? new Date(item.updateTimestamp) : null
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      if (date && isSameDay(date, today)) {
        acc[0].push(item)
      } else if (date && isSameDay(date, yesterday)) {
        acc[1].push(item)
      }
      return acc
    },
    [[], []] as TodoItem[][]
  )

  const todayTitle = `Today (${todayCompletedItems.length})`
  const yesterdayTitle = `Yesterday (${yesterdayCompletedItems.length})`

  const noCompletedItems =
    todayCompletedItems.length === 0 && yesterdayCompletedItems.length === 0

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {noCompletedItems && (
          <Text style={styles.emptyTip}>
            No completed tasks yet recently
          </Text>
        )}
        <TasksSection items={todayCompletedItems} title={todayTitle} />
        <TasksSection items={yesterdayCompletedItems} title={yesterdayTitle} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  emptyTip: {
    fontSize: 16,
    color: "#5b5c5a",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 12,
    color: "#5b5c5ab3",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    textDecorationLine: "line-through",
    color: "#5b5c5a",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
})
