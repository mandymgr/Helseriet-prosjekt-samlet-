// Test API Connection
import { healthCheck, productService } from './api';

export const testApiConnection = async () => {
  console.log('🔄 Testing API connection...');
  
  try {
    // Test health endpoint
    console.log('📊 Testing health endpoint...');
    const healthResult = await healthCheck();
    console.log('✅ Health check:', healthResult);
    
    // Test products endpoint
    console.log('📦 Testing products endpoint...');
    const productsResult = await productService.getAll({ limit: 5 });
    console.log('✅ Products response:', {
      success: productsResult.success,
      dataLength: Array.isArray(productsResult.data) ? productsResult.data.length : 'not array',
      firstProduct: Array.isArray(productsResult.data) && productsResult.data.length > 0 ? {
        id: productsResult.data[0].id,
        name: productsResult.data[0].name,
        price: productsResult.data[0].price
      } : 'no products'
    });
    
    return {
      success: true,
      health: healthResult,
      productsCount: Array.isArray(productsResult.data) ? productsResult.data.length : 0
    };
    
  } catch (error: any) {
    console.error('❌ API Connection Error:', error);
    return {
      success: false,
      error: error.message,
      details: error
    };
  }
};