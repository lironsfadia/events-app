import { useMemo } from 'react';

import { ListItem } from '@/types/types';
import EventListItem from '@/components/EventListItem'; // Add import statement for EventListItem

const useEvents = () => {
  const listItem = useMemo(() => {
    return ({ item }: ListItem) => <EventListItem item={item} />;
  }, []);

  return { listItem };
};
export default useEvents;
