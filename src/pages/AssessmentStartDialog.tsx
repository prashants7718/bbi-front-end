import { useEffect, useRef } from "react";

interface TestDialogProps {
  handleStartTest: () => void;
  onClose: () => void;
}

const AssessmentStartDialog = ({ handleStartTest, onClose }: TestDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={dialogRef}
        className="w-full max-w-sm p-5 bg-white rounded-lg shadow-lg transform transition-transform scale-100"
      >
        <h2
          id="test-dialog-title"
          className="mb-3 text-xl font-semibold text-center text-primaryBlue"
        >
          Ready to start your test?
        </h2>
        <p
          id="test-dialog-description"
          className="mb-3 text-base text-center text-gray-700"
        >
          Click "Start" to begin your test journey or "Cancel" to exit.
        </p>
        <div className="flex items-center justify-center space-x-4 mb-1">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-textBlack bg-darkGrayBackground rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleStartTest}
            className="px-6 py-2 text-sm font-medium text-textBlack bg-secondaryPink rounded-lg hover:bg-secondaryPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryPink"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStartDialog;
