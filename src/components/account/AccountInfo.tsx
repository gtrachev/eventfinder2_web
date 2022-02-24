import React from "react";
import { NavLink } from "react-router-dom";
import { uppercase } from "../../utils/helpers/uppercase";
import { InterestEnum } from "../../utils/types/interestTypes";
import { UserType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";

const AccountInfo: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <div>
      <p className="xs secondary-text mb-05">Email: {user.email}</p>
      <p className="xs secondary-text mb-05">
        User tier: {uppercase(user.userTier)}
      </p>
      <p className="xs secondary-text mb-05">Country: {user.country}</p>
      {user.city && (
        <p className="xs secondary-text mb-05">City: {user.city}</p>
      )}
      <p className="xs secondary-text mb-05">Age: {user.age}</p>
      <p className="xs secondary-text mb-05">
        Interests:{" "}
        {user.interests
          .map((interest: InterestEnum) => uppercase(interest))
          .join(", ")}
      </p>
      <NavLink to="/account/edit">
        <Button className="xs mb-05">Edit account</Button>
      </NavLink>
    </div>
  );
};

export default AccountInfo;
