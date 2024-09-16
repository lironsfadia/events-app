import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Event } from '@/types/types';
import { useAuth } from '@/contexts/AuthProvider';
import { formatDate } from '@/utils/date';
import { supabase } from '@/utils/supabase';

interface EventOutput {
  event: Event;
  attendance: any;
  onAttend: () => void;
  loading: boolean;
  time: string;
}

function useEvent(): EventOutput {
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

  const { date } = event || {};
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

  return { event, attendance, onAttend, loading, time };
}

export default useEvent;
