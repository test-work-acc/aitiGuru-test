import type { Product } from '@/types/domain';
import { ArrowUp, ArrowDown, Plus, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductImage } from './ProductImage';

interface ProductTableProps {
    products: Product[];
    sortBy?: string;
    order?: 'asc' | 'desc';
    onSort: (field: string) => void;
}

export function ProductTable({ products, sortBy, order, onSort }: ProductTableProps) {
    const columns = [
        { key: 'title', label: 'Наименование', sortable: true },
        { key: 'brand', label: 'Вендор', sortable: true },
        { key: 'id', label: 'Артикул', sortable: true },
        { key: 'rating', label: 'Оценка', sortable: true },
        { key: 'price', label: 'Цена, ₽', sortable: true },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => col.sortable && onSort(col.key)}
                                    className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase ${col.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors select-none' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}

                                        {col.sortable && sortBy === col.key && (
                                            order === 'asc' ? (
                                                <ArrowUp className="w-4 h-4 text-blue-600" />
                                            ) : (
                                                <ArrowDown className="w-4 h-4 text-blue-600" />
                                            )
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <ProductImage
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-10 h-10"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.title}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {product.category}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                    {product.brand}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                    {product.id.toString().padStart(7, '0')}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`text-sm font-medium ${product.rating < 3.5 ? 'text-red-600' : 'text-gray-700'
                                        }`}>
                                        {product.rating.toFixed(1)}/5
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {formatPrice(product.price)}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toast.success(`"${product.title}" добавлен!`)}
                                            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                                            title="Добавить"
                                        >
                                            <Plus className="w-4 h-4 text-white" />
                                        </button>
                                        <button
                                            onClick={() => console.log('Menu clicked for product:', product.id)}
                                            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                                            title="Меню (заглушка)"
                                        >
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Утилита форматирования цены
function formatPrice(price: number): string {
    return price.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + ' ₽';
}