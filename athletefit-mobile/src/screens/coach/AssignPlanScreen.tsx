import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckSquare } from 'lucide-react-native';

export const AssignPlanScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="Assign Workouts" subtitle="Assign training blocks to roster athletes" />

      <Card>
        <Text style={styles.sectionHeader}>1. Selected Plan</Text>
        <Text style={styles.planName}>Hypertrophy Phase 2 (4 Weeks)</Text>
      </Card>

      <Card>
        <Text style={styles.sectionHeader}>2. Target Athlete</Text>
        <View style={styles.athleteRow}>
          <CheckSquare size={20} color="#10B981" />
          <Text style={styles.athleteName}>Alex Rivera</Text>
        </View>
      </Card>

      <Button title="Confirm Plan Assignment" onPress={() => {}} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 6,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  athleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F3F4F6',
  },
});
