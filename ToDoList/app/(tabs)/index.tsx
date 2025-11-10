import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');

 
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Học React Native' },
    { id: '2', text: 'Làm bài tập' },
  ]);

  const handleAddTask = () => {
    if (taskText.trim().length > 0) {

      setTasks(prevTasks => [
        ...prevTasks,
        { id: Date.now().toString(), text: taskText },
      ]);
      setTaskText('');
      Keyboard.dismiss();
    }
  };

  const handleDeleteTask = (idToDelete) => {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== idToDelete)
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)}

      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập công việc mới..."
            value={taskText} 
            onChangeText={setTaskText} 
          />
          <Button title="Thêm" onPress={handleAddTask} />
        </View>

     
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>Chưa có công việc nào.</Text>}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, 
    backgroundColor: '#F7F7F7',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    flex: 1, 
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#999',
  }
});