import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AthleteDashboardScreen } from '../screens/athlete/AthleteDashboardScreen';
import { WorkoutsScreen } from '../screens/athlete/WorkoutsScreen';
import { AnalyticsScreen } from '../screens/athlete/AnalyticsScreen';
import { WearableScreen } from '../screens/athlete/WearableScreen';
import { AthleteMessagesScreen } from '../screens/athlete/AthleteMessagesScreen';
import { Home, Dumbbell, TrendingUp, Watch, MessageSquare } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const AthleteTabNavigator: React.FC = () => {
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
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AthleteDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Wearable"
        component={WearableScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Watch color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={AthleteMessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
