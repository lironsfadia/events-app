import { supabase } from '@/utils/supabase';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

const Attendance = () => {
  const { id } = useLocalSearchParams();
  const [attendance, setAttendance] = useState<any | null>(null);
  const [event, setEvent] = useState<any | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase.from('attendance').select('*').eq('event_id', id);

        setAttendance(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };

    const fetchAttendees = async () => {
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
    fetchAttendees();
  }, [id]);

  return (
    <>
      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.user_id}</Text>;
        }}
      />
    </>
  );
};

export default Attendance;
