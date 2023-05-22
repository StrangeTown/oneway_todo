import { BlurView } from "expo-blur"
import { Text, TouchableOpacity, View } from "react-native"
import { StyleSheet } from "react-native"

interface ConfirmModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}
const RemoveConfirmModal = ({
  isVisible,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  if (!isVisible) return null

  return (
    <BlurView style={styles.removeConfirmModal} intensity={40} tint="light">
      <View style={styles.removeConfirmModalContent}>
        {/* sure completed it? or wont do it? */}
        <Text style={styles.removeConfirmModalText}>
          Have you completed the task, or do you plan on abandoning it?
        </Text>
        <View style={styles.removeConfirmModalButtons}>
          <TouchableOpacity
            style={styles.removeConfirmModalButton}
            onPress={onClose}
          >
            <Text
              style={[
                styles.removeConfirmModalButtonText,
                { color: "#bfc5c5" },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeConfirmModalButton}
            onPress={onConfirm}
          >
            <Text style={styles.removeConfirmModalButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  )
}
const styles = StyleSheet.create({
  removeConfirmModal: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  removeConfirmModalContent: {
    width: "86%",
    padding: 20,
    borderRadius: 10,
  },
  removeConfirmModalText: {
    fontSize: 17,
    color: "#5b5c5a",
    marginBottom: 50,
  },
  removeConfirmModalButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeConfirmModalButton: {
    borderRadius: 5,
  },
  removeConfirmModalButtonText: {
    color: "#cb464a",
    textDecorationLine: "underline",
    opacity: 0.8,
    fontSize: 19,
    textTransform: "uppercase",
  },
})

export default RemoveConfirmModal
