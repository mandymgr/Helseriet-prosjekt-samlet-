import React, { useState } from 'react';
import { HiOutlineExclamationTriangle, HiOutlineTrash } from 'react-icons/hi2';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  requireTyping?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'danger',
  confirmText = 'Bekreft',
  requireTyping
}) => {
  const [typedText, setTypedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    if (requireTyping && typedText !== requireTyping) {
      return;
    }
    
    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
      setTypedText('');
    } catch (error) {
      console.error('Confirmation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setTypedText('');
    onClose();
  };

  if (!isOpen) return null;

  const isTypingValid = !requireTyping || typedText === requireTyping;

  const typeStyles = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      border: 'border-red-200'
    },
    warning: {
      icon: 'text-amber-500',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
      border: 'border-amber-200'
    },
    info: {
      icon: 'text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      border: 'border-blue-200'
    }
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Dialog */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}>
              {type === 'danger' ? (
                <HiOutlineTrash className={`h-6 w-6 ${styles.icon}`} />
              ) : (
                <HiOutlineExclamationTriangle className={`h-6 w-6 ${styles.icon}`} />
              )}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-4">
                  {message}
                </p>

                {type === 'danger' && (
                  <div className={`border-l-4 ${styles.border} bg-red-50 p-4 mb-4`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <HiOutlineExclamationTriangle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          ADVARSEL: Farlig operasjon!
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>Denne handlingen kan ikke angres og vil permanent slette data fra databasen.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {requireTyping && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      For å fortsette, skriv: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{requireTyping}</span>
                    </label>
                    <input
                      type="text"
                      value={typedText}
                      onChange={(e) => setTypedText(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder={`Skriv "${requireTyping}" for å bekrefte`}
                      disabled={isProcessing}
                    />
                    {requireTyping && typedText && typedText !== requireTyping && (
                      <p className="mt-1 text-sm text-red-600">Teksten matcher ikke</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              disabled={!isTypingValid || isProcessing}
              onClick={handleConfirm}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
            >
              {isProcessing ? 'Behandler...' : confirmText}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isProcessing}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};