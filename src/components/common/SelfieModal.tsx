import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, RotateCcw, Check } from 'lucide-react';

interface SelfieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageSrc: string) => void;
}

const SelfieModal: React.FC<SelfieModalProps> = ({ isOpen, onClose, onCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Iniciar a câmera quando o modal abrir
  useEffect(() => {
    if (isOpen && !stream) {
      startCamera();
    }
    
    // Cleanup quando o componente for desmontado ou o modal fechado
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setCameraError(null);
      setIsLoading(false);
    };
  }, [isOpen, stream]);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);
    
    // Limpar qualquer stream anterior
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    
    try {
      // Verificar se o navegador suporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Seu navegador não suporta acesso à câmera');
      }
      
      // Usar uma abordagem mais simples primeiro
      const constraints = { 
        video: true, 
        audio: false 
      };
      
      console.log('Solicitando acesso à câmera com constraints:', constraints);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Stream obtido com sucesso:', mediaStream.id);
      
      // Verificar se o stream tem tracks de vídeo
      const videoTracks = mediaStream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error('Nenhuma track de vídeo disponível');
      }
      
      console.log('Tracks de vídeo:', videoTracks.map(t => t.label));
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        console.log('Atribuindo stream ao elemento de vídeo');
        videoRef.current.srcObject = mediaStream;
        
        // Adicionar listeners para eventos
        videoRef.current.onloadedmetadata = () => {
          console.log('Vídeo metadata carregado');
          setIsLoading(false);
          
          // Tentar iniciar a reprodução
          videoRef.current?.play().catch(e => {
            console.error('Erro ao iniciar reprodução de vídeo:', e);
            setCameraError('Não foi possível iniciar a câmera. Tente novamente.');
          });
        };
        
        videoRef.current.onerror = (e) => {
          console.error('Erro no elemento de vídeo:', e);
          setCameraError('Ocorreu um erro ao exibir o vídeo da câmera.');
          setIsLoading(false);
        };
      } else {
        console.error('Elemento de vídeo não encontrado');
        setCameraError('Erro interno: elemento de vídeo não encontrado.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      let errorMessage = 'Não foi possível acessar sua câmera';
      
      if (error instanceof Error) {
        console.log('Tipo de erro:', error.name);
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = 'Permissão para acessar a câmera foi negada. Por favor, permita o acesso à câmera nas configurações do seu navegador.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = 'Nenhuma câmera foi encontrada no seu dispositivo.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          errorMessage = 'Sua câmera está sendo usada por outro aplicativo. Feche outros aplicativos que possam estar usando a câmera e tente novamente.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'As configurações solicitadas para a câmera não são suportadas pelo seu dispositivo.';
        } else if (error.name === 'AbortError') {
          errorMessage = 'A operação de acesso à câmera foi cancelada. Tente novamente.';
        } else if (error.name === 'SecurityError') {
          errorMessage = 'O uso da câmera foi bloqueado por questões de segurança. Verifique as configurações do seu navegador.';
        } else if (error.name === 'TypeError') {
          errorMessage = 'Configurações inválidas para a câmera. Tente novamente.';
        } else if (error.message) {
          errorMessage = `Erro: ${error.message}`;
        }
      }
      
      console.log('Mensagem de erro definida:', errorMessage);
      setCameraError(errorMessage);
      setIsLoading(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Configurar o canvas para o tamanho do vídeo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Desenhar o frame atual do vídeo no canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Converter o canvas para uma URL de dados (base64)
        const imageSrc = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageSrc);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {capturedImage ? 'Confirmar foto' : 'Tirar selfie'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
            
            {cameraError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{cameraError}</p>
                <button 
                  onClick={startCamera}
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Tentar novamente
                </button>
              </div>
            ) : !capturedImage ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Selfie capturada" 
                className="w-full h-full object-cover" 
              />
            )}
            
            {/* Canvas escondido para capturar a imagem */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="mt-4 flex justify-center">
            {!capturedImage && !cameraError ? (
              <button
                onClick={capturePhoto}
                disabled={isLoading || !stream}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors ${isLoading || !stream ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}
              >
                <Camera className="w-6 h-6" />
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={retakePhoto}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Tirar novamente</span>
                </button>
                
                <button
                  onClick={confirmPhoto}
                  className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  <span>Confirmar</span>
                </button>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Sua selfie será usada apenas para encontrar suas fotos neste evento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfieModal;
