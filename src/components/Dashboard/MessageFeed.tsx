import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Bell, Send, MoreVertical } from 'lucide-react';

interface Message {
  sender: string;
  time: string;
  message: string;
  status: 'urgent' | 'new' | 'pending';
  badge?: number;
}

const MessageFeed = () => {
  const messages: Message[] = [
    {
      sender: 'Dr. Lila Ramirez',
      time: '9:00 AM',
      message: 'Please ensure the monthly attendance report is accurate before the April 30th deadline.',
      status: 'urgent'
    },
    {
      sender: 'Ms. Heather Morris',
      time: '10:15 AM',
      message: "Don't forget the staff training on digital tools scheduled for May 5th at 3 PM in the...",
      badge: 4,
      status: 'new'
    },
    {
      sender: 'Mr. Carl Jenkins',
      time: '2:00 PM',
      message: 'Budget review meeting for the next fiscal year is on April 28th at 10 AM.',
      status: 'pending'
    },
    {
      sender: 'Officer Dan Brooks',
      time: '3:10 PM',
      message: 'Review the updated security protocols effective May 1st. Familiarize yourself with...',
      status: 'new'
    },
    {
      sender: 'Ms. Tina Goldberg',
      time: '5:00 PM',
      message: 'Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.',
      badge: 3,
      status: 'urgent'
    },
  ];

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const getStatusBadge = (status: 'urgent' | 'new' | 'pending'): string => {
    const styles = {
      urgent: 'bg-red-50 text-red-700 border-red-200',
      new: 'bg-blue-50 text-blue-700 border-blue-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return `${styles[status]} text-xs px-2 py-1 rounded-full border`;
  };

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Here you would typically send the reply to your backend
      console.log(`Replying to ${selectedMessage.sender}: ${replyText}`);
      setReplyText('');
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-lg bg-white border border-gray-100">
      <CardHeader className="bg-white py-6 px-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Messages</CardTitle>
            <p className="text-sm text-gray-500 mt-1">You have 3 unread messages</p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10 ring-2 ring-gray-100">
                      <AvatarImage src={`/api/placeholder/40/40`} alt="Avatar" />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        {message.sender.split(' ').map((name) => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{message.sender}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">{message.time}</span>
                          <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{message.message}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className={getStatusBadge(message.status)}>
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                        {message.badge && (
                          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
                            {message.badge} updates
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg bg-white p-0">
            <div className="p-6 border-b border-gray-100">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {selectedMessage.sender}
              </DialogTitle>
              <div className="mt-2 text-sm text-gray-500">
                {selectedMessage.time}
              </div>
              <DialogDescription className="mt-4 text-gray-600 leading-relaxed">
                {selectedMessage.message}
              </DialogDescription>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full min-h-[100px] p-4 pr-12 text-gray-600 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                />
                <button
                  onClick={handleReply}
                  className="absolute right-4 bottom-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setSelectedMessage(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={handleReply}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

export default MessageFeed;