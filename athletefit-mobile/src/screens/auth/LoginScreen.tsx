import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Shield } from 'lucide-react-native';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleLogin = () => {
    signIn(email || 'athlete@athletefit.com', 'Athlete');
  };

  return (
    <ScreenContainer>
      <View style={styles.brandContainer}>
        <Shield size={48} color="#10B981" />
        <Text style={styles.brandTitle}>AthleteFit Pro</Text>
        <Text style={styles.brandSubtitle}>Performance Coaching & Analytics</Text>
      </View>

      <Input
        label="Email Address"
        placeholder="alex@athletefit.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Input
        label="Password"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleLogin} loading={isLoading} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F9FAFB',
    marginTop: 12,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
