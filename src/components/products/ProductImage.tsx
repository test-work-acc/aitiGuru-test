import { useState } from 'react';
import { Package, Loader2 } from 'lucide-react';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
                <Package className="w-5 h-5 text-gray-400" />
            </div>
        );
    }

    return (
        <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}