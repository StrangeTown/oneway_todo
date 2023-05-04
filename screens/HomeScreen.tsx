import { Button, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectItems } from "../slices/itemsSlice";
import { RootTabScreenProps } from "../types";
import TodoList from "../components/TodoList";


export default function HomeScreen({navigation}:RootTabScreenProps<'Home'>) {
  const items = useAppSelector(selectItems)

  const goToAdd = () => {
    navigation.navigate('AddModal')
  }
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
})