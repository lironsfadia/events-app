import { useEffect, useState } from 'react';

import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { formatDate } from '@/utils/date';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthProvider';

function EventScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<any | null>(null);
  const [event, setEvent] = useState<any | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('event_id', id)
          .eq('user_id', user?.id)
          .single();
        setAttendance(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    const fetchEvent = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase.from('events').select('*').eq('id', id).single();
        setEvent(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    fetchAttendance();
    fetchEvent();
  }, [id]);

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

  const { title, image_uri, date, desc } = event;
  const time = formatDate(date);

  const onAttend = async () => {
    try {
      await supabase
        .from('attendance')
        .insert([{ event_id: id, user_id: user?.id }])
        .select()
        .single();

      setAttendance({ event_id: id, user_id: user?.id });
      alert('You have successfully RSVPed to this event');
    } catch (e: unknown) {
      alert('An error occurred while RSVPing to this event');
    }
  };

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
          <Text className="font-bold text-green-600">You Are Attending!</Text>
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
