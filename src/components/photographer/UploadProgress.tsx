import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface UploadProgressProps {
  files: File[];
  onComplete: () => void;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ files, onComplete }) => {
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [status, setStatus] = useState<{ [key: string]: 'uploading' | 'success' | 'error' }>({});

  useEffect(() => {
    // Simulate file upload progress
    files.forEach((file) => {
      const key = `${file.name}-${file.size}`;
      setProgress(prev => ({ ...prev, [key]: 0 }));
      setStatus(prev => ({ ...prev, [key]: 'uploading' }));

      // Simulate upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += Math.random() * 15;
          if (currentProgress > 100) currentProgress = 100;
          
          setProgress(prev => ({ ...prev, [key]: Math.floor(currentProgress) }));
          
          if (currentProgress === 100) {
            clearInterval(interval);
            // Simulate some random errors for demonstration
            const success = Math.random() > 0.1; // 10% chance of error
            setStatus(prev => ({ ...prev, [key]: success ? 'success' : 'error' }));
            
            // Check if all uploads are complete
            setTimeout(() => {
              checkAllComplete();
            }, 500);
          }
        }
      }, 200);

      return () => clearInterval(interval);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const checkAllComplete = () => {
    const allComplete = Object.values(status).every(s => s === 'success' || s === 'error');
    if (allComplete) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const getSuccessCount = () => {
    return Object.values(status).filter(s => s === 'success').length;
  };

  const getErrorCount = () => {
    return Object.values(status).filter(s => s === 'error').length;
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-900">Uploading {files.length} files</h3>
          <p className="text-sm text-gray-500 mt-1">
            {getSuccessCount()} complete • {getErrorCount()} failed
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {files.map((file) => {
          const key = `${file.name}-${file.size}`;
          const currentProgress = progress[key] || 0;
          const currentStatus = status[key] || 'uploading';
          
          return (
            <div key={key} className="p-3 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700 truncate max-w-[60%]">{file.name}</p>
                <div className="flex items-center">
                  {currentStatus === 'uploading' && (
                    <span className="text-xs text-gray-500">{currentProgress}%</span>
                  )}
                  {currentStatus === 'success' && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  {currentStatus === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    currentStatus === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadProgress;