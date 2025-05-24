import { XIcon } from 'lucide-react';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-300 rounded-xl p-6 max-w-sm w-full relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <XIcon size={18} />
                </button>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-100 dark:text-gray-300 dark:hover:bg-dark-200"
                    >
                        Non
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Oui, supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};
