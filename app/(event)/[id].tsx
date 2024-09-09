import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

function EventScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Event {id}</Text>
    </View>
  );
}

export default EventScreen;
