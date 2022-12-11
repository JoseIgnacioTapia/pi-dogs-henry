function Card({ id, image, name, temperament, weight }) {
  return (
    <div>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{temperament}</p>
      <span>{weight}</span>
    </div>
  );
}

export default Card;
