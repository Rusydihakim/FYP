import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Shield, Users, Server, Database } from 'lucide-react-native';

export const AdminDashboardScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="System Admin" subtitle="Organization health & user management" />

      <View style={styles.grid}>
        <Card style={styles.statCard}>
          <Users size={22} color="#C084FC" />
          <Text style={styles.statNum}>142</Text>
          <Text style={styles.statLabel}>Total Platform Users</Text>
        </Card>

        <Card style={styles.statCard}>
          <Server size={22} color="#10B981" />
          <Text style={styles.statNum}>99.9%</Text>
          <Text style={styles.statLabel}>Supabase Uptime</Text>
        </Card>
      </View>

      <Card>
        <View style={styles.row}>
          <Database size={22} color="#60A5FA" />
          <View style={styles.textGroup}>
            <Text style={styles.cardTitle}>Postgres RLS Security</Text>
            <Text style={styles.cardSub}>Row Level Security policies active across 8 tables.</Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statNum: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F9FAFB',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  cardSub: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
