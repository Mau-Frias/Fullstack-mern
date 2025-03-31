import { Link } from "react-router";
function Navbar () {
  return (
    <nav className="navbar bg-blue-700 flex justify-between items-center p-4 shadow-md m-4 rounded-2xl h-16">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links flex space-x-4 text-white">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;