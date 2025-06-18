const Footer = () => {
  return (
    // Perubahan pada styling footer
    <footer className="bg-gray-800 text-white border-t border-gray-700 mt-16 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-2">
          &copy; {new Date().getFullYear()} CodeCraft Indo. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
          Crafted with passion in Palembang, South Sumatra, Indonesia.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
