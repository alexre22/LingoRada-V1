"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MoreVertical, Send } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isSender: boolean;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

export default function MessagesPage() {
  // Mock data for conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "Emma Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      },
      lastMessage: "Hey, would you like to practice Spanish tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: true,
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      lastMessage: "Thanks for the language exchange yesterday!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      unread: false,
    },
    {
      id: "3",
      user: {
        id: "user3",
        name: "Sofia Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      },
      lastMessage: "I found a great café where we can practice Italian",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      unread: false,
    },
    {
      id: "4",
      user: {
        id: "user4",
        name: "Hiroshi Tanaka",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
      },
      lastMessage: "Are you free this weekend for language practice?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: false,
    },
    {
      id: "5",
      user: {
        id: "user5",
        name: "Aisha Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      },
      lastMessage: "I'm looking forward to our Hindi practice session",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      unread: false,
    },
  ]);

  // Mock data for messages in active conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      content: "Hey, how's your Spanish practice going?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isSender: false,
    },
    {
      id: "m2",
      content: "It's going well! I've been using that app you recommended.",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isSender: true,
    },
    {
      id: "m3",
      content:
        "That's great to hear! Would you like to practice together tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isSender: false,
    },
    {
      id: "m4",
      content: "Yes, that would be perfect. What time works for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isSender: true,
    },
    {
      id: "m5",
      content: "How about 3pm at the café near the library?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isSender: false,
    },
    {
      id: "m6",
      content: "Sounds good! I'll see you there.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isSender: true,
    },
  ]);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) {
      return formatTime(date);
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      content: newMessage,
      timestamp: new Date(),
      isSender: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleOpenConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);

    // Mark conversation as read
    if (conversation.unread) {
      setConversations(
        conversations.map((conv) =>
          conv.id === conversation.id ? { ...conv, unread: false } : conv,
        ),
      );
    }
  };

  const handleBackToList = () => {
    setActiveConversation(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {!activeConversation ? (
        // Conversations List View
        <div className="flex flex-col h-full">
          <div className="p-4 border-b sticky top-0 bg-background z-10">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              <div className="divide-y">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-accent/50 ${conversation.unread ? "bg-accent/20" : ""}`}
                    onClick={() => handleOpenConversation(conversation)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                      />
                      <AvatarFallback>
                        {conversation.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3
                          className={`font-medium truncate ${conversation.unread ? "font-semibold" : ""}`}
                        >
                          {conversation.user.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                      >
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <p className="text-muted-foreground mb-2">No messages yet</p>
                <p className="text-sm text-muted-foreground">
                  Start a conversation by discovering users
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Chat View
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background z-10">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={handleBackToList}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={activeConversation.user.avatar}
                    alt={activeConversation.user.name}
                  />
                  <AvatarFallback>
                    {activeConversation.user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {activeConversation.user.name}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  Block user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    message.isSender
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-accent text-accent-foreground rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isSender
                        ? "text-primary-foreground/70"
                        : "text-accent-foreground/70"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t sticky bottom-16 bg-background z-10">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
