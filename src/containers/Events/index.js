import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // constante définissant le nombre d'évenements par page 

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(); // Stock le type d'évenementsélectionné (filtre)
  const [currentPage, setCurrentPage] = useState(1); // Etat pour la page actuelle 
  // Filtrage en fonction du type du type séectionné et de la page actuelle
  const filteredEvents = (
    (!type // Si aucun type sélectionné
      ? data?.events // Affiche tous les évènements
     //  : data?.events) || [] {
      :data?.events.filter(event=>event.type === type)) || [] // Sinon, filtre les événements par la type selctionné
    ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  // Focntion pour changer le type d'évènement (filtre)
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  // Calcul le nombre totla de pages 
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
