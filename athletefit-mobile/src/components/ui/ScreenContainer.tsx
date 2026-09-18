import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scrollable = true }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />
      {scrollable ? (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.content]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F17',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0F17',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});
