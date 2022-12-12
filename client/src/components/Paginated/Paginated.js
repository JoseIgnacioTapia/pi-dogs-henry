function Paginated({ dogsPerPage, totalDogs, paginated }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.floor(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        {pageNumbers &&
          pageNumbers.map(num => {
            return (
              <li key={num} style={{ margin: '0 5px' }}>
                <button onClick={() => paginated(num)}>{num}</button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default Paginated;
