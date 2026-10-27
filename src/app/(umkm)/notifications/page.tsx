"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import { Bell, Check, Info, BookOpen, Activity, FileText } from 'lucide-react';

export default function NotificationsPage() {
  const { data, updateData } = useDemo();
  const notifications = data.notifications;

  const handleMarkAllRead = () => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
  };

  const handleMarkRead = (id: string) => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'score': return <Activity className="w-5 h-5" />;
      case 'literacy': return <BookOpen className="w-5 h-5" />;
      case 'financing': return <FileText className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pusat Notifikasi</h2>
          <p className="text-muted-foreground mt-1">Pemberitahuan sistem dan update simulasi (Demo).</p>
        </div>
        <Button onClick={handleMarkAllRead} variant="outline" className="text-sigap-primary border-sigap-primary/30">
          <Check className="w-4 h-4 mr-2" />
          Tandai Semua Dibaca
        </Button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-6 flex gap-4 transition-colors ${n.read ? 'bg-white opacity-70' : 'bg-blue-50/30'}`}
              onClick={() => !n.read && handleMarkRead(n.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-gray-100 text-gray-500' : 'bg-sigap-primary/10 text-sigap-primary'}`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-base ${n.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{n.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className={`text-sm ${n.read ? 'text-gray-500' : 'text-gray-700'}`}>{n.message}</p>
                {!n.read && (
                  <div className="mt-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-sigap-primary"></span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p>Tidak ada notifikasi saat ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
