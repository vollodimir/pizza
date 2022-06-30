import React from 'react';
import debounce from 'lodash.debounce'; //выдложены запроси

import styles from './Search.module.scss';

import { SearchContext } from '../../App';

function Search() {
  const { setSearchValue } = React.useContext(SearchContext);
  const [searchValueLocal, setSearchValueLocal] = React.useState(''); //локальний інпут

  const inputRef = React.useRef();

  const onChangeInput = (event) => {
    setSearchValueLocal(event.target.value);
    searchDebounce(event.target.value); ///
  };

  const searchDebounce = React.useCallback(
    debounce((str) => setSearchValue(str), 1000),
    [],
  );

  const onClickClear = () => {
    inputRef.current.focus();
    searchDebounce('');
    setSearchValueLocal('');
  };

  return (
    <div className={styles.all}>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        placeholder="Searsh pizzas..."
        value={searchValueLocal}
      />
      {searchValueLocal && <span onClick={onClickClear}>clear</span>}
    </div>
  );
}

export default Search;
