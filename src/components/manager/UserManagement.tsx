import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../layout/Layout";
import { useState } from "react";
import Popup from "../layout/Popup";
import InvitationDialog from "../../pages/InvitationDialog";

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendInvitation = () => {
    console.log("Invitation popup opened")
   };
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">
          User Management
        </h2>
        <div className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
          <button
            className="flex items-center ml-auto"
            onClick={()=>setIsPopupOpen(true)}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Invite
          </button>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <InvitationDialog
          handleSendInvitation={handleSendInvitation}
          onClose={() => setIsPopupOpen(false)}
        />
      </Popup>
    </Layout>
  );
};

export default UserManagement;
