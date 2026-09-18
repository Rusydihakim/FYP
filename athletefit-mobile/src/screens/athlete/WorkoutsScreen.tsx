import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Dumbbell, CheckCircle2, Clock } from 'lucide-react-native';

export const WorkoutsScreen: React.FC = () => {
  const workouts = [
    { id: '1', title: 'Upper Body Power', status: 'Completed', time: '45 mins', date: 'Today, 08:30 AM' },
    { id: '2', title: 'Leg Day & Posterior Chain', status: 'Assigned', time: '60 mins', date: 'Tomorrow' },
    { id: '3', title: 'Cardio & Active Recovery', status: 'Assigned', time: '30 mins', date: 'Friday, Sep 20' },
  ];

  return (
    <ScreenContainer>
      <Header title="Workouts" subtitle="Track and log your assigned training sessions" />

      {workouts.map((w) => (
        <Card key={w.id}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <Dumbbell size={20} color="#10B981" />
              <Text style={styles.title}>{w.title}</Text>
            </View>
            <Badge
              label={w.status}
              variant={w.status === 'Completed' ? 'emerald' : 'amber'}
            />
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={16} color="#9CA3AF" />
              <Text style={styles.infoText}>{w.time}</Text>
            </View>
            <Text style={styles.dateText}>{w.date}</Text>
          </View>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>
              {w.status === 'Completed' ? 'View Logged Results' : 'Start Session'}
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  dateText: {
    color: '#6B7280',
    fontSize: 13,
  },
  actionBtn: {
    backgroundColor: '#1F2937',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  actionBtnText: {
    color: '#34D399',
    fontWeight: '600',
    fontSize: 14,
  },
});
