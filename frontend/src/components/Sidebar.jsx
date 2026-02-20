"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Utensils, ShoppingBag, Heart, Star, Menu, LogOut, HandPlatter } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const tabs = [
    { 
      name: 'Request Food', 
      path: '/request-food',
      icon: <Utensils className="w-6 h-6 flex-shrink-0" />
    },
    { 
      name: 'My Orders', 
      path: '/my-orders',
      icon: <ShoppingBag className="w-6 h-6 flex-shrink-0" />
    },
    { 
      name: 'Favourites', 
      path: '/favourites',
      icon: <Heart className="w-6 h-6 flex-shrink-0" />
    },
    { 
      name: 'Ratings', 
      path: '/ratings',
      icon: <Star className="w-6 h-6 flex-shrink-0" />
    },
  ];

  const handleConfirmLogout = () => {
    // Perform any actual logout logic here (clearing tokens, etc.)
    setShowLogoutModal(false);
    router.push('/');
  };

  return (
    <>
      <aside 
        className={`h-screen bg-gradient-to-b from-primary to-white shadow-lg sticky top-0 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header & Toggle Button */}
        <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-neutral-800`}>
          {!isCollapsed && (
            <Link href="/">
            <div className="flex items-center gap-2">
              <HandPlatter className="w-6 h-6 flex-shrink-0 text-background" />
              <span className="text-xl font-bold whitespace-nowrap overflow-hidden text-background font-lato">
                Feed-Forward
              </span>
            </div>
            </Link>
          )}

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-primary text-neutral-400 hover:text-white transition-colors flex-shrink-0"
          >
            <Menu className="w-6 h-6 flex-shrink-0 text-background" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 mt-6 overflow-hidden">
          <ul className="space-y-2 px-3">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <li key={tab.name}>
                  <Link
                    href={tab.path}
                    className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors text-background font-lato ${
                      isActive 
                        ? 'bg-secondary' 
                        : 'hover:bg-secondary/80'
                    } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                    title={isCollapsed ? tab.name : ""}
                  >
                    {tab.icon}
                    
                    {!isCollapsed && (
                      <span className="font-medium whitespace-nowrap">
                        {tab.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button Pinned to Bottom */}
        <div className="p-3 border-t border-neutral-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors font-lato text-neutral-400 hover:bg-red-500 hover:text-white cursor-pointer ${
              isCollapsed ? 'justify-center' : 'justify-start'
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap text-background">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal Overlay */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* Modal Box */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-sm w-full shadow-2xl mx-4">
            <h3 className="text-xl font-bold text-white mb-2 font-lato">Confirm Logout</h3>
            <p className="text-neutral-400 mb-6 font-lato">
              Are you sure you want to log out of FeedForward?
            </p>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-neutral-300 hover:bg-neutral-800 transition-colors font-lato cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors font-lato cursor-pointer"
              >
                Yes, Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}