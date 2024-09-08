import { FlatList } from 'react-native';

import EventListItem from '~/components/EventListItem';
import events from '../../assets/events.json';

export default function Events() {
  const listItem = ({ item }) => {
    return <EventListItem data={item} />;
  };
  return <FlatList data={events} renderItem={listItem} keyExtractor={(item) => item.id} />;
}
