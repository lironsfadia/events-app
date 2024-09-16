import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { Link, Stack } from 'expo-router';

import useEvent from '@/hooks/useEvent';

function EventScreen() {
  const { event, attendance, onAttend, loading, time } = useEvent();
  const { id, title, image_uri, desc } = event || {};

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Event not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <Image className="aspect-video w-full" source={{ uri: image_uri }} />
      <Text className="mt-1 text-3xl font-bold" numberOfLines={2}>
        {title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-700">{time}</Text>
      <Text className="mt-1 text-lg">{desc}</Text>

      <View className="border-grey-100 absolute bottom-1 left-0 right-0 flex-1 flex-row items-center justify-between border-t-2 bg-white p-5">
        <Text className="p-3 text-xl font-semibold">Free</Text>
        {attendance ? (
          <>
            <Text className="font-bold text-green-600">You Are Attending!</Text>
            <Link
              href={`/event/${id}/attendance`}
              className="mt-1 text-lg  font-extrabold text-green-600">
              View Attendees
            </Link>
          </>
        ) : (
          <Pressable onPress={onAttend} className="rounded-md bg-red-400 p-5">
            <Text className="font-bold text-white">Join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default EventScreen;
