import { ListItem } from '@/types/types';
import EventListItem from '@/components/EventListItem'; // Add import statement for EventListItem
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useEvents = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { session, user } = useAuth();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: string;
    full_name: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(`Error!: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const listItem = ({ item }: ListItem) => {
    return <EventListItem item={item} />;
  };

  return {
    listItem,
    loading,
    username,
    setUsername,
    fullName,
    setFullName,
    website,
    setWebsite,
    avatarUrl,
    setAvatarUrl,
    updateProfile,
  };
};

export default useEvents;
