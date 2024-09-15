import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/utils/supabase';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View, Text } from 'react-native';

export default function Home() {
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
    fullName,
    website,
    avatar_url,
  }: {
    username: string;
    fullName: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name: fullName,
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
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View className="flex-1 gap-3 bg-white p-4">
      <Stack.Screen options={{ title: 'Profile' }} />

      <TextInput
        editable={false}
        value={session?.user?.email}
        placeholder="email"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3 text-gray-500"
      />

      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="user name"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <TextInput
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="full name"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <TextInput
        onChangeText={(text) => setWebsite(text)}
        value={website}
        placeholder="website"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <Pressable
        className="items-center rounded-md border-2 border-blue-400 p-5 px-8"
        onPress={() => updateProfile({ username, website, avatar_url: avatarUrl, fullName })}
        disabled={loading}>
        <Text className="font-bold text-blue-500 ">Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
