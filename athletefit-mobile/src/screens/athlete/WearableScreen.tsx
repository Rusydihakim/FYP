import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Watch, Heart, Moon, Zap } from 'lucide-react-native';

export const WearableScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header title="Wearable Health" subtitle="Apple Health & Garmin Live Sync" />

      <Card>
        <View style={styles.header}>
          <View style={styles.deviceRow}>
            <Watch size={24} color="#60A5FA" />
            <View>
              <Text style={styles.deviceName}>Apple Watch Ultra 2</Text>
              <Text style={styles.statusText}>Connected • Synced 2m ago</Text>
            </View>
          </View>
          <Badge label="Active" variant="emerald" />
        </View>
      </Card>

      <Card>
        <View style={styles.metricRow}>
          <Moon size={20} color="#C084FC" />
          <View style={styles.metricText}>
            <Text style={styles.label}>Sleep Quality</Text>
            <Text style={styles.val}>8h 12m (88% Deep/REM)</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={styles.metricRow}>
          <Zap size={20} color="#FBBF24" />
          <View style={styles.metricText}>
            <Text style={styles.label}>Active Calories</Text>
            <Text style={styles.val}>840 kcal Today</Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  statusText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metricText: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  val: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F3F4F6',
    marginTop: 2,
  },
});
