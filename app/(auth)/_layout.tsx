import { Redirect, Stack, Tabs } from 'expo-router';

import { useAuth } from '@/contexts/AuthProvider';

export default function AuthLayout() {
  const { user, isAuth } = useAuth();

  if (isAuth) {
    return <Redirect href="/" />;
  }

  return <Stack></Stack>;
}
