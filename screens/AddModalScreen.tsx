import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';

export default function AddModalScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.nameInput} placeholder='Item Name'/>
      <View>
        <Button title='Add to Stack' />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  nameInput: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  }
});
