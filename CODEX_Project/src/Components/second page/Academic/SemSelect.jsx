import './semSelect.css';
import React from 'react';
import Card from '../../second page/Card.jsx';
import link1 from '../../../assets/img/1.png';
import link2 from '../../../assets/img/2.png';
import link3 from '../../../assets/img/3.png';
import link4 from '../../../assets/img/4.jpeg';
import link5 from '../../../assets/img/5.jpeg';
import link6 from '../../../assets/img/6.jpeg';
import link7 from '../../../assets/img/7.jpeg';
import link8 from '../../../assets/img/8.jpeg';

const semesters = [
  1,2,3,4,5,6,7,8
];

const links = [link1, link2, link3, link4, link5, link6, link7, link8];

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
