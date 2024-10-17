import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
