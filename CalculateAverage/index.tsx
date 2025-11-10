import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CalculateAverageScreen() {
  // State để lưu điểm của từng môn
  const [mathScore, setMathScore] = useState('');
  const [physicsScore, setPhysicsScore] = useState('');
  const [chemistryScore, setChemistryScore] = useState('');

  // State để lưu kết quả điểm trung bình
  const [average, setAverage] = useState<number | null>(null);

  // Hàm xử lý khi nhấn nút "Tính điểm"
  const handleCalculate = () => {
    // Chuyển đổi điểm từ dạng chuỗi sang số
    const math = parseFloat(mathScore);
    const physics = parseFloat(physicsScore);
    const chemistry = parseFloat(chemistryScore);

    // Kiểm tra xem điểm có phải là số hợp lệ không
    if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
      Alert.alert("Lỗi", "Vui lòng nhập điểm hợp lệ cho cả 3 môn.");
      setAverage(null); // Xóa kết quả cũ nếu có lỗi
      return;
    }

    // Tính điểm trung bình
    const avg = (math + physics + chemistry) / 3;
    setAverage(avg); // Cập nhật kết quả
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tính Điểm Trung Bình</Text>

      {/* Ô nhập điểm Toán */}
      <TextInput
        style={styles.input}
        placeholder="Điểm môn Toán"
        keyboardType="numeric"
        value={mathScore}
        onChangeText={setMathScore}
      />

      {/* Ô nhập điểm Lý */}
      <TextInput
        style={styles.input}
        placeholder="Điểm môn Lý"
        keyboardType="numeric"
        value={physicsScore}
        onChangeText={setPhysicsScore}
      />

      {/* Ô nhập điểm Hóa */}
      <TextInput
        style={styles.input}
        placeholder="Điểm môn Hóa"
        keyboardType="numeric"
        value={chemistryScore}
        onChangeText={setChemistryScore}
      />

      {/* Nút bấm để tính điểm */}
      <Pressable style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Tính điểm</Text>
      </Pressable>

      {/* Hiển thị kết quả nếu có */}
      {average !== null && (
        <Text style={styles.result}>
          Điểm trung bình của bạn là: {average.toFixed(2)}
        </Text>
      )}
    </View>
  );
}

// CSS để tạo kiểu cho giao diện
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  result: { marginTop: 20, fontSize: 18, textAlign: 'center', fontWeight: '500' },
});