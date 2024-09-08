import { FlatList } from 'react-native';

import events from '../../assets/events.json';
import useEvents from '@/hooks/useEvents';

export default function Events() {
  const { listItem } = useEvents();

  return (
    <FlatList
      className="bg-white"
      data={events}
      renderItem={listItem}
      keyExtractor={(item) => item.id}
    />
  );
}
