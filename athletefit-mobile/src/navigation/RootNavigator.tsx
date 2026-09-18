import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { AthleteTabNavigator } from './AthleteTabNavigator';
import { CoachTabNavigator } from './CoachTabNavigator';
import { AdminTabNavigator } from './AdminTabNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : user.role === 'Coach' ? (
          <Stack.Screen name="CoachMain" component={CoachTabNavigator} />
        ) : user.role === 'Admin' ? (
          <Stack.Screen name="AdminMain" component={AdminTabNavigator} />
        ) : (
          <Stack.Screen name="AthleteMain" component={AthleteTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
