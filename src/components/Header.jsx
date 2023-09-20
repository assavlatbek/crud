import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav className="container">
          <h1>
            <Link to={"/"} className="gradient-txt">
              AS-CRUD{" "}
            </Link>
          </h1>
        </nav>
      </header>
      <div className="empty"></div>
    </>
  );
}

export default Header;
