import { Button, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectItems } from "../slices/itemsSlice";
import { RootTabScreenProps } from "../types";


export default function HomeScreen({navigation}:RootTabScreenProps<'Home'>) {
  const items = useAppSelector(selectItems)

  const goToAdd = () => {
    navigation.navigate('AddModal')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Add" onPress={goToAdd}/>
      </View>
      <ScrollView style={styles.list}>
        {
          items.map((item, idx) => {
            return (
              <View style={styles.item} key={item.id}>
                <Text>{item.name}_{idx}</Text>
              </View>
            )
          })
        }
      </ScrollView>
      <View>
        <Button title="Start"/>
      </View>
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
  list: {
    width: '100%',
    // paddingHorizontal: 20,
    flex: 1,
  },
  item: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
})