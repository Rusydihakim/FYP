import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CoachDashboardScreen } from '../screens/coach/CoachDashboardScreen';
import { AthletesListScreen } from '../screens/coach/AthletesListScreen';
import { PlansScreen } from '../screens/coach/PlansScreen';
import { AssignPlanScreen } from '../screens/coach/AssignPlanScreen';
import { CoachMessagesScreen } from '../screens/coach/CoachMessagesScreen';
import { LayoutDashboard, Users, BookOpen, PlusCircle, MessageSquare } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const CoachTabNavigator: React.FC = () => {
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
        tabBarActiveTintColor: '#60A5FA',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={CoachDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Athletes"
        component={AthletesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Assign"
        component={AssignPlanScreen}
        options={{
          tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={CoachMessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
