import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { bg: '#1F2937', text: '#F3F4F6', border: '#374151' };
      case 'danger':
        return { bg: '#EF4444', text: '#FFFFFF', border: '#DC2626' };
      case 'outline':
        return { bg: 'transparent', text: '#10B981', border: '#10B981' };
      case 'primary':
      default:
        return { bg: '#10B981', text: '#0B0F17', border: '#059669' };
    }
  };

  const colors = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.bg, borderColor: colors.border },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
