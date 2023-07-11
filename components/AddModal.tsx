// add todo item modal

import { useEffect, useRef, useState } from "react"
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
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

// todo items
// each item more than 5 words
const todoList = [
  "Buy groceries for the week",
  "Schedule a doctor's appointment",
  "Pay rent and bills online",
  "Send an email to a colleague",
  "Complete project report for work",
  "Exercise for 30 minutes",
  "Clean the house top-to-bottom",
  "Plan a trip to the beach",
  "Attend marketing conference next month",
  "Read book on personal development",
  "Update LinkedIn profile information",
  "Go for a run in the park",
  "Make dinner reservations for two",
  "Organize closet and donate clothes",
  "Visit museum on a weekday",
  "Write blog post about industry trends",
  "Research new software options",
  "Call parents for weekly catch-up",
  "Take dog for a walk",
  "Meet with mentor for career advice",
  "Learn how to play guitar",
  "Create outline for new project proposal",
  "Follow up with potential client",
  "Watch TED Talk on innovation",
  "Host a movie night with friends",
  "Practice public speaking skills",
  "Start a gratitude journal",
  "Help a friend move apartments",
  "Bake homemade cookies for a party",
  "Study a foreign language vocabulary"
];

interface AddModalProps {
  isVisible: boolean
  onClose: () => void
}
export default function AddModal({ isVisible, onClose }: AddModalProps) {
  const [text, setText] = useState("")
  const [isImportant, setIsImportant] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const inputRef = useRef<TextInput>(null)

  const dispatch = useAppDispatch()

  // set random placeholder text every time modal is opened
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * todoList.length)
    setCurrentPlaceholder(todoList[randomIndex])
  }, [isVisible])

  // auto focus input when modal is opened
  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus()
    }
  }, [isVisible])

  const handleSubmit = () => {
    const trimmedText = text.trim()
    if (trimmedText.length === 0) {
      return
    }

    const newIem: TodoItem = {
      id: uuid.v4() as string,
      name: text,
      isCompleted: false,
      isImportant,
      isUrgent,
      updateTimestamp: Date.now(),
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
      <KeyboardAvoidingView style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setText(text)}
              value={text}
              placeholder={currentPlaceholder}
              multiline={true}
              numberOfLines={3}
              ref={inputRef}
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
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  content: {
    borderColor: "#eeeeee",
    // borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    // backgroundColor: "#fff",
  },
  contentContainer: {
    marginTop: 20,
    flex: 1,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#eeeeee",
    borderTopWidth: 0.5,
    backgroundColor: "#fff",
  },
  checkboxLabelText: {
    fontSize: 16,
    color: Colors.light.itemBackgroundDefault,
    width: "100%",
    textAlign: "center",
    paddingVertical: 6,
    textTransform: "uppercase",
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
    marginTop: 16,
  },
  cancelButtonText: {
    color: "#dee3e3",
    fontSize: 12,
  },
})
