// add todo item modal

import { useState } from "react"
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native"
import { useAppDispatch } from "../hooks/reduxHooks"
import { addItem } from "../slices/itemsSlice"
import { TodoItem } from "../types"
import uuid from "react-native-uuid"
import Colors from "../constants/Colors"

interface CheckboxItemProps {
  label: string
  value: boolean
  onChange: (val: boolean) => void
  activeColor?: string
}
const CheckboxItem = ({
  label,
  value,
  onChange,
  activeColor,
}: CheckboxItemProps) => {
  return (
    <TouchableOpacity
      style={styles.checkboxLabel}
      onPress={() => onChange(!value)}
    >
      <Text
        style={[
          styles.checkboxLabelText,
          value && {
            color: activeColor || Colors.light.itemBackgroundDefault,
            backgroundColor: activeColor || Colors.light.itemBackgroundDefault,
            ...styles.checkboxLabelTextActive,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

interface AddModalProps {
  isVisible: boolean
  onClose: () => void
}
export default function AddModal({ isVisible, onClose }: AddModalProps) {
  const [text, setText] = useState("")
  const [isImportant, setIsImportant] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)

  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    const newIem: TodoItem = {
      id: uuid.v4() as string,
      name: text,
      isCompleted: false,
      isImportant,
      isUrgent,
    }
    dispatch(addItem(newIem))
    setText("")
    onClose()
  }

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setText(text)}
              value={text}
              placeholder="Enter Todo Item Name"
              multiline={true}
              numberOfLines={3}
            />

            <View style={styles.optionsContainer}>
              {/* is important */}
              <CheckboxItem
                label="Important"
                value={isImportant}
                onChange={setIsImportant}
                activeColor={Colors.light.itemBackgroundImportant}
              />

              {/* is urgent */}
              <CheckboxItem
                label="Urgent"
                value={isUrgent}
                onChange={setIsUrgent}
                activeColor={Colors.light.itemBackgroundUrgent}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  content: {
    borderColor: "#eeeeee",
    borderWidth: 1,
    // boxshadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#eeeeee",
    borderTopWidth: 0.5,
  },
  checkboxLabelText: {
    fontSize: 16,
    color: Colors.light.itemBackgroundDefault,
    width: "100%",
    textAlign: "center",
    paddingVertical: 6,
  },
  checkboxLabelTextActive: {
    opacity: 1,
  },
  checkboxLabel: {
    flex: 1,
    alignItems: "center",
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  input: {
    height: 140,
    lineHeight: 36,
    marginBottom: 6,
    paddingHorizontal: 10,
    color: "#5b5c5a",
    fontSize: 24,
  },
  buttonContainer: {
    // marginTop: 120,
    marginBottom: 120,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButton: {
    // backgroundColor: "#6c94cd",
    backgroundColor: "#595a5c",
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#dee3e3",
    fontSize: 12,
  },
})
