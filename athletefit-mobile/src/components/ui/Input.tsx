import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    color: '#F9FAFB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 4,
  },
});
