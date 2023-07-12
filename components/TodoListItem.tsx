import { Platform, TouchableOpacity, View } from "react-native"
import { Text } from "./Themed"
import { StyleSheet } from "react-native"
import { TodoItem } from "../types"
import Colors from "../constants/Colors"
import { Feather } from "@expo/vector-icons"
import RNHapticFeedback from 'react-native-haptic-feedback';
import * as Device from 'expo-device';

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

export const ReviewButton = ({ onPress }: AddButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.addButton]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText}>
        <Feather name="check" size={11} color="#595a5c" />
      </Text>
    </TouchableOpacity>
  )
}

interface TodoListItemProps {
  item: TodoItem
  isActive: boolean
  onPress: () => void
}
export function TodoListItem({ item, isActive, onPress }: TodoListItemProps) {
  const handlePress = () => {
    const isRealDevice = Device.isDevice
    if (isRealDevice && Platform.OS === "ios") {
      RNHapticFeedback.trigger("impactLight", {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        item.isImportant && styles.isImportant,
        item.isUrgent && styles.isUrgent,
        isActive && styles.isActive,
      ]}
    >
      {
        item.isImportant && item.isUrgent && (

          // half is urgent color and half is important color
          <View style={styles.importantAndUrgentIconBase} >
            <View style={styles.importantAndUrgentIconLeft} />
          </View>
        )
      }
      {/* <Text>{item?.name}</Text> */}
    </TouchableOpacity>
  )
}

const itemSize = 42
const itemBorderWidth = 6
const itemInnerSize = itemSize - itemBorderWidth * 2

const styles = StyleSheet.create({
  importantAndUrgentIconBase: {
    width: itemInnerSize,
    height: itemInnerSize,
    borderRadius: 100,
    backgroundColor: Colors.light.itemBackgroundUrgent,
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  importantAndUrgentIconLeft: {
    width: itemInnerSize / 2,
    height: itemInnerSize,
    backgroundColor: Colors.light.itemBackgroundImportant,
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
    width: itemSize,
    height: itemSize,
    backgroundColor: Colors.light.itemBackgroundDefault,
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
    backgroundColor: Colors.light.itemBackgroundImportant,
  },
  isUrgent: {
    backgroundColor: Colors.light.itemBackgroundUrgent,
  },
})
