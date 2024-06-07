import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // recupère seulement "data" du context (les événements)
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) => // ordonne les événements du plus ancien au plus récent. Dans Data il y a evenements et focus.
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // si eventA es inferieur à eventB rend -1, s'il est sup +1.
  )|| []; // débug: si data est undefined, alors on montre un array vide. //
  const nextCard = () => { // additione 1 card tant que l'index est inférieur au nombre d'événements, si non il retourne au premier élément.
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // débug: setIndex(index < byDateDesc.length ? index + 1 : 0) il manque le -1
      5000
    );
  };
  
  useEffect(() => { 
    nextCard();
  });
  
  return (
    <div className="SlideCardList">
      {/* débug: j'ai changé la portée de la div afin de bien separer le slider de la paginations */}
        {byDateDesc?.map((event, idx) => (// map des événement, puis on crée un élément par événement, et comme 2ème argument il y a un idx de ces éléments
          <div // div pour chaque événement avec une key et la possibilité de montrer ou cacher l'image si l'idx des éléments coincide avec l'index des événements
            key={event.description} // débug: j'ai utilisé la descritpion des événements pour differencier les éléments. //
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" /> {/* pour chaque événement une image différente */}
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((inpt, radioIdx) => (  // débug: byDateDesc.map((_, radioIdx)
                <input
                  key={inpt.title} // j'ai utilisé le titre des événements pour differencier les éléments. //
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} /* débug: idx === radioIdx */
                  readOnly // débug: pas de OnChange handler //
                /> 
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;