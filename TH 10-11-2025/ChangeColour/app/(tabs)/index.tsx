import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleChangeColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor); 
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={[styles.colorBlock, { backgroundColor: backgroundColor }]} />

      <Button
        title="Đổi màu"
        onPress={handleChangeColor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', 
  },
  colorBlock: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 30, 
  },
});