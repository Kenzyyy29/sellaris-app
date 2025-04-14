interface DeleteConfirmationModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 userName: string;
}

const DeleteUserModal = ({
 isOpen,
 onClose,
 onConfirm,
 userName,
}: DeleteConfirmationModalProps) => {
 if (!isOpen) return null;
 return (
  <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black/30">
   <div className="bg-white w-full max-w-lg p-4 h-auto rounded-[8px] flex flex-col gap-4">
    {/* Tittle*/}
    <h1 className="text-xl font-bold">
     Are You Sure want to delete this user <strong>{userName}</strong>?
    </h1>
    <p>This actions need Admin Permisions</p>
    <hr />
    <div className="flex gap-3 items-center justify-end">
     <button
      onClick={onClose}
      className="px-4 py-2 rounded-[8px] bg-amber-400 text-white cursor-pointer">
      Cancel
     </button>
     <button
      onClick={onConfirm}
      className="px-4 py-2 rounded-[8px] bg-red-500 text-white cursor-pointer">
      Delete
     </button>
    </div>
   </div>
  </div>
 );
};

export default DeleteUserModal;
