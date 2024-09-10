import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import events from '../../assets/events.json';
import { formatDate } from '@/utils/date';

function EventScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Event not found</Text>
      </View>
    );
  }

  const { title, image, datetime, description } = event;
  const time = formatDate(datetime);

  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <Image className="aspect-video w-full" source={{ uri: image }} />
      <Text className="mt-1 text-3xl font-bold" numberOfLines={2}>
        {title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-700">{time}</Text>
      <Text className="mt-1 text-lg">{description}</Text>

      <View className="border-grey-100 absolute bottom-1 left-0 right-0 flex-1 flex-row items-center justify-between border-t-2 bg-white p-5">
        <Text className="p-3 text-xl font-semibold">Free</Text>
        <Pressable className="rounded-md bg-red-400 p-5">
          <Text className="font-bold text-white">Join and RSVP</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default EventScreen;
