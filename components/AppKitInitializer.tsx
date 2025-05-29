'use client';

import { useEffect } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { wagmiAdapter, projectId, networks } from '@/config/appkit';

// Create a singleton instance of AppKit
let appKitInstance: ReturnType<typeof createAppKit> | null = null;

export function AppKitInitializer() {
  useEffect(() => {
    if (!appKitInstance) {
      appKitInstance = createAppKit({
        adapters: [wagmiAdapter],
        projectId,
        networks,
        metadata: {
          name: 'PeerPesa',
          description: 'PeerPesa Web3 Application',
          url: 'https://peerpesa.com',
          icons: ['https://peerpesa.com/icon.png']
        },
        themeMode: 'light',
        features: {
          analytics: true
        }
      });
    }
  }, []);

  return null;
} 