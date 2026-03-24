import axios from './client';
import type { Product } from '@/types/domain';

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductsQuery {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    q?: string;
}


export async function getProducts(query?: ProductsQuery): Promise<ProductsResponse> {
    const response = await axios.get<ProductsResponse>('/products', { params: query });
    return response.data;
}


export async function searchProducts(q: string, limit = 50): Promise<ProductsResponse> {
    const response = await axios.get<ProductsResponse>('/products/search', {
        params: { q, limit }
    });
    return response.data;
}