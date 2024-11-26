import { useState } from "react";

interface UserManagementProps {
  handleSendInvitation: () => void;
  onClose: () => void;
}
const InvitationDialog = ({
  handleSendInvitation,
  onClose,
}: UserManagementProps) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-md shadow-lg transform transition-transform scale-100">
        <h2
          id="test-dialog-title"
          className="mb-3 text-xl font-semibold text-center text-blue-900"
        >
          Invite Members to your team
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Eg. john@example.com"
              className={`w-full px-4 py-1 h-9 border text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Name(Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Eg.John"
              onChange={handleChange}
              className={`w-full px-4 py-1 h-9 border text-sm   rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 " onClick={onClose}>
            Cancel
          </button>
          <button className="px-6 py-2 text-sm font-medium text-white bg-primaryBlue rounded-lg hover:bg-primaryBlue " onClick={handleSendInvitation}>
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationDialog;
