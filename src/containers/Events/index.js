import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements par page

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(); // Stocke le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle

  const filteredEvents = (
    (!type
      ? data?.events || [] // Si aucun type sélectionné, affiche tous les événements
      : data?.events.filter((event) => event.type === type)) || [] // Affiche les événements filtrés par type
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index && // Vérifie si l'index de l'élément est dans la plage de la page actuelle
      PER_PAGE * currentPage > index // Vérifie si l'index de l'élément est dans la plage de la page actuelle
    ) {
      return true; // Si l'élément doit être affiché sur la page actuelle, retourne true
    }
    return false;
  });

  const changeType = (evtType) => {
    // Fonction appelée lorsqu'un nouveau type d'événement est sélectionné
    setCurrentPage(1); // Réinitialise la page actuelle lorsque le type est changé
    setType(evtType); // Met à jour le type d'événement sélectionné
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // Nombre total de pages
  const typeList = new Set(data?.events?.map((event) => event.type) || []); // Liste des types d'événements disponibles

  return (
    <>
      {error && <div>Une erreur est survenue</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} /* Liste des choix pour le type d'événement */
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
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
              ))
            ) : (
              <div>Aucun événement disponible pour cette catégorie.</div>
            )}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              /* eslint-disable-next-line react/no-array-index-key */
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
