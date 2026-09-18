import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Plus, BookOpen } from 'lucide-react-native';

export const PlansScreen: React.FC = () => {
  const plans = [
    { id: '1', title: 'Hypertrophy Phase 2', weeks: '4 Weeks', difficulty: 'Intermediate', assignedCount: 6 },
    { id: '2', title: 'Powerlifting Peak Block', weeks: '6 Weeks', difficulty: 'Advanced', assignedCount: 4 },
    { id: '3', title: 'Base Fitness & Mobility', weeks: '8 Weeks', difficulty: 'Beginner', assignedCount: 8 },
  ];

  return (
    <ScreenContainer>
      <Header title="Training Plans" subtitle="Build and manage template routines" />

      <TouchableOpacity style={styles.createBtn} activeOpacity={0.8}>
        <Plus size={18} color="#0B0F17" />
        <Text style={styles.createBtnText}>Build New Plan Template</Text>
      </TouchableOpacity>

      {plans.map((p) => (
        <Card key={p.id}>
          <View style={styles.planHeader}>
            <BookOpen size={20} color="#C084FC" />
            <Text style={styles.planTitle}>{p.title}</Text>
          </View>

          <View style={styles.tagsRow}>
            <Badge label={p.weeks} variant="purple" />
            <Badge label={p.difficulty} variant="blue" />
          </View>

          <Text style={styles.assignedText}>{p.assignedCount} Athletes currently assigned</Text>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  createBtn: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    marginBottom: 16,
  },
  createBtnText: {
    color: '#0B0F17',
    fontWeight: '700',
    fontSize: 15,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  assignedText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
