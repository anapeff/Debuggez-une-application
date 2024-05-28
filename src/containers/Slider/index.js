import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // Nouvelle fonction de comparaison 
  // new Date(evtA.date) < new Date(evtB.date) ? 1 : 1 Ancienne fonction de comparaison
 
  );
  const nextCard = () => {
    setTimeout(
 // () => setIndex(index < byDateDesc.length ? index + 1 : 0), Ancienne fonction (index = 0/1/2/3 car byDateDesc.length = 3)
    () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // Nouvelle fonction (index = 0/1/2 car byDateDesc.length - 1 = 2)
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Remplacement de <></> par une div en ajoute la Key >
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
               
                  key={`${_.id}`}
                  type="radio"
                  name="radio-button"
                  // Modification de idx en index
                  checked={index=== radioIdx}
                  onChange={() => null}
                />
              ))}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
