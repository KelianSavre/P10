import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// const cl = (value) => {
//   console.log(value)
// }

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ); /* Changement de signe pour inverser l'ordre */

  /* Ajout de -1 a la verification de length pour corriger la page blanche + test ajout d'une condition pour corriger erreur lecture length */

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (byDateDesc) {
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 5000);

    return () => clearInterval(intervalID);
  }, [
    index,
    byDateDesc,
  ]); /* remplacement setTimeout par setInterval+clearInterval */
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          {/* Correction div pour la mise en place de la key et le non partage dans le reste des elements */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
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
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`test${_.title}`} /* Modification de key pour les rendre uniques */
                  type="radio"
                  name="radio-button"
                  checked={
                    index === radioIdx
                  } /* Ajout test de readonly suite a une erreur */
                  readOnly
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
