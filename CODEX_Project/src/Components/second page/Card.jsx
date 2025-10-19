import React from 'react';
import './Card.css';

const Card = ({ image, title, description }) => {
    return (
        <>
            <div className="card-container">

            <div className="card">
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            </div>
        </>
    )
}

export default Card;
