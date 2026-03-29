import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A8A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">HandyHub</h3>
            <p className="text-blue-200 mb-4 max-w-md">
              Connecting you with skilled local technicians for all your home
              service needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-[#3b4da0] text-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="bg-[#3b4da0] text-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="bg-[#3b4da0] text-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="bg-[#3b4da0] text-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end">
            <div className="flex items-center space-x-2 text-blue-200">
              <FiMail size={16} />
              <a
                href="mailto:support@handyhub.com"
                className="text-sm hover:text-white transition-colors"
              >
                support@handyhub.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8">
          <p className="text-blue-200 text-sm text-center md:text-left">
            &copy; {currentYear} HandyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
