import { Stack } from 'expo-router';
import { View, Text, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { EventListItemProps } from '@/types/types';
import { formatDate } from '@/utils/date';

const EventListItem = ({ item }: EventListItemProps) => {
  const { title, datetime, location, image } = item;
  const time = formatDate(datetime);
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <View className="border-grey-100 m-3 gap-5 border-b pb-3">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-md font-semibold uppercase text-amber-700">{time}</Text>
            <Text className="text-md mt-1 font-bold" numberOfLines={2}>
              {title}
            </Text>
            <Text className="text-md text-grey-700">{location}</Text>
          </View>

          <Image source={{ uri: image }} className="aspect-video w-2/5 rounded-xl" />
        </View>

        <View className="flex-row gap-3">
          <Text className="text-grey-500 mr-auto">88 Going</Text>
          <Feather name="share" size={20} color="grey" />
          <Feather name="save" size={20} color="grey" />
        </View>
      </View>
    </>
  );
};

export default EventListItem;
