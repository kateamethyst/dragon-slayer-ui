import React from 'react';

function NavComponent () {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <a className="navbar-brand text-light" href="#">Dragon Slayer</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav text-right">
          <a
            href="/"
            className="nav-link active text-light"
          >
            Home <span className="sr-only">(current)</span>
          </a>
          <a href="/players" className="nav-link text-light">Players</a>
        </div>
      </div>
    </nav>
  )
}

export default NavComponent;