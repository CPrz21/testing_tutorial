import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';

export default function AddList({value, onChange, onPressAdd, testID}) {
  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        placeholder="Write something"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      <TouchableOpacity testID={"task_add"} onPress={onPressAdd} style={styles.addButton}>
        <Text style={styles.buttonStyles}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 275,
  },
  addButton: {
    backgroundColor: 'red',
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginLeft: 15,
  },
  buttonStyles: {
    color: 'white',
    fontSize: 32,
  },
});
