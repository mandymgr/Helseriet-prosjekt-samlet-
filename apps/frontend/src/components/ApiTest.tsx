import React, { useState, useEffect } from 'react';
import { testApiConnection } from '../services/testConnection';

export const ApiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    runTest();
  }, []);

  const runTest = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await testApiConnection();
      setTestResult(result);
      
      if (!result.success) {
        setError(result.error || 'API connection failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setTestResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white organic-border minimal-shadow max-w-2xl mx-auto">
      <h2 className="text-3xl font-light mb-6 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
        🔌 Backend API Connection Test
      </h2>
      
      {loading && (
        <div className="text-sage mb-4 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage"></div>
          Testing API connection...
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          <strong>❌ Connection Failed:</strong> {error}
        </div>
      )}
      
      {testResult?.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-4">
          <strong>✅ Backend Connected Successfully!</strong>
          <div className="mt-3 text-sm space-y-1">
            <p><strong>Health Status:</strong> {testResult.health?.status}</p>
            <p><strong>Server Uptime:</strong> {Math.round(testResult.health?.uptime || 0)}s</p>
            <p><strong>Products Available:</strong> {testResult.productsCount} products found</p>
            <p><strong>API URL:</strong> http://localhost:3001/api</p>
          </div>
        </div>
      )}
      
      {!loading && (
        <div className="space-y-4">
          <button
            onClick={runTest}
            disabled={loading}
            className="bg-sage text-white px-6 py-3 organic-border hover:bg-sage/90 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Testing...' : '🔄 Test Connection Again'}
          </button>
          
          <div className="text-sm text-charcoal/60">
            <p><strong>Backend Status:</strong> {testResult?.success ? '🟢 Running' : '🔴 Not Connected'}</p>
            <p><strong>Expected URL:</strong> http://localhost:3001</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;