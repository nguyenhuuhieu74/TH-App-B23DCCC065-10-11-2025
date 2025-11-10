import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CalculateAverageScreen() {
  const [mathScore, setMathScore] = useState('');
  const [physicsScore, setPhysicsScore] = useState('');
  const [chemistryScore, setChemistryScore] = useState('');

  const [average, setAverage] = useState<number | null>(null);

  const handleCalculate = () => {
    const math = parseFloat(mathScore);
    const physics = parseFloat(physicsScore);
    const chemistry = parseFloat(chemistryScore);

    if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
      Alert.alert("Lỗi", "Vui lòng nhập điểm hợp lệ cho cả 3 môn.");
      setAverage(null); 
      return;
    }

    const avg = (math + physics + chemistry) / 3;
    setAverage(avg); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tính Điểm Trung Bình</Text>

      <TextInput
        style={styles.input}
        placeholder="Điểm môn Toán"
        keyboardType="numeric"
        value={mathScore}
        onChangeText={setMathScore}
      />

      <TextInput
        style={styles.input}
        placeholder="Điểm môn Lý"
        keyboardType="numeric"
        value={physicsScore}
        onChangeText={setPhysicsScore}
      />

      <TextInput
        style={styles.input}
        placeholder="Điểm môn Hóa"
        keyboardType="numeric"
        value={chemistryScore}
        onChangeText={setChemistryScore}
      />

      <Pressable style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Tính điểm</Text>
      </Pressable>

      {average !== null && (
        <Text style={styles.result}>
          Điểm trung bình của bạn là: {average.toFixed(2)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  result: { marginTop: 20, fontSize: 18, textAlign: 'center', fontWeight: '500' },
});