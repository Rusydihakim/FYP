import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Activity, Flame, Heart, Trophy, Zap, Calendar } from 'lucide-react-native';

export const AthleteDashboardScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="Athlete Dashboard" subtitle="Welcome back, Alex! Tap role badge to switch views." />

      {/* Readiness & Streak Banner */}
      <Card style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroTitle}>Readiness Score</Text>
            <Text style={styles.heroScore}>92% <Text style={styles.heroUnit}>Optimal</Text></Text>
          </View>
          <View style={styles.streakBadge}>
            <Flame size={20} color="#F59E0B" />
            <Text style={styles.streakText}>14 Day Streak</Text>
          </View>
        </View>
        <Text style={styles.heroSubtext}>HRV and recovery indicators show peak performance capacity today.</Text>
      </Card>

      {/* Metrics Grid */}
      <View style={styles.grid}>
        <Card style={styles.metricCard}>
          <Heart size={22} color="#EF4444" />
          <Text style={styles.metricVal}>54 BPM</Text>
          <Text style={styles.metricLabel}>Resting Heart Rate</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Zap size={22} color="#10B981" />
          <Text style={styles.metricVal}>78 ms</Text>
          <Text style={styles.metricLabel}>HRV Recovery</Text>
        </Card>
      </View>

      {/* Today's Workout */}
      <Text style={styles.sectionTitle}>Today's Assigned Workout</Text>
      <Card>
        <View style={styles.workoutHeader}>
          <Badge label="Hypertrophy" variant="emerald" />
          <Text style={styles.durationText}>45 mins</Text>
        </View>
        <Text style={styles.workoutTitle}>Upper Body Power & Core</Text>
        <Text style={styles.workoutDesc}>4 Sets Barbell Bench Press, 3 Sets Incline DB Flyes, Core Cable Woodchoppers.</Text>
        <TouchableOpacity style={styles.startBtn} activeOpacity={0.8}>
          <Text style={styles.startBtnText}>Start Workout Session</Text>
        </TouchableOpacity>
      </Card>

      {/* Weekly Progress */}
      <Text style={styles.sectionTitle}>Weekly Summary</Text>
      <Card>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Activity size={20} color="#60A5FA" />
            <Text style={styles.summaryVal}>5 / 6</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Trophy size={20} color="#FBBF24" />
            <Text style={styles.summaryVal}>3</Text>
            <Text style={styles.summaryLabel}>New PRs</Text>
          </View>
          <View style={styles.summaryItem}>
            <Calendar size={20} color="#C084FC" />
            <Text style={styles.summaryVal}>4.5 hrs</Text>
            <Text style={styles.summaryLabel}>Total Time</Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroScore: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10B981',
    marginTop: 2,
  },
  heroUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34D399',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    color: '#FBBF24',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 6,
  },
  heroSubtext: {
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F3F4F6',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 10,
    marginTop: 6,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 6,
  },
  workoutDesc: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  startBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#0B0F17',
    fontWeight: '700',
    fontSize: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryVal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F3F4F6',
    marginTop: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
