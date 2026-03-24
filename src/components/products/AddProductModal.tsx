import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Modal, Button, Input } from '@/components/UI/index';
import type { Product } from '@/types/domain';

const productSchema = z.object({
    title: z.string().min(1, 'Наименование обязательно'),
    price: z.string().min(1, 'Цена обязательна').refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        'Цена должна быть положительным числом'
    ),
    brand: z.string().min(1, 'Вендор обязателен'),
    sku: z.string().min(1, 'Артикул обязателен'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onAdd?: (product: Product) => void;
}

export function AddProductModal({ open, onClose, onAdd }: AddProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: '',
            price: '',
            brand: '',
            sku: '',
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const newProduct: Product = {
            id: Date.now(),
            title: data.title,
            description: `Товар ${data.title}`,
            price: Number(data.price),
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            brand: data.brand,
            category: 'Новые',
            thumbnail: 'https://via.placeholder.com/100',
            images: [],
        };

        onAdd?.(newProduct);

        toast.success('Товар успешно добавлен!');
        reset();
        onClose();
        setIsLoading(false);
    };

    return (
        <Modal open={open} onClose={onClose} title="Добавить товар">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Наименование"
                    placeholder="Например: iPhone 17"
                    {...register('title')}
                    error={errors.title?.message}
                />

                <Input
                    label="Цена, ₽"
                    type="number"
                    placeholder="Например: 89990"
                    {...register('price')}
                    error={errors.price?.message}
                />

                <Input
                    label="Вендор"
                    placeholder="Например: Apple"
                    {...register('brand')}
                    error={errors.brand?.message}
                />

                <Input
                    label="Артикул"
                    placeholder="Например: APL-17-001"
                    {...register('sku')}
                    error={errors.sku?.message}
                />

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        className="flex-1"
                    >
                        Добавить
                    </Button>
                </div>
            </form>
        </Modal>
    );
}