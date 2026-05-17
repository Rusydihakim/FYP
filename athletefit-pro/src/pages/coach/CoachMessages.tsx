import { useState, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../hooks/useAuth';

export default function CoachMessages() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'Sarah Connor', text: 'Hey coach, my knee is feeling much better!', isSelf: false, time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'That is great news Sarah. Let\'s slightly increase the load on squats today.', isSelf: true, time: '10:35 AM' },
  ]);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('sent_at', { ascending: true });

      if (!error && data && data.length > 0) {
         setMessages(data.map(m => ({
            id: m.id,
            sender: m.sender_id === user.id ? 'You' : 'Athlete',
            text: m.content,
            isSelf: m.sender_id === user.id,
            time: new Date(m.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
         })));
      }
    };
    fetchMessages();

    const channel = supabase
      .channel('messages-room')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${user.id}`,
      }, (payload) => {
        const newMsg = payload.new;
        setMessages(prev => [...prev, {
          id: newMsg.id,
          sender: 'Athlete',
          text: newMsg.content,
          isSelf: false,
          time: new Date(newMsg.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!msg.trim() || !user) return;
    
    const textToSend = msg;
    setMsg('');
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: textToSend, isSelf: true, time: 'Now' }]);

    // In a real app we'd use the selected athlete's ID
    const mockAthleteId = '00000000-0000-0000-0000-000000000001';
    
    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: mockAthleteId,
      content: textToSend
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-surface2 border border-border rounded-xl overflow-hidden text-text">
      
      {/* Sidebar Threads */}
      <div className="w-80 border-r border-border bg-surface flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search athletes..." 
              className="w-full bg-surface2 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-green-500" 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {['Sarah Connor', 'John Smith', 'Emily Davis'].map((name, i) => (
            <div key={name} className={`p-4 border-b border-border cursor-pointer transition ${i === 0 ? 'bg-surface2 border-l-4 border-l-green-500' : 'hover:bg-surface2 border-l-4 border-l-transparent'}`}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-white">{name}</h3>
                <span className="text-xs text-gray-500">10:30 AM</span>
              </div>
              <p className="text-sm text-gray-400 truncate">Hey coach, my knee is feeling much better...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface2">
        <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
          <h2 className="font-bold text-white text-lg">Sarah Connor</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">View Profile</button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-gray-500 mb-1">{m.sender} • {m.time}</span>
              <div className={`px-4 py-2 rounded-2xl max-w-md ${m.isSelf ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-surface border border-border text-gray-200 rounded-bl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-surface">
          <form onSubmit={handleSend} className="flex space-x-2">
            <input 
              type="text" 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-surface2 border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" 
            />
            <button type="submit" className="bg-green-500 hover:bg-green-400 text-bg p-2 rounded-lg transition">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
