import React from 'react';

import styles from './Search.module.scss';

function Search({ searchValue, setSearchValue }) {
  return (
    <div className={styles.all}>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Searsh pizzas..."
        value={searchValue}
      />
      {searchValue && <span onClick={() => setSearchValue('')}>clear</span>}
    </div>
  );
}

export default Search;
