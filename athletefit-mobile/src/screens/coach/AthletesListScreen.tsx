import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { User, ChevronRight } from 'lucide-react-native';

export const AthletesListScreen: React.FC = () => {
  const athletes = [
    { id: '1', name: 'Alex Rivera', role: 'Athlete', status: 'Active', plan: 'Hypertrophy Phase 2' },
    { id: '2', name: 'Jordan Lee', role: 'Athlete', status: 'Active', plan: 'Powerlifting Peak' },
    { id: '3', name: 'Taylor Swift', role: 'Athlete', status: 'Inactive', plan: 'Endurance Block' },
  ];

  return (
    <ScreenContainer>
      <Header title="My Athletes" subtitle="Roster management & individual plans" />

      {athletes.map((a) => (
        <Card key={a.id}>
          <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
            <View style={styles.avatar}>
              <User size={20} color="#9CA3AF" />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{a.name}</Text>
              <Text style={styles.plan}>{a.plan}</Text>
            </View>
            <Badge label={a.status} variant={a.status === 'Active' ? 'emerald' : 'gray'} />
            <ChevronRight size={18} color="#6B7280" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  plan: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
