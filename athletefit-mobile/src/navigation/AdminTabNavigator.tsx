import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { UsersScreen } from '../screens/admin/UsersScreen';
import { SettingsScreen } from '../screens/admin/SettingsScreen';
import { Shield, Users, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const AdminTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopColor: '#1E293B',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#C084FC',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Shield color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
