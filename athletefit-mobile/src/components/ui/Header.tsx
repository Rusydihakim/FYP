import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, switchRoleDemo } = useAuth();

  const handleRoleToggle = () => {
    if (!user) return;
    const nextRole = user.role === 'Athlete' ? 'Coach' : user.role === 'Coach' ? 'Admin' : 'Athlete';
    switchRoleDemo(nextRole);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {user && (
        <TouchableOpacity onPress={handleRoleToggle} activeOpacity={0.7}>
          <Badge label={user.role} role={user.role} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F3F4F6',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
