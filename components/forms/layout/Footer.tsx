import {Youtube} from "lucide-react";
import {PeerPesaLogo} from "@/components/peerpesa-logo.tsx";
import {Link} from "react-router-dom";
import React from "react";

const Footer = () => {
    const allSocialLinks = [
        {
            icon: "x",
            url: "https://x.com/peer_pesa",
            Component: () => (
                <img
                    src="/uploads/15cf7a50-8142-45c0-ad44-177446387b19.png"
                    alt="X"
                    className="h-6 w-6 filter invert stroke-[2px]" // Added stroke-[2px] to make it bolder
                />
            )
        },
        {
            icon: "telegram",
            url: "https://t.me/peerpesa",
            Component: () => (
                <img
                    src="/uploads/28c1ac83-f745-45d2-8f8b-4b1dfb3b2554.png"
                    alt="Telegram"
                    className="h-6 w-6 filter invert stroke-[2px]" // Added stroke-[2px] to make it bolder
                />
            )
        },
        {
            icon: "tiktok",
            url: "https://www.tiktok.com/@peerpesa",
            Component: () => (
                <img
                    src="/uploads/61159926-4573-4136-98a9-156fa804bed0.png"
                    alt="TikTok"
                    className="h-6 w-6 filter invert stroke-[2px]" // Added stroke-[2px] to make it bolder
                />
            )
        },
        {
            icon: "linkedin",
            url: "https://www.linkedin.com/company/72105181/admin/dashboard/",
            Component: () => (
                <img
                    src="/uploads/944568f8-8b4e-41d8-bf9d-de67a263f023.png"
                    alt="LinkedIn"
                    className="h-6 w-6 filter invert stroke-[2px]" // Added stroke-[2px] to make it bolder
                />
            )
        },
        {
            icon: "instagram",
            url: "https://www.instagram.com/peer_pesa",
            Component: () => (
                <img
                    src="/uploads/df2c7f64-d9fb-4613-8318-f6a95c891015.png"
                    alt="Instagram"
                    className="h-6 w-6 filter invert stroke-[2px]" // Added stroke-[2px] to make it bolder
                />
            )
        },
        {
            icon: "youtube",
            url: "https://www.youtube.com/@peerpesa",
            Component: () => (
                <Youtube className="h-6 w-6 text-white" /> // Using Lucide React YouTube icon with white color and consistent sizing
            )
        }
    ];

    
    return (
        <footer className="bg-peerpesa-dark-light text-white pt-16 pb-8">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <PeerPesaLogo variant="footer" />
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            PeerPesa is revolutionizing cross-border transactions with blockchain technology, making international transfers faster, cheaper, and more accessible.
                        </p>
                        <div className="flex space-x-4">
                            {allSocialLinks.map((social) => (
                                <a
                                    key={social.icon}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <social.Component />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-3">
                            <li><Link to="/send" className="text-gray-400 hover:text-white transition-colors">Send Money</Link></li>
                            <li><Link to="/buy" className="text-gray-400 hover:text-white transition-colors">Buy Crypto</Link></li>
                            <li><Link to="/swap" className="text-gray-400 hover:text-white transition-colors">Swap Crypto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link to="/customer-protection-policy" className="text-gray-400 hover:text-white transition-colors">Customer Protection Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/aml-ctf" className="text-gray-400 hover:text-white transition-colors">AML & CTF Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <p className="text-gray-500 text-center">&copy; {new Date().getFullYear()} PeerPesa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
