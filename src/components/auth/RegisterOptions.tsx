import React from "react";
import { useNavigate } from "react-router";
import { UserTiersTypes } from "../../utils/types/userTiers";
import AuthCard from "../../styles/styledComponents/Cards/AuthCard";
import Button from "../../styles/styledComponents/Buttons/Button";
import styles from "../../styles/auth/_registerOptions.module.scss";

const RegisterOptions: React.FC = () => {
  const navigate = useNavigate();
  const handleChooseTier = (tier: string) => {
    navigate(`/accounts/register?tier=${tier}`);
  };
  return (
    <div className={`${styles.registerOptionsContainer}`}>
      <AuthCard className="">
        <div className="tierHeader bg-success">
          <h2 className="md">FREE</h2>
          <h3 className="s">0$</h3>
        </div>
        <div className="d-flex flex-column tierTextContainer">
          <div className="w-100">
            <p className="white-text">Browse and discover events.</p>
            <p className="white-text">
              Post notes, visible and accessible to all users.
            </p>
            <p className="white-text">Attend events.</p>
            <p className="danger-text">
              User not able to post and create events.
            </p>
          </div>
          <Button
            className="s w-100 mt-1"
            onClick={() => handleChooseTier(UserTiersTypes.free)}
          >
            Choose
          </Button>
        </div>
      </AuthCard>
      <AuthCard>
        <div className="tierHeader bg-secondary">
          <h2 className="md">STANDARD</h2>
          <h3 className="s">20$</h3>
        </div>
        <div className="d-flex flex-column tierTextContainer">
          <div className="w-100">
            <p className="white-text">Browse and discover events.</p>
            <p className="white-text">
              Post notes, visible and accessible to all users.
            </p>
            <p className="white-text">Attend events.</p>
            <p className="danger-text">
              User able to post one event every month.
            </p>
          </div>
          <Button
            className="s w-100 mt-1"
            onClick={() => handleChooseTier(UserTiersTypes.standard)}
          >
            Choose
          </Button>
        </div>
      </AuthCard>
      <AuthCard>
        <div className="tierHeader bg-primary">
          <h2 className="md">CREATOR</h2>
          <h3 className="s">50$</h3>
        </div>
        <div className="d-flex flex-column tierTextContainer">
          <div className="w-100">
            <p className="white-text">Browse and discover events.</p>
            <p className="white-text">
              Post notes, visible and accessible to all users.
            </p>
            <p className="white-text">Attend events.</p>
            <p className="white-text">User able to post one event every week.</p>
          </div>
          <Button
            className="s mt-1 w-100"
            onClick={() => handleChooseTier(UserTiersTypes.creator)}
          >
            Choose
          </Button>
        </div>
      </AuthCard>
    </div>
  );
};

export default RegisterOptions;
