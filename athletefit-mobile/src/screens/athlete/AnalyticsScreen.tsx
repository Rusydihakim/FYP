import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { TrendingUp, Activity, Target } from 'lucide-react-native';

export const AnalyticsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="Analytics" subtitle="Performance metrics & strength progression" />

      <Card>
        <View style={styles.header}>
          <TrendingUp size={22} color="#10B981" />
          <Text style={styles.title}>1RM Progress (Bench Press)</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.bigStat}>115 kg</Text>
          <Text style={styles.badgeText}>+7.5 kg this month</Text>
        </View>
      </Card>

      <Card>
        <View style={styles.header}>
          <Activity size={22} color="#60A5FA" />
          <Text style={styles.title}>Volume Load per Week</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.bigStat}>24,500 kg</Text>
          <Text style={styles.subText}>Targeted Range: 22,000 - 26,000 kg</Text>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  statContainer: {
    marginTop: 4,
  },
  bigStat: {
    fontSize: 28,
    fontWeight: '800',
    color: '#10B981',
  },
  badgeText: {
    color: '#34D399',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 4,
  },
  subText: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 4,
  },
});
