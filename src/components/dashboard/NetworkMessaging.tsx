import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase';

export function NetworkMessaging({ contact, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const subscription = useRef(null);

  useEffect(() => {
    loadMessages();
    subscribeToMessages();

    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe();
      }
    };
  }, [contact.id]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${contact.id},receiver_id.eq.${contact.id}`)
      .order('created_at', { ascending: true });

    setMessages(data || []);
    scrollToBottom();
  };

  const subscribeToMessages = () => {
    subscription.current = supabase
      .channel('messages')
      .on('INSERT', payload => {
        if (payload.new.sender_id === contact.id || 
            payload.new.receiver_id === contact.id) {
          setMessages(prev => [...prev, payload.new]);
          scrollToBottom();
        }
      })
      .subscribe();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await supabase.from('messages').insert({
        sender_id: 'current_user_id', // Replace with actual user ID
        receiver_id: contact.id,
        content: newMessage,
        type: 'text'
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="messaging-container">
      <div className="messaging-header">
        <h3>{contact.profile.full_name}</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`message ${
              message.sender_id === 'current_user_id' ? 'sent' : 'received'
            }`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {new Date(message.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
} 