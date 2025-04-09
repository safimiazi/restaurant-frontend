import MaxWidth from "../../wrapper/MaxWidth";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
     <MaxWidth>
     <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Column 1 */}
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
            We provide the best quality products at affordable prices. Your
            satisfaction is our priority.
          </p>
        </div>
        
        {/* Column 2 */}
        <div className="animate-fade-in delay-100">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Shop</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">About</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="animate-fade-in delay-200">
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Facebook</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Instagram</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">Twitter</li>
            <li className="hover:text-gray-300 transition duration-300 cursor-pointer">LinkedIn</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="animate-fade-in delay-300">
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <button className="mt-3 w-full brand-color-bg  transition duration-300 py-2 rounded">
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} YourBrand. All Rights Reserved.
      </div>
     </MaxWidth>
    </footer>
  );
};

export default Footer;
