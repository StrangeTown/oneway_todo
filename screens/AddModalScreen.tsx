import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import {
  Button,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native"

import { View } from "../components/Themed"
import { useAppDispatch } from "../hooks/reduxHooks"
import { addItem } from "../slices/itemsSlice"

export default function AddModalScreen() {
  const [name, setName] = useState("")
  const dispatch = useAppDispatch()
  const addToList = () => {
    dispatch(
      addItem({
        name,
        id: new Date().toDateString(),
        isCompleted: false,
      })
    )
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        placeholder="Item Name"
        value={name}
        onChangeText={(val) => {
          setName(val)
        }}
      />
      <View>
        <Button title="Add to Stack" onPress={addToList} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  nameInput: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
  },
})
