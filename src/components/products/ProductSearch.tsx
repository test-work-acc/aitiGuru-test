import { Search, X } from 'lucide-react';

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function ProductSearch({ value, onChange, placeholder = 'Найти' }: ProductSearchProps) {
    return (
        <div className="relative w-full max-w-255.75 mx-auto">
            <div className="relative">
                <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10"
                />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full py-3 pl-13 pr-10 bg-bgGrey rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />

                {value && (
                    <button
                        onClick={() => onChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                        aria-label="Очистить поиск"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}