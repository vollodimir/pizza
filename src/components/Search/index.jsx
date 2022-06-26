import React from 'react';

import styles from './Search.module.scss';

import { SearchContext } from '../../App';

function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

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
