import React from 'react'
// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import specific icons
import { faInstagram, faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Job Portal</h2>
                        <p className="mt-4 text-sm text-gray-600">
                            We help people find the job of their dreams. Explore opportunities and find your next career move.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
                        <ul className="mt-4 text-gray-600">
                            <li className="hover:text-[#F83006] transition-colors">
                                <a href="#">Search Jobs</a>
                            </li>
                            <li className="hover:text-[#F83006] transition-colors">
                                <a href="#">Post a Job</a>
                            </li>
                            <li className="hover:text-[#F83006] transition-colors">
                                <a href="#">About Us</a>
                            </li>
                            <li className="hover:text-[#F83006] transition-colors">
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
                        <ul className="mt-4 text-gray-600">
                            <li>Email: contact@jobportal.com</li>
                            <li>Phone: +91 9876543210</li>
                            <li>Address: Gurugram, India</li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
                        <ul className="mt-4 flex  justify-center gap-1 space-x-4">
                            <li>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#F83006] transition-colors">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#F83006] transition-colors">
                                    <FontAwesomeIcon icon={faGithub} size="2x" />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#F83006] transition-colors">
                                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#F83006] transition-colors">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
                    <p>&copy; 2024 Job Portal. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
