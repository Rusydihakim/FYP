import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users, FileText, CheckCircle, AlertCircle } from 'lucide-react-native';

export const CoachDashboardScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="Coach Portal" subtitle="Manage athletes, training plans & progress" />

      {/* Roster Overview */}
      <View style={styles.grid}>
        <Card style={styles.statCard}>
          <Users size={22} color="#60A5FA" />
          <Text style={styles.statNum}>18</Text>
          <Text style={styles.statLabel}>Active Athletes</Text>
        </Card>

        <Card style={styles.statCard}>
          <FileText size={22} color="#C084FC" />
          <Text style={styles.statNum}>6</Text>
          <Text style={styles.statLabel}>Training Plans</Text>
        </Card>
      </View>

      {/* Roster List Preview */}
      <Text style={styles.sectionTitle}>Athlete Activity Today</Text>
      <Card>
        <View style={styles.athleteRow}>
          <View>
            <Text style={styles.athleteName}>Alex Rivera</Text>
            <Text style={styles.planName}>Hypertrophy Phase 2</Text>
          </View>
          <Badge label="Completed" variant="emerald" />
        </View>
      </Card>

      <Card>
        <View style={styles.athleteRow}>
          <View>
            <Text style={styles.athleteName}>Jordan Lee</Text>
            <Text style={styles.planName}>Powerlifting Peak</Text>
          </View>
          <Badge label="Pending Review" variant="amber" />
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 10,
    marginTop: 6,
  },
  athleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  athleteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  planName: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
