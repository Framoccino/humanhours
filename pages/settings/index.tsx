import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Settings, User, Bell, Shield, Wallet } from 'lucide-react';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-[#E6F1FF]">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-[#112240] rounded-lg shadow-lg border border-[#1E2D4D] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#E6F1FF]">
                Profile Settings
              </h2>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#1E2D4D] text-[#E6F1FF]">
                  <User className="inline-block w-5 h-5 mr-2" />
                  Account
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#1E2D4D] text-[#E6F1FF]">
                  <Bell className="inline-block w-5 h-5 mr-2" />
                  Notifications
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#1E2D4D] text-[#E6F1FF]">
                  <Shield className="inline-block w-5 h-5 mr-2" />
                  Privacy
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#1E2D4D] text-[#E6F1FF]">
                  <Wallet className="inline-block w-5 h-5 mr-2" />
                  Wallet
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-[#112240] rounded-lg shadow-lg border border-[#1E2D4D] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#E6F1FF]">Account Settings</h2>
              {/* Add settings form here */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 