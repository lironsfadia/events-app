import { supabase } from '@/utils/supabase';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, View, TextInput, Pressable, Text } from 'react-native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="mt-10 flex-1 gap-3 bg-white p-4 pt-10">
      <Stack.Screen
        options={{ title: 'Sign in', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />
      <View className="flex-row justify-center gap-3">
        <Pressable
          className="flex-1 items-center rounded-md border-2 border-blue-400 p-5 px-8"
          onPress={() => signInWithEmail()}
          disabled={loading}>
          <Text className="font-bold text-blue-500 ">Sign in</Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center rounded-md border-2 bg-blue-500 p-5 px-8"
          onPress={() => signUpWithEmail()}
          disabled={loading}>
          <Text className="font-bold text-white">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Login;
