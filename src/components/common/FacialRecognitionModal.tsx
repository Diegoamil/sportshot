import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, RotateCcw, Check } from 'lucide-react';
import SelfieModal from './SelfieModal';

interface FacialRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageSrc: string) => void;
}

const FacialRecognitionModal: React.FC<FacialRecognitionModalProps> = ({ 
  isOpen, 
  onClose, 
  onCapture 
}) => {
  const [selectedOption, setSelectedOption] = useState<'upload' | 'selfie' | null>(null);
  const [isSelfieModalOpen, setIsSelfieModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Limpar estados quando o modal for fechado
    if (!isOpen) {
      setSelectedOption(null);
      setPreviewUrl(null);
    }
  }, [isOpen]);

  // Limpar a URL do objeto quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleOptionSelect = (option: 'upload' | 'selfie') => {
    setSelectedOption(option);
    
    if (option === 'selfie') {
      setIsSelfieModalOpen(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Criar URL para preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSelfieCapture = (imageSrc: string) => {
    setIsSelfieModalOpen(false);
    onCapture(imageSrc);
  };

  const handleUploadSubmit = () => {
    if (previewUrl) {
      onCapture(previewUrl);
      onClose();
    }
  };

  const handleCloseSelfieModal = () => {
    setIsSelfieModalOpen(false);
    setSelectedOption(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Encontrar minhas fotos
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5">
          {!selectedOption || (selectedOption === 'upload' && !previewUrl) ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
                Nosso sistema de reconhecimento facial identifica automaticamente você nas fotos do evento.
                Escolha uma das opções abaixo para começar:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button 
                  className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group"
                  onClick={() => {
                    handleOptionSelect('upload');
                    fileInputRef.current?.click();
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Upload size={24} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="block font-medium mb-1">Enviar foto</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Selecione uma foto do seu dispositivo</span>
                  </div>
                </button>
                
                <button 
                  className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group"
                  onClick={() => handleOptionSelect('selfie')}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="block font-medium mb-1">Tirar selfie</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Use a câmera do seu dispositivo</span>
                  </div>
                </button>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ao prosseguir, você concorda com o uso de seus dados e de sua imagem exclusivamente para permitir que suas fotos sejam encontradas por nós. Os seus dados serão tratados em estrita observância à legislação aplicável, incluindo a Lei Geral de Proteção de Dados (Lei Federal 13.709/18). Assim que as suas fotos forem identificadas, os seus dados aqui coletados serão devidamente excluídos por nós.
                </p>
              </div>
            </>
          ) : selectedOption === 'upload' && previewUrl ? (
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square relative max-w-xs w-full mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Escolher outra</span>
                </button>
                
                <button
                  onClick={handleUploadSubmit}
                  className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  <span>Confirmar</span>
                </button>
              </div>
            </div>
          ) : null}
          
          {/* Input de arquivo escondido */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
      
      {/* Modal de selfie */}
      <SelfieModal 
        isOpen={isSelfieModalOpen} 
        onClose={handleCloseSelfieModal} 
        onCapture={handleSelfieCapture} 
      />
    </div>
  );
};

export default FacialRecognitionModal;
