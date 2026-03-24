export function TableSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-gray-50 border-b px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                    </div>
                    <div className="w-32">
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                    <div className="w-32">
                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                    <div className="w-24">
                        <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
                    </div>
                    <div className="w-32">
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                    <div className="w-24" />
                </div>
            </div>

            <div className="p-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                        <div className="flex-1 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="w-32">
                            <div className="h-4 bg-gray-200 rounded w-20" />
                        </div>
                        <div className="w-32">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                        </div>
                        <div className="w-24">
                            <div className="h-4 bg-gray-200 rounded w-12" />
                        </div>
                        <div className="w-32">
                            <div className="h-4 bg-gray-200 rounded w-16" />
                        </div>
                        <div className="w-24 flex gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}