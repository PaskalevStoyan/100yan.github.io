import React from "react";
import "./showcase.css";

import { cardsInfo, findParent } from "../../utils";

const RightArrow = () => <span className="arrow-right"></span>;

const renderParagraphText = (text: string, title: string) => {
  const regex = /<span className="text-highlight">.*?<\/span>/;

  if (regex.test(text)) {
    const splitText = text.split(regex);

    if (text.includes("Born and raised in Dobrich")) {
      return (
        <span className="paragraph-text" key={title}>
          {splitText[0]}
          <span className="text-highlight">
            a builder of things around the Internet
          </span>
          {splitText[1]}
          <span className="text-highlight">Front End Developer</span>
          {splitText[2]}
        </span>
      );
    } else if (title === "Career Path") {
      if (text.includes("My journey began")) {
        return (
          <span className="paragraph-text" key={title}>
            {splitText[0]}
            <span className="text-highlight">around 2017</span>
            {splitText[1]}
          </span>
        );
      }
    }
  }

  return text;
};
export const Showcase = (props: any) => {
  const [cards, setCards] = React.useState(
    /*JSON.parse(localStorage.getItem("selectedCard") as string) ??*/ cardsInfo
  );
  const [selectedText, setSelectedText] = React.useState({
    "About Me": 0,
    "Career Path": 0,
    Hobbies: 0,
  });

  const currentCard = cards.find((card: any) => card.selected);

  const onCardClick = (event: any) => {
    const target = event.target;
    const newSelectedCard = findParent(target);

    const currentSelectedCard = document.querySelector(".selected-card");

    if (!newSelectedCard?.classList.contains("selected-card")) {
      currentSelectedCard?.classList.add("rmv-c-animation");

      const addAnimation = newSelectedCard?.classList.contains("card-2")
        ? "add-c-2-animation"
        : "add-c-3-animation";

      newSelectedCard?.classList.add(addAnimation);

      setTimeout(() => {
        currentSelectedCard?.classList.remove("rmv-c-animation");
        newSelectedCard?.classList.remove(addAnimation);

        const currentArraySelected = cards.findIndex(
          (card: any) => card.selected
        );

        const newCards = cards.map((card: any) => {
          if (
            card.title === newSelectedCard?.querySelector("h2")?.textContent
          ) {
            return { ...card, selected: true };
          } else {
            return { ...card, selected: false };
          }
        });

        const newArraySelected = newCards.findIndex(
          (card: any) => card.selected
        );

        [newCards[currentArraySelected], newCards[newArraySelected]] = [
          newCards[newArraySelected],
          newCards[currentArraySelected],
        ];
        setCards(newCards);

        localStorage.setItem("selectedCard", JSON.stringify(newCards));
      }, 950);
    }
  };

  const changeText = (event: any) => {
    const target = event.target;
    const currentCard: any = cards.find((card: any) => card.selected);

    console.log(currentCard);
    const selectedTextIndex = selectedText[currentCard.title];
    console.log(
      selectedTextIndex,
      currentCard.text.length,
      selectedTextIndex < currentCard.text.length - 1
    );

    if (target.innerText === "Next") {
      if (selectedTextIndex < currentCard.text.length - 1) {
        setSelectedText({
          ...selectedText,
          [currentCard.title]: selectedTextIndex + 1,
        });
      } else {
        setSelectedText({
          ...selectedText,
          [currentCard.title]: 0,
        });
      }
    } else if (target.innerText === "Prev") {
      if (selectedTextIndex > 0) {
        setSelectedText({
          ...selectedText,
          [currentCard.title]: selectedTextIndex - 1,
        });
      } else {
        setSelectedText({
          ...selectedText,
          [currentCard.title]: currentCard.text.length - 1,
        });
      }
    }
  };

  return (
    <div className="showcase">
      <div className="showcase-introduction">
        <h2 className="showcase-mid-headings">Hello Wanderer!</h2>
        <h1 className=" typewriter typing-demo showcase-big-heading">
          My name is{" "}
          <span className="name-text">
            <span className="name text-highlight">Stoyan</span>
            <span className=" name text-highlight surname">Paskalev.</span>
          </span>
        </h1>
        <p className="showcase-paragraph paragraph">
          Welcome to my adventures in the Website building World!
        </p>
      </div>

      <div className="showcase-about-me">
        <div className="cards-container">
          <div className="cards-wrapper">
            {cards.map((card: any, index: any) => (
              <div
                key={card.title}
                onClick={onCardClick}
                className={`card-item card-${index + 1} ${
                  card.selected ? "selected-card" : ""
                }`}
              >
                <div className="card-heading">
                  <h2>{card.title}</h2>
                  {card.title === "Career Path" && card.selected ? (
                    <span className="show-tech">
                      <span className="show-tech-text">
                        Hover for Technologies
                      </span>
                    </span>
                  ) : null}

                  {card.selected ? null : <RightArrow />}
                </div>
                <div className="card-paragraph">
                  <>
                    {renderParagraphText(
                      card.text[selectedText[card.title]],
                      card.title
                    )}
                  </>
                </div>
                {currentCard?.text.length! > 1 ? (
                  <div className="card-buttons">
                    <button onClick={changeText} className="card-button">
                      Prev
                    </button>
                    <button onClick={changeText} className="card-button">
                      Next
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
