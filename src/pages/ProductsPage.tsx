import { useState } from 'react';
import { useProducts, useProductsActions } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductTable } from '@/components/products/ProductTable';
import { Pagination } from '@/components/products/Pagination';
import { ProductSearch } from '@/components/products/ProductSearch';
import { AddProductModal } from '@/components/products/AddProductModal';
import { RefreshCw, Plus } from 'lucide-react';
import type { Product } from '@/types/domain';
import { TableSkeleton } from '@/components/products/TableSkeleton';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export function ProductsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [localProducts, setLocalProducts] = useState<Product[]>([]);

    const debouncedSearch = useDebounce(searchQuery, 500);
    const { refresh } = useProductsActions();

    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data, isLoading, isError, refetch } = useProducts({
        limit: ITEMS_PER_PAGE,
        skip: debouncedSearch ? 0 : skip,
        q: debouncedSearch || undefined,
        sortBy,
        order,
    });

    const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refresh();
            setLocalProducts([]);
            toast.success('Данные обновлены');
        } catch {
            toast.error('Не удалось обновить данные');
        } finally {
            setIsRefreshing(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setOrder('asc');
        }
        setCurrentPage(1);
    };

    const handleAddProduct = (newProduct: Product) => {
        setLocalProducts(prev => [newProduct, ...prev]);
    };


    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
                    ❌ Ошибка загрузки товаров
                </div>
            </div>
        );
    }

    const allProducts: Product[] = [...localProducts, ...(data?.products || [])];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-text">Товары</h1>
                    <ProductSearch
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Найти"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {debouncedSearch ? `Результаты поиска: "${debouncedSearch}"` : 'Все позиции'}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Обновить"
                        >
                            <RefreshCw
                                className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''
                                    }`}
                            />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <TableSkeleton />
                ) : allProducts.length > 0 ? (
                    <>
                        <ProductTable
                            products={allProducts}
                            sortBy={sortBy}
                            order={order}
                            onSort={handleSort}
                        />

                        {!debouncedSearch && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={data?.total || 0}
                                itemsPerPage={ITEMS_PER_PAGE}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {debouncedSearch && (
                            <div className="text-sm text-gray-500 text-center">
                                Найдено {allProducts.length} из {data?.total || 0} товаров
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
                        <p className="text-gray-500">
                            {debouncedSearch
                                ? `Ничего не найдено по запросу "${debouncedSearch}"`
                                : 'Нет товаров для отображения'}
                        </p>
                    </div>
                )}
            </div>

            <AddProductModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
            />
        </div>
    );
}