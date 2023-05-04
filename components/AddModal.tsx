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

interface CheckboxItemProps {
  label: string
  value: boolean
  onChange: (val: boolean) => void
}
const CheckboxItem = ({ label, value, onChange }: CheckboxItemProps) => {
  return (
    <View style={styles.checkboxContainer}>
      {/* label */}
      <TouchableOpacity style={styles.checkboxLabel} onPress={() => onChange(!value)}>
        <Text>{label}</Text>
      </TouchableOpacity>

      {/* checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onChange(!value)}
      >
        {value && <View style={styles.checkboxInner} />}
      </TouchableOpacity>
    </View>
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
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Enter Todo Item Name"
        />

        {/* is important */}
        <CheckboxItem label="Important" value={isImportant} onChange={setIsImportant} />

        {/* is urgent */}
        <CheckboxItem label="Urgent" value={isUrgent} onChange={setIsUrgent} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  checkboxLabel: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#000",
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#2196f3",
  },
  buttonText: {
    color: "#bbb",
  },
})
