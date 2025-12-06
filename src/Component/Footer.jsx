import React from 'react';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-primary/80 text-neutral-content p-10">
            <aside>
                <MdDesignServices className="w-12 h-12 fill-current" />
                <p>
                    Style Decor Ltd.
                    <br />
                    Providing reliable design services since 2024
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href="#" className="hover:text-primary transition-colors duration-200">
                        <FaTwitter className="w-6 h-6 fill-current" />
                    </a>
                    <a href="#" className="hover:text-primary transition-colors duration-200">
                        <FaYoutube className="w-6 h-6 fill-current" />
                    </a>
                    <a href="#" className="hover:text-primary transition-colors duration-200">
                        <FaFacebook className="w-6 h-6 fill-current" />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;