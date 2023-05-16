import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectDisplayedItems } from "../slices/itemsSlice";
import { RootTabScreenProps } from "../types";
import TodoList from "../components/TodoList";
import ActiveTodoItem from "../components/ActiveTodoItem";
import { useState } from "react";


export default function HomeScreen({navigation}:RootTabScreenProps<'Home'>) {
  const items = useAppSelector(selectDisplayedItems)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()

  // last item in the list
  const defaultActiveItem = items[items.length - 1]
  const isSelectedItemDisplayed = items.some(
    (item) => item.id === selectedItemId
  )

  const activeItemId = isSelectedItemDisplayed ? selectedItemId : defaultActiveItem?.id

  const goToAdd = () => {
    navigation.navigate('AddModal')
  }
  return (
    <SafeAreaView style={styles.container}>
      <TodoList activeItemId={activeItemId}
        onSelectedItemIdChange={setSelectedItemId}
      />
      <View style={styles.main}>
        <ActiveTodoItem itemId={activeItemId}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    padding: 20,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})