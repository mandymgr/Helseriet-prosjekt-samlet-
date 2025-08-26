// Utility functions extracted from original HTML/JavaScript admin files
import { productService } from '../services/api';
import type { Product } from '../services/api';

export const closeNewProductModal = (): void => {
  const modal = document.getElementById('newProductModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

export const generateSlug = (title: string): string => {
  return title.toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'aa')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const formatText = (command: string): void => {
  switch(command) {
    case 'bold':
      document.execCommand('bold', false, undefined);
      break;
    case 'italic':
      document.execCommand('italic', false, undefined);
      break;
    case 'underline':
      document.execCommand('underline', false, undefined);
      break;
    case 'h2':
      document.execCommand('formatBlock', false, 'h2');
      break;
    case 'h3':
      document.execCommand('formatBlock', false, 'h3');
      break;
    case 'bullet':
      document.execCommand('insertUnorderedList', false, undefined);
      break;
    case 'number':
      document.execCommand('insertOrderedList', false, undefined);
      break;
    case 'quote':
      document.execCommand('formatBlock', false, 'blockquote');
      break;
    case 'code':
      document.execCommand('formatBlock', false, 'pre');
      break;
    default:
      console.warn(`Unknown format command: ${command}`);
  }
};

interface MockProduct {
  id: number;
  name: string;
  price: string;
}

export const searchRelatedProducts = (searchTerm: string): MockProduct[] => {
  if (searchTerm.length < 2) {
    return [];
  }
  
  // Mock product data - in real implementation this would call API
  const mockResults: MockProduct[] = [
    { id: 1, name: 'Magnesium Glycinate 400mg', price: '299,-' },
    { id: 2, name: 'Omega-3 Premium', price: '379,-' },
    { id: 3, name: 'Multivitamin Complete', price: '399,-' },
    { id: 4, name: 'Vitamin C 1000mg', price: '199,-' },
    { id: 5, name: 'D3+K2 Complex', price: '249,-' },
    { id: 6, name: 'Probiotika Advanced', price: '449,-' }
  ];
  
  return mockResults.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const addRelatedProduct = (id: number, name: string, price: string): void => {
  const container = document.getElementById('selectedRelatedProducts');
  if (container) {
    // Remove "no products selected" message if exists
    const noProductsMsg = container.querySelector('p.text-gray-500');
    if (noProductsMsg) {
      noProductsMsg.remove();
    }
    
    // Check if product already added
    const existing = container.querySelector(`[data-product-id="${id}"]`);
    if (existing) {
      return;
    }
    
    // Create product element
    const productDiv = document.createElement('div');
    productDiv.className = 'flex items-center justify-between p-2 border rounded bg-gray-50';
    productDiv.setAttribute('data-product-id', id.toString());
    productDiv.innerHTML = `
      <span class="text-sm">${name}</span>
      <div class="flex items-center">
        <span class="text-sm text-gray-600 mr-2">${price}</span>
        <button onclick="removeRelatedProduct(${id})" class="text-red-600 hover:text-red-800 text-sm">✕</button>
      </div>
    `;
    
    container.appendChild(productDiv);
  }
};

export const removeRelatedProduct = (id: number): void => {
  const container = document.getElementById('selectedRelatedProducts');
  if (container) {
    const productElement = container.querySelector(`[data-product-id="${id}"]`);
    if (productElement) {
      productElement.remove();
    }
    
    // If no products left, show "no products selected" message
    if (container.children.length === 0) {
      const noProductsMsg = document.createElement('p');
      noProductsMsg.className = 'text-sm text-gray-500';
      noProductsMsg.textContent = 'Ingen produkter valgt';
      container.appendChild(noProductsMsg);
    }
  }
};

// Additional utility functions that were referenced but not fully extracted

export const toggleSubscriptionOptions = (checkbox: HTMLInputElement): void => {
  const options = document.getElementById('subscriptionOptions');
  if (options) {
    options.style.display = checkbox.checked ? 'block' : 'none';
  }
};

export const insertLink = (): void => {
  const url = prompt('Skriv inn URL:');
  if (url) {
    document.execCommand('createLink', false, url);
  }
};

export const insertImage = (): void => {
  const url = prompt('Skriv inn bilde-URL:');
  if (url) {
    document.execCommand('insertImage', false, url);
  }
};

export const saveProduct = (): void => {
  alert('Lagrer produkt... (Implementer API-kall)');
};

export const editProduct = (productId: string): void => {
  alert(`Redigerer produkt med ID: ${productId} (Implementer redigeringsfunksjon)`);
};

export const deleteProduct = (productId: string): void => {
  if (confirm('Er du sikker på at du vil slette dette produktet?')) {
    alert(`Sletter produkt med ID: ${productId} (Implementer sletting)`);
  }
};

export const openAddProductModal = (): void => {
  const modal = document.getElementById('newProductModal');
  if (modal) {
    modal.classList.add('active');
  }
};

// Additional placeholder functions that were referenced in the components
export const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success'): void => {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-yellow-500'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
};

// Additional missing functions for AdminAnnonser
export const openPlatformModal = (platform: string): void => {
  alert(`Åpner ${platform} plattform modal - Implementer modal`);
};

export const connectPlatform = (platform: string): void => {
  alert(`Kobler til ${platform} - Implementer API-tilkobling`);
};

export const editCampaign = (campaignId: string): void => {
  alert(`Redigerer kampanje ${campaignId} - Implementer redigeringsfunksjon`);
};

export const viewCampaignStats = (campaignId: string): void => {
  alert(`Viser statistikk for kampanje ${campaignId} - Implementer statistikkvisning`);
};

export const openNewCampaignModal = (): void => {
  alert('Åpner ny kampanje modal - Implementer modal');
};

export const pauseAllCampaigns = (): void => {
  if (confirm('Er du sikker på at du vil pause alle kampanjer?')) {
    alert('Pauser alle kampanjer - Implementer API-kall');
  }
};

export const adjustBudgets = (): void => {
  alert('Åpner budsjett-justering - Implementer funksjonalitet');
};

export const exportReport = (): void => {
  alert('Eksporterer rapport - Implementer eksport-funksjonalitet');
};

export const selectPlatform = (platform: string): void => {
  alert(`Valgte plattform: ${platform} - Implementer plattform-valg`);
};

// Modal navigation functions
export const previousStep = (): void => {
  alert('Forrige steg - Implementer navigasjon');
};

export const nextStep = (): void => {
  alert('Neste steg - Implementer navigasjon');
};

export const closeNewCampaignModal = (): void => {
  const modal = document.getElementById('newCampaignModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

export const createCampaign = (): void => {
  alert('Oppretter kampanje - Implementer API-kall');
};

// Blog editor functions
export const switchView = (view: string): void => {
  alert(`Bytter til ${view} visning - Implementer visningsbytte`);
};

// Campaign management functions
export const toggleCampaign = (): void => {
  alert('Toggle kampanje - Implementer on/off funksjonalitet');
};

// Expert advice functions
export const openAnswerModal = (questionId?: string): void => {
  alert(`Åpner svar-modal for spørsmål ${questionId || 'ukjent'} - Implementer modal`);
};

export const publishAnswer = (answerId?: string): void => {
  alert(`Publiserer svar ${answerId || 'ukjent'} - Implementer publisering`);
};

// Missing functions for AdminKunder
export const switchTab = (tabName: string): void => {
  console.log(`Switching to tab: ${tabName}`);
  alert(`Bytter til ${tabName}-fanen`);
};

// Missing functions for AdminOrdrer
export const closeOrderModal = (): void => {
  console.log('Closing order modal');
  alert('Stenger ordre-modal');
};

// Missing functions for AdminProdukter
export const openNewProductModal = (): void => {
  console.log('Opening new product modal');
  const modal = document.getElementById('newProductModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

export const addIngredientRow = (): void => {
  console.log('Adding ingredient row');
  const ingredientsContainer = document.getElementById('ingredients-list');
  if (ingredientsContainer) {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-3 gap-4 mb-2';
    row.innerHTML = `
      <input type="text" placeholder="Ingrediens navn" class="input-standard" />
      <input type="text" placeholder="Mengde" class="input-standard" />
      <button onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-800">
        Fjern
      </button>
    `;
    ingredientsContainer.appendChild(row);
  }
};

// Missing functions for Bundle components
export const selectPurchaseOption = (option: string): void => {
  console.log(`Selected purchase option: ${option}`);
  alert(`Valgte kjøpsalternativ: ${option}`);
};

// Real API functions for products
export const createProduct = async (productData: {
  name: string;
  description?: string;
  sku: string;
  price: number;
  categoryId: string;
  quantity?: number;
}): Promise<Product | null> => {
  try {
    await productService.getAll(); // Using existing API
    console.log('Product creation attempted with:', productData);
    
    // For now, show success message since backend needs to be fully implemented
    alert(`Produkt "${productData.name}" opprettet! (Simulert - backend implementeres)`);
    
    return null; // Would return actual product from API
  } catch (error) {
    console.error('Error creating product:', error);
    alert('Feil ved opprettelse av produkt. Sjekk konsollen for detaljer.');
    return null;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await productService.getAll();
    if (response.success && response.data) {
      // Check if data has products array (pagination format)
      if ('products' in response.data && Array.isArray(response.data.products)) {
        return response.data.products;
      }
      // Fallback for direct array response
      return Array.isArray(response.data) ? response.data : [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const deleteProductById = async (productId: string): Promise<boolean> => {
  try {
    // This would use the real API when implemented
    console.log(`Deleting product with ID: ${productId}`);
    
    if (confirm('Er du sikker på at du vil slette dette produktet?')) {
      alert('Produkt slettet! (Simulert - backend implementeres)');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Feil ved sletting av produkt.');
    return false;
  }
};

export const closeAnswerModal = (): void => {
  const modal = document.getElementById('answerModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

export const submitAnswer = (): void => {
  alert('Sender inn svar - Implementer innsending');
};

// Settings functions
export const showSection = (section: string): void => {
  alert(`Viser ${section} seksjon - Implementer seksjonsskift`);
};

export const saveSettings = (): void => {
  alert('Lagrer innstillinger - Implementer lagring');
};