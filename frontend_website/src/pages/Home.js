import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary">Welcome To Bird Watchers Application 🐦</h1>
      <p className="lead text-muted">
        Discover and learn about different bird species from around the uk found within the dataset.
      </p>

      <div className="mt-4">
        <Link to="/birds" className="btn btn-primary btn-lg me-3">
          View Birds
        </Link>
        <Link to="/register" className="btn btn-success btn-lg">
          Join Now
        </Link>
      </div>

      <div className="mt-5">
        <img
          src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/10/23/pg-18-robin-2-pa.jpg"
          alt="Birds"
          className="img-fluid rounded shadow"
        />
      </div>
    </div>
  );
};

export default Home;

