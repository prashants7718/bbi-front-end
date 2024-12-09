import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { verifyUser } from "../service/invitationService";
import Home from "./Home";

const InviteSignup = () => {
  const { code: verificationCode } = useParams();
  const navigate = useNavigate();
  const [invitationData, setInvitationData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const validateCode = async () => {
      try {
        const response = await verifyUser({ code: verificationCode });
        setInvitationData(response.user);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (verificationCode) {
      validateCode();
    }
  }, [verificationCode, navigate]);

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

  return (
    <>
      <Home />
      <SignupForm invitationData={invitationData} />
    </>
  );
};

export default InviteSignup;
