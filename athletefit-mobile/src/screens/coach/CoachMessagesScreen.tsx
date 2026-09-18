import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { MessageSquare, User } from 'lucide-react-native';

export const CoachMessagesScreen: React.FC = () => {
  const conversations = [
    { id: '1', athlete: 'Alex Rivera', lastMsg: 'Thanks Coach! Feeling strong for tomorrow leg session.', time: '10:16 AM', unread: 0 },
    { id: '2', athlete: 'Jordan Lee', lastMsg: 'Should I decrease weight on squats today?', time: 'Yesterday', unread: 2 },
  ];

  return (
    <ScreenContainer>
      <Header title="Athlete Chat Hub" subtitle="Real-time messages from active roster" />

      {conversations.map((c) => (
        <Card key={c.id}>
          <TouchableOpacity style={styles.row} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <User size={20} color="#9CA3AF" />
            </View>
            <View style={styles.msgContent}>
              <View style={styles.topLine}>
                <Text style={styles.athleteName}>{c.athlete}</Text>
                <Text style={styles.timeText}>{c.time}</Text>
              </View>
              <Text style={styles.lastMsg} numberOfLines={1}>{c.lastMsg}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContent: {
    flex: 1,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  lastMsg: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
