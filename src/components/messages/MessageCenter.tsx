import { useState } from 'react';

export function MessageCenter() {
  const [messages] = useState([
    {
      id: 1,
      from: '0x1234...5678',
      subject: 'Garden Maintenance Task',
      preview: 'Hi, I saw your task posting...',
      date: '2h ago'
    },
    {
      id: 2,
      from: '0x8765...4321',
      subject: 'Photography Session',
      preview: 'Thanks for the lesson yesterday...',
      date: '1d ago'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {messages.map(message => (
        <div
          key={message.id}
          className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium">{message.subject}</h3>
            <span className="text-sm text-gray-500">{message.date}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">From: {message.from}</p>
          <p className="text-sm text-gray-600">{message.preview}</p>
        </div>
      ))}
    </div>
  );
} 