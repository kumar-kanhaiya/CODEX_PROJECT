import './semSelect.css';
import React from 'react';
import Card from '../../second page/Card.jsx';

const semesters = [
  1,2,3,4,5,6,7,8
];

const links = ["https://cdn.pixabay.com/photo/2025/07/16/15/01/karlsbad-9718003_1280.jpg",]

const SemSelect = () => {
  return (
    <div className="selselectMain">

    <div className="sem-select">
      <h2>Select Your Semester</h2>
      <div className="sem-buttons">
        {semesters.map((s) => (
            <button
            key={s}
            className="sem-card-btn"
            aria-label={`Select Semester ${s}`}
            type="button"
            >
            <Card
              image={links[s - 1]}
              title={`Semester ${s}`}
              description={`Description for Semester ${s}`}
              />
          </button>
        ))}
      </div>
        </div>
    </div>
  );
};

export default SemSelect;
