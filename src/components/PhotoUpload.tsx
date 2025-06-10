
import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoUploadProps {
  label: string;
  onPhotoSelect: (file: File | null) => void;
  photo: File | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ label, onPhotoSelect, photo }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onPhotoSelect(null);
    setPreview(null);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-center text-foreground">{label}</h3>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={`upload-${label}`}
        />
        
        <div className="aspect-square border-2 border-dashed border-border rounded-2xl bg-card hover:bg-accent/30 transition-all duration-300 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {preview ? (
            <>
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-xl"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRemove}
                className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-background/80 hover:bg-background"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-center mb-2">
                Clique para enviar uma foto
              </p>
              <p className="text-sm text-muted-foreground/70 text-center">
                JPG, PNG ou GIF
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
