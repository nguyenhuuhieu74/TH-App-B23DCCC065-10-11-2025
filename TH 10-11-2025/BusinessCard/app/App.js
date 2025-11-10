import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const AVATAR_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Wang_Anshi.jpg/960px-Wang_Anshi.jpg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.card}>
        
        <Image
          source={{ uri: AVATAR_URL }}
          style={styles.avatar}
        />
        
        <Text style={styles.name}>Wang Anshi</Text>
        
        <Text style={styles.jobTitle}>Song Dynasty Chancellor</Text>
        
        <Text style={styles.contactInfo}>xiningreform@email.com</Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
  },
  card: {
    width: 320, 
    padding: 24, 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    
    borderRadius: 16,
    
  
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    
    elevation: 5, 
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 18,
    color: '#666', 
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 16,
    color: '#007BFF', 
  },
});