import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <View style={styles.container}>
       
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
