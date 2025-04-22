import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';

interface UploadAreaProps {
  onImageUploaded: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onImageUploaded }) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUploaded(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const takeSelfie = () => {
    // In a real implementation, this would use the Web Camera API
    alert('This would open the camera for a selfie in a real implementation');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors cursor-pointer ${
            dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Upload a clear photo of your face</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Drag and drop an image, or click to browse
          </p>
          <p className="mt-1 text-xs text-gray-400 text-center">
            Supports JPG, PNG, HEIC - Max 10MB
          </p>

          <div className="mt-6 flex gap-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md flex items-center hover:bg-gray-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Browse Files
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                takeSelfie();
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Take a Selfie
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto rounded-lg shadow-md" 
          />
          <button 
            onClick={clearPreview} 
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Image uploaded successfully</p>
            <p className="text-xs text-gray-500 mt-1">Processing facial recognition...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;