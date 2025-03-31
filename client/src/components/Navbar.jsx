import { NavLink } from "react-router-dom";

function Navbar () {
  return (
    <>
      <style>
        {`
          .active {
            color: #fff;
            background-color: #007bff;
            border-radius: 5px;
            padding: 10px 15px;
            text-decoration: none;
            font-weight: bold;
          }
            .active:hover {
                background-color: #0056b3;
                color: #fff;
            }
        `}
      </style>
      <nav className="navbar bg-blue-700 flex justify-between items-center p-4 shadow-md m-4 rounded-2xl h-16">
        <div className="navbar__logo">MyApp</div>
        <ul className="navbar__links flex space-x-4 text-white">
          <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
          <li><NavLink to="/services" activeClassName="active">Services</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;