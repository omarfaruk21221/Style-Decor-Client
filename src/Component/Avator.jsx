import useAuth from "../Hooks/useAuth";
import avatarPlaceholder from "../assets/avatar_placeholder.png";

const Avator = () => {
  const { user } = useAuth();
  return (
    <div className="avatar hover:scale-115 transition-transform duration-300">
      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
        <img src={user?.photoURL || avatarPlaceholder} />
      </div>
    </div>
  );
};

export default Avator;
