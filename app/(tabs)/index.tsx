import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import useEvents from '@/hooks/useEvents';
import { supabase } from '@/utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export default function Events() {
  const { listItem } = useEvents();
  const [events, setEvents] = useState<any[] | null>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let { data: events, error } = await supabase.from('events').select('*');
        setEvents(events);
        setError(error);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <FlatList
      className="bg-white"
      data={events}
      renderItem={listItem}
      keyExtractor={(item) => item.id}
    />
  );
}
