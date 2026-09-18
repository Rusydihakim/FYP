import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { Header } from '../../components/ui/Header';
import { Card } from '../../components/ui/Card';
import { Send, User } from 'lucide-react-native';

export const AthleteMessagesScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Coach Marcus', text: 'Great work on the bench press PR today!', time: '10:14 AM' },
    { id: '2', sender: 'You', text: 'Thanks Coach! Feeling strong for tomorrow leg session.', time: '10:16 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), sender: 'You', text: input.trim(), time: 'Just now' },
    ]);
    setInput('');
  };

  return (
    <ScreenContainer>
      <Header title="Coach Chat" subtitle="Direct line with Coach Marcus" />

      {messages.map((m) => (
        <Card
          key={m.id}
          style={m.sender === 'You' ? styles.myMsgCard : styles.coachMsgCard}
        >
          <Text style={styles.sender}>{m.sender}</Text>
          <Text style={styles.text}>{m.text}</Text>
          <Text style={styles.time}>{m.time}</Text>
        </Card>
      ))}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#6B7280"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={18} color="#0B0F17" />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  coachMsgCard: {
    backgroundColor: '#1E293B',
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  myMsgCard: {
    backgroundColor: '#064E3B',
    borderColor: '#047857',
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  sender: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#F9FAFB',
    lineHeight: 20,
  },
  time: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#374151',
    color: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendBtn: {
    backgroundColor: '#10B981',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
