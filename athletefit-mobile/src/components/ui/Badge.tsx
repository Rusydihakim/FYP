import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserRole } from '../../types/auth';

interface BadgeProps {
  label: string;
  role?: UserRole;
  variant?: 'emerald' | 'amber' | 'blue' | 'purple' | 'gray';
}

export const Badge: React.FC<BadgeProps> = ({ label, role, variant }) => {
  const getColors = () => {
    if (role === 'Coach') return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#1E40AF' };
    if (role === 'Admin') return { bg: 'rgba(168, 85, 247, 0.15)', text: '#C084FC', border: '#6B21A8' };
    if (role === 'Athlete' || variant === 'emerald') return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: '#065F46' };
    if (variant === 'amber') return { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#92400E' };
    return { bg: 'rgba(107, 114, 128, 0.15)', text: '#9CA3AF', border: '#374151' };
  };

  const colors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
