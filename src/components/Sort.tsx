import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSortList, selectSort } from '../redux/slices/filterSlice';

type ListIthem = {
  name: string;
  sortValue: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const list: ListIthem[] = [
  { name: 'популярности', sortValue: 'rating' },
  { name: 'цене', sortValue: 'price' },
  { name: 'алфавиту', sortValue: 'name' },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sortList = useSelector(selectSort);

  const [open, setOpen] = React.useState(false);

  const sortOutside = React.useRef<HTMLDivElement>(null);

  const onClickSort = (obj: ListIthem) => {
    dispatch(setSortList(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const closeSort = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortOutside.current && !_event.path.includes(sortOutside.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', closeSort);

    //component unmount то шо вище component didmount
    return () => document.body.removeEventListener('click', closeSort);
  }, []);

  return (
    <div ref={sortOutside} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortList.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                key={obj.sortValue}
                onClick={() => onClickSort(obj)}
                className={sortList === obj ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
