import { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../hooks/useAuth';

export default function AthleteMessages() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'You', text: 'Hey coach, my knee is feeling much better!', isSelf: true, time: '10:30 AM' },
    { id: 2, sender: 'Coach Mike', text: 'That is great news Sarah. Let\'s slightly increase the load on squats today.', isSelf: false, time: '10:35 AM' },
  ]);

  useEffect(() => {
    if (!user) return;

    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('sent_at', { ascending: true });

      if (!error && data && data.length > 0) {
         setMessages(data.map(m => ({
            id: m.id,
            sender: m.sender_id === user.id ? 'You' : 'Coach',
            text: m.content,
            isSelf: m.sender_id === user.id,
            time: new Date(m.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
         })));
      }
    };
    fetchMessages();

    // Subscribe to realtime messages
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
          sender: 'Coach',
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
    
    // Optimistic UI update
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: textToSend, isSelf: true, time: 'Now' }]);

    // In a real app we'd have a selected coach ID, using a mock ID here
    const mockCoachId = '00000000-0000-0000-0000-000000000000';
    
    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: mockCoachId, // Should be selected coach
      content: textToSend
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-surface2 border border-border rounded-xl overflow-hidden text-text">
      
      {/* Sidebar Threads - For athlete, usually just their coach, maybe an AI bot */}
      <div className="w-64 border-r border-border bg-surface flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold font-display text-lg">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-surface2 border-l-4 border-l-green-500 cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="bg-blue-900 rounded-full p-2 text-blue-200">
                  <User className="h-5 w-5" />
               </div>
               <div>
                  <h3 className="font-semibold text-white">Coach Mike</h3>
                  <p className="text-xs text-gray-400">Active now</p>
               </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-surface2 border-l-4 border-l-transparent cursor-pointer transition border-t border-border/50">
            <div className="flex items-center gap-3">
               <div className="bg-purple-900 rounded-full p-2 text-purple-200">
                  <span className="font-bold px-1">AI</span>
               </div>
               <div>
                  <h3 className="font-semibold text-white">AthleteFit Bot</h3>
                  <p className="text-xs text-gray-400">Support & Tips</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface2">
        <div className="p-4 border-b border-border bg-surface flex items-center md:hidden gap-4">
           <div className="bg-blue-900 rounded-full p-2 text-blue-200">
              <User className="h-5 w-5" />
           </div>
           <h2 className="font-bold text-white text-lg">Coach Mike</h2>
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
              placeholder="Message your coach..." 
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
