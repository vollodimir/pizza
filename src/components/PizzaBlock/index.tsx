import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addIthems, selectCartById } from '../../redux/slices/cartSlice';

const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProp = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProp> = ({ id, imageUrl, name, types, sizes, price }) => {
  const dispatch = useDispatch();
  const cartIthem = useSelector(selectCartById(id));
  const [activeType, setActiveType] = React.useState<number>(types[0]);
  const [activeSize, setActiveSize] = React.useState<number>(sizes[0]);

  const addedCount = cartIthem ? cartIthem.count : 0;

  const onClickAdd = () => {
    const ithem = {
      id,
      imageUrl,
      name,
      price,
      type: typeNames[activeType],
      size: activeSize,
    };

    dispatch(addIthems(ithem));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((el) => (
            <li
              onClick={() => setActiveType(el)}
              className={activeType === el ? 'active' : ''}
              key={el}>
              {typeNames[el]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((el) => (
            <li
              key={el + price}
              onClick={() => setActiveSize(el)}
              className={activeSize === el ? 'active' : ''}>
              {el} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
