// /components/ui/ConfirmationDialog.tsx
"use client";

interface ConfirmationDialogProps {
 isOpen: boolean;
 title: string;
 message: string;
 onConfirm: () => void;
 onCancel: () => void;
}

export default function ConfirmationDialog({
 isOpen,
 title,
 message,
 onConfirm,
 onCancel,
}: ConfirmationDialogProps) {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{message}</p>
    <div className="mt-4 flex justify-end space-x-3">
     <button
      type="button"
      onClick={onCancel}
      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Cancel
     </button>
     <button
      type="button"
      onClick={onConfirm}
      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
      Confirm
     </button>
    </div>
   </div>
  </div>
 );
}
