import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaHome } from "react-icons/fa";

const AuthNav = () => {
    return (
        <div className="flex items-center justify-between  px-6 md:px-20 ">
            <Logo />
            <Link
                to="/"
                className="text-4xl text-primary hover:text-primary/80 transition-colors"
                title="Go to Home"
            >
                <FaHome />
            </Link>
        </div>
    );
};

export default AuthNav;
