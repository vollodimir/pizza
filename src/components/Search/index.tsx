import React from 'react';
import debounce from 'lodash.debounce'; //выдложены запроси
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValueLocal, setSearchValueLocal] = React.useState(''); //локальний інпут

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeInput = (event: any) => {
    setSearchValueLocal(event.target.value);
    searchDebounce(event.target.value); ///
  };

  const searchDebounce = React.useCallback(
    debounce((str) => dispatch(setSearchValue(str)), 1000),
    [],
  );

  const onClickClear = () => {
    inputRef.current?.focus(); // ?. оператор опціональної послідовності в ТС
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
};

export default Search;
