import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const UsersScreen: React.FC = () => {
  const users = [
    { id: '1', name: 'Marcus Vance', email: 'marcus@athletefit.com', role: 'Coach' as const },
    { id: '2', name: 'Alex Rivera', email: 'alex@athletefit.com', role: 'Athlete' as const },
    { id: '3', name: 'Admin Root', email: 'admin@athletefit.com', role: 'Admin' as const },
  ];

  return (
    <ScreenContainer>
      <Header title="User Accounts" subtitle="System user directory and role provisioning" />

      {users.map((u) => (
        <Card key={u.id}>
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{u.name}</Text>
              <Text style={styles.email}>{u.email}</Text>
            </View>
            <Badge label={u.role} role={u.role} />
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  email: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
