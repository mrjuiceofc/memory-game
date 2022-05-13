import { useEffect, useState } from "react";
import ScoreBoard from "./GameBody/ScoreBoard.js";
import Modal from "./Modal.js";
import Card from "./GameBody/Card.js";
import cat1 from "../assets/img/cat1.jpg";
import cat2 from "../assets/img/cat2.jpg";
import cat3 from "../assets/img/cat3.jpg";
import cat4 from "../assets/img/cat4.jpg";
import cat5 from "../assets/img/cat5.jpg";
import cat6 from "../assets/img/cat6.jpg";
import cat7 from "../assets/img/cat7.jpg";
import cat8 from "../assets/img/cat8.jpg";
import cat9 from "../assets/img/cat9.jpg";
import cat10 from "../assets/img/cat10.jpg";
import cat11 from "../assets/img/cat11.jpg";
import cat12 from "../assets/img/cat12.jpg";

export default function Main() {
  // state to change the url of images
  const [allCards, setAllCards] = useState(shuffleArr());
  // keep record of the clicked img
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [result, setResult] = useState(false);

  // effect to update current score after every click
  useEffect(() => {
    setCurrentScore(clicked.length);
  }, [clicked]);

  // set best score after comparing between current and best score
  useEffect(() => {
    setBestScore((prevScore) =>
      currentScore > prevScore ? currentScore : prevScore
    );
  }, [currentScore]);

  // check if current score is 12 and if so setResult to true
  useEffect(() => {
    if (currentScore === 12) {
      setResult(true);
    }
  }, [currentScore]);

  function shuffleArr() {
    const catsArray = [
      { url: "😂", id: "img1" },
      { url: "😍", id: "img2" },
      { url: "😊", id: "img3" },
      { url: "😭", id: "img4" },
      { url: "🥰", id: "img5" },
      { url: "😎", id: "img6" },
      { url: "😉", id: "img7" },
      { url: "🤔", id: "img8" },
      { url: "😋", id: "img9" },
      { url: "😇", id: "img10" },
      { url: "😜", id: "img11" },
      { url: "😒", id: "img12" },
    ];
    for (let i = catsArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      const temp = catsArray[i];
      catsArray[i] = catsArray[random];
      catsArray[random] = temp;
    }
    return catsArray;
  }

  // handle click on img
  function handleClick(id) {
    if (clicked.includes(id)) {
      setResult(true);
    } else {
      setClicked((prev) => [...prev, id]);
      setAllCards(shuffleArr());
    }
  }
  // create array of card components
  const cards = allCards.map((card) => (
    <Card key={card.id} {...card} handleClick={handleClick} />
  ));

  // reset game
  function restartGame() {
    setCurrentScore(0);
    setClicked([]);
    setResult(false);
  }

  return (
    <main className="mx-auto p-4 md:w-3/4">
      <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      <section className="grid grid-cols-2 gap-4 justify-items-center md:grid-cols-3">
        {cards}
      </section>
      {result && <Modal score={currentScore} resetGame={restartGame} />}
      {result && <div className="overlay"></div>}
    </main>
  );
}
