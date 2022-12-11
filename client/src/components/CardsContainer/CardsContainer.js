import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDogs } from '../../redux/action';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function CardsContainer() {
  const dogs = useSelector(state => state.dogs);
  const error = useSelector(state => state.error);
  console.log(dogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div>
      {dogs.length ? (
        dogs.map(d => {
          return (
            <Link to="#" key={d.id}>
              <Card
                image={d.image}
                name={d.name}
                temperament={d.temperament}
                weight={d.weight}
              />
            </Link>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CardsContainer;
