import { Link, Redirect, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from 'react-native';
import { supabase } from '@/utils/supabase';

export default function TabLayout() {
  const { user, isAuth } = useAuth();

  if (!isAuth) {
    return <Redirect href="/login" />;
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          headerRight: () => <Button onPress={() => supabase.auth.signOut()} title="Sign out" />,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    );
  }
}
