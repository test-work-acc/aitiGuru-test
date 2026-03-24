import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts, searchProducts, } from '@/api/products';
import type { ProductsQuery } from '@/api/products';

const PRODUCTS_KEY = ['products'] as const;

export function useProducts(query: ProductsQuery) {
    const isSearch = !!query.q;

    return useQuery({
        queryKey: [...PRODUCTS_KEY, query],
        queryFn: () => isSearch ? searchProducts(query.q!, query.limit) : getProducts(query),
        staleTime: 1000 * 60,
    });
}

export function useProductsActions() {
    const queryClient = useQueryClient();

    return {
        refresh: () => queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY }),
    };
}