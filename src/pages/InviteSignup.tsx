import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";

const InviteSignup = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [invitationData, setInvitationData] = useState(null);
  const [error, setError] = useState("");

//   useEffect(() => {
//     const validateCode = async () => {
//       try {
//         const response = await fetch(`/api/invitations/${code}`);
//         if (!response.ok) {
//           throw new Error("Invalid or expired invitation code");
//         }
//         const data = await response.json();
//         setInvitationData(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     validateCode();
//   }, [code]);

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!invitationData) {
    return <p className="text-center mt-20">Validating invitation...</p>;
  }

  return <SignupForm invitationData={invitationData} />;
};

export default InviteSignup;
