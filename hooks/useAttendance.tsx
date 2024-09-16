import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { supabase } from '@/utils/supabase';

function useAttendance() {
  const { id } = useLocalSearchParams();
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
          .select('*, profiles(*)')
          .eq('event_id', id);

        setAttendance(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };

    fetchAttendance();
  }, [id]);

  const listItem = ({ item }) => {
    return (
      <View className="p-3">
        <Text className="font-bold">{item.profiles.full_name}</Text>
      </View>
    );
  };

  return { attendance, listItem, loading, error };
}

export default useAttendance;
