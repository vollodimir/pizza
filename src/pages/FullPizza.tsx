import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62a070c8a9866630f80f15dd.mockapi.io/ithems/` + id,
        );
        setPizza(data);
      } catch (err) {
        alert(`Error, pizza ${id} not found ${err}`);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="content">Loadding....</div>;
  } //якщо піцца не загрузилася

  return (
    <div className="content pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt={pizza.name} />
      <h4 className="pizza-block__title">{pizza.name}</h4>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
      </div>
    </div>
  );
};

export default FullPizza;
