import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

export const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropAreaComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white border-4 border-black w-full max-w-lg relative flex flex-col shadow-[8px_8px_0px_0px_#000]">
        <div className="p-4 border-b-4 border-black flex justify-between items-center bg-secondary">
          <h3 className="font-display text-xl uppercase text-black">Crop Profile Photo</h3>
          <button onClick={onCancel} className="text-black hover:scale-110 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="relative h-80 w-full bg-gray-200">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropAreaComplete}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-black uppercase text-sm">Zoom</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex gap-4 mt-2">
            <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleApply}>Apply Crop</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to create the cropped image
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = 400;
  let width = pixelCrop.width;
  let height = pixelCrop.height;

  // Scale down if larger than maxSize
  if (width > maxSize || height > maxSize) {
    const scale = Math.min(maxSize / width, maxSize / height);
    width *= scale;
    height *= scale;
  }

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 0.8);
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
}
