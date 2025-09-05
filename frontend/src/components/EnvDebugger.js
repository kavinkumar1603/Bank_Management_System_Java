// This file helps verify that environment variables are loaded correctly
import React from 'react';

const EnvDebugger = () => {
  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px',
      padding: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999,
      display: 'none' // Set to 'block' to debug
    }}>
      <h4>Environment Variables Check:</h4>
      <p>API Key set: {process.env.REACT_APP_FIREBASE_API_KEY ? '✅' : '❌'}</p>
      <p>Auth Domain set: {process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? '✅' : '❌'}</p>
      <p>Project ID set: {process.env.REACT_APP_FIREBASE_PROJECT_ID ? '✅' : '❌'}</p>
      <p>Storage Bucket set: {process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? '✅' : '❌'}</p>
      <p>Messaging Sender ID set: {process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? '✅' : '❌'}</p>
      <p>App ID set: {process.env.REACT_APP_FIREBASE_APP_ID ? '✅' : '❌'}</p>
      <p>Measurement ID set: {process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ? '✅' : '❌'}</p>
    </div>
  );
};

export default EnvDebugger;
