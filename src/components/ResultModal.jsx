import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";
{/*Objectif est d'afficher le dialog à l'interieur du composant TimerChallenge
  une fois que le jeu est terminé pour ça il faut passer en paramètre un ref 
  problème est que le TimerChallenge qui utilise le composant ResultModal 
  à la fin doit savoir que le ref de dialogue sera attachée à élément dialog  
  */}
const ResultModal = forwardRef(function ResultModal(
  {targetTime, remainingTime, onReset}, ref
){
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100) ;
  // permet de définir les propriétés et méthodes qui doivent être accessibles 
  // sur ce composant depuis l'extérieur
  useImperativeHandle(ref, () => {
    return {
      open(){
        dialog.current.showModal();
      }
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>You score: {score}</h2>}

      <p>
        The target time was {""}
        <strong>
            {targetTime} second{targetTime>1 ? 's' : ''}
        </strong>
      </p>
      <p>
        You stopped the timer with {""}
        <strong>
          {formattedRemainingTime} second{formattedRemainingTime>1 ? 's' : ''} left.
        </strong>
      </p>
  
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
});

export default ResultModal;