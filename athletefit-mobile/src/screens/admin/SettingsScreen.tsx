import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <ScreenContainer>
      <Header title="Settings" subtitle="App configurations & account details" />

      <Card>
        <Text style={styles.label}>Account Email</Text>
        <Text style={styles.val}>{user?.email}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Current Active Role</Text>
        <Text style={styles.val}>{user?.role}</Text>
      </Card>

      <Button title="Log Out" variant="danger" onPress={signOut} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  val: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
    marginTop: 4,
  },
});
