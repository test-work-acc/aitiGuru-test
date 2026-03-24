import { Dialog, DialogPanel, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <DialogPanel
                                className={clsx(
                                    'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all',
                                    className
                                )}
                            >
                                {title && (
                                    <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                                        {title}
                                    </Dialog.Title>
                                )}
                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}