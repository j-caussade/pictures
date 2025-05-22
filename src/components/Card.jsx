import React from "react";

export default function Card({ photo }) {
  const { url, title, category, dateAdded } = photo;

  return (
    <>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure>
          <img src={url} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge">{category}</div>
          </h2>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{dateAdded}</div>
          </div>
        </div>
      </div>
    </>
  );
}
