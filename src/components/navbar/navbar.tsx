/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./navbar.css";
import { findParent, linksArray } from "../../utils";
import { ExpandIconRight } from "../../icons/expand-icon";

type NavbarProps = {
  shouldShow: boolean;
  scrollSelected: number;
};

export const Navbar = (props: NavbarProps) => {
  const { shouldShow, scrollSelected } = props;
  const [canSelectNavLink, setCanSelectNavLink] = React.useState(false);

  const [links, setLinks] = React.useState(linksArray);

  const handleOnClick = (event: any) => {
    const target = event.target;

    if (window.innerWidth >= 870 || canSelectNavLink) {
      const getSection = document?.getElementById(
        `${target?.innerText?.replace(" ", "-")}`
      );

      if (getSection) {
        let scrollHeight = getSection.getBoundingClientRect().top + window.scrollY;

        if (getSection.id === "Projects") {
          scrollHeight -= 400;
        } else if (getSection.id === "Contacts") {
          scrollHeight -= 200;
        } else {
          scrollHeight = 0
        }


        window.scrollTo({
          top: scrollHeight,
          behavior: "smooth",

        })
      }

      if (target.classList.contains("navbar-link")) {
        const currentSelected = links.map((link) => {
          return {
            ...link,
            selected: link.text === target.innerText,
          };
        });

        setLinks(currentSelected);
      }
    }

    const expandIcon = findParent(target, "expand-icon");

    if (expandIcon) {
      const navbar = document.querySelector(".navbar");
      navbar?.classList.toggle("expanded");

      if (canSelectNavLink) {

        navbar?.classList.remove("show-expand-text");

        setTimeout(() => {
          setCanSelectNavLink(!canSelectNavLink);
        }, 600);
      } else {
        setTimeout(() => {
          setCanSelectNavLink(!canSelectNavLink);
          navbar?.classList.add("show-expand-text");
        }, 600);
      }
    }
  };

  React.useEffect(() => {
    const updatedLinks = links.map((link, index) => {
      return {
        ...link,
        selected: index === scrollSelected,
      };
    });

    setLinks(updatedLinks);
  }, [scrollSelected]);

  return (
    <div
      role="navigation"
      aria-hidden={shouldShow ? "false" : "true"}
      onClick={handleOnClick}
      className={`${shouldShow ? "show" : "hide"} navbar`}
    >
      <span className="expand-icon">
        < ExpandIconRight dir={canSelectNavLink ? "left" : "right"} />
      </span>

      {links.map((link) => {
        const logo = link.text === "logo";

        if (logo) {
          return (
            <svg
              className="logo"
              key={link.text}
              viewBox="0 0 146 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.52134 19.608V18.1875L13.956 12.3636V14.6364L5.18469 18.8622L5.25571 18.7202V19.0753L5.18469 18.9332L13.956 23.1591V25.4318L2.52134 19.608Z"
                fill="#268E0C"
              />
              <path
                d="M18.5795 26V23.25H23.3295V10.525L18.5545 14.075V10.775L22.7545 7.75H26.4545V23.25H30.2795V26H18.5795ZM38.9698 26.25C37.7864 26.25 36.7614 26.025 35.8948 25.575C35.0281 25.125 34.3531 24.4917 33.8698 23.675C33.4031 22.8583 33.1698 21.9 33.1698 20.8V12.95C33.1698 11.85 33.4031 10.8917 33.8698 10.075C34.3531 9.25833 35.0281 8.625 35.8948 8.175C36.7614 7.725 37.7864 7.5 38.9698 7.5C40.1698 7.5 41.1948 7.725 42.0448 8.175C42.9114 8.625 43.5781 9.25833 44.0448 10.075C44.5281 10.8917 44.7698 11.85 44.7698 12.95V20.8C44.7698 21.9 44.5281 22.8583 44.0448 23.675C43.5781 24.4917 42.9114 25.125 42.0448 25.575C41.1781 26.025 40.1531 26.25 38.9698 26.25ZM38.9698 23.55C39.8364 23.55 40.5281 23.3 41.0448 22.8C41.5614 22.3 41.8198 21.6333 41.8198 20.8V12.95C41.8198 12.1167 41.5614 11.45 41.0448 10.95C40.5281 10.45 39.8364 10.2 38.9698 10.2C38.1031 10.2 37.4114 10.45 36.8948 10.95C36.3781 11.45 36.1198 12.1167 36.1198 12.95V20.8C36.1198 21.6333 36.3781 22.3 36.8948 22.8C37.4114 23.3 38.1031 23.55 38.9698 23.55ZM38.9698 18.5C38.4864 18.5 38.0864 18.3417 37.7698 18.025C37.4698 17.7083 37.3198 17.3 37.3198 16.8C37.3198 16.3 37.4698 15.9 37.7698 15.6C38.0698 15.3 38.4698 15.15 38.9698 15.15C39.4698 15.15 39.8698 15.3 40.1698 15.6C40.4698 15.9 40.6198 16.3 40.6198 16.8C40.6198 17.3 40.4698 17.7083 40.1698 18.025C39.8698 18.3417 39.4698 18.5 38.9698 18.5ZM53.96 26.25C52.7767 26.25 51.7517 26.025 50.885 25.575C50.0183 25.125 49.3433 24.4917 48.86 23.675C48.3933 22.8583 48.16 21.9 48.16 20.8V12.95C48.16 11.85 48.3933 10.8917 48.86 10.075C49.3433 9.25833 50.0183 8.625 50.885 8.175C51.7517 7.725 52.7767 7.5 53.96 7.5C55.16 7.5 56.185 7.725 57.035 8.175C57.9017 8.625 58.5683 9.25833 59.035 10.075C59.5183 10.8917 59.76 11.85 59.76 12.95V20.8C59.76 21.9 59.5183 22.8583 59.035 23.675C58.5683 24.4917 57.9017 25.125 57.035 25.575C56.1683 26.025 55.1433 26.25 53.96 26.25ZM53.96 23.55C54.8267 23.55 55.5183 23.3 56.035 22.8C56.5517 22.3 56.81 21.6333 56.81 20.8V12.95C56.81 12.1167 56.5517 11.45 56.035 10.95C55.5183 10.45 54.8267 10.2 53.96 10.2C53.0933 10.2 52.4017 10.45 51.885 10.95C51.3683 11.45 51.11 12.1167 51.11 12.95V20.8C51.11 21.6333 51.3683 22.3 51.885 22.8C52.4017 23.3 53.0933 23.55 53.96 23.55ZM53.96 18.5C53.4767 18.5 53.0767 18.3417 52.76 18.025C52.46 17.7083 52.31 17.3 52.31 16.8C52.31 16.3 52.46 15.9 52.76 15.6C53.06 15.3 53.46 15.15 53.96 15.15C54.46 15.15 54.86 15.3 55.16 15.6C55.46 15.9 55.61 16.3 55.61 16.8C55.61 17.3 55.46 17.7083 55.16 18.025C54.86 18.3417 54.46 18.5 53.96 18.5ZM121.797 6.96591L115.938 28.7344H114.02L119.88 6.96591H121.797ZM136.319 19.608L124.885 25.4318V23.1591L133.656 18.9332L133.585 19.0753V18.7202L133.656 18.8622L124.885 14.6364V12.3636L136.319 18.1875V19.608Z"
                fill="#268E0C"
              />
              <path
                d="M65.6002 30.5L67.5252 25.25L62.4002 12.25H65.8252L68.3752 19.275C68.5086 19.6583 68.6419 20.125 68.7752 20.675C68.9086 21.2083 69.0086 21.65 69.0752 22C69.1586 21.65 69.2669 21.2083 69.4002 20.675C69.5336 20.125 69.6669 19.6583 69.8002 19.275L72.2002 12.25H75.5002L68.8752 30.5H65.6002ZM82.4155 26.25C80.9988 26.25 79.8821 25.875 79.0655 25.125C78.2488 24.375 77.8405 23.3667 77.8405 22.1C77.8405 20.75 78.2905 19.7083 79.1905 18.975C80.0905 18.2417 81.3655 17.875 83.0155 17.875H86.4405V16.7C86.4405 16.0333 86.2238 15.5167 85.7905 15.15C85.3571 14.7667 84.7655 14.575 84.0155 14.575C83.3321 14.575 82.7655 14.725 82.3155 15.025C81.8655 15.325 81.5988 15.7333 81.5155 16.25H78.4655C78.6155 14.95 79.1988 13.9167 80.2155 13.15C81.2321 12.3833 82.5321 12 84.1155 12C85.7988 12 87.1238 12.425 88.0905 13.275C89.0738 14.1083 89.5655 15.2417 89.5655 16.675V26H86.5405V23.6H86.0405L86.5405 22.925C86.5405 23.9417 86.1655 24.75 85.4155 25.35C84.6655 25.95 83.6655 26.25 82.4155 26.25ZM83.4405 23.9C84.3238 23.9 85.0405 23.675 85.5905 23.225C86.1571 22.775 86.4405 22.1917 86.4405 21.475V19.8H83.0655C82.4321 19.8 81.9238 19.9833 81.5405 20.35C81.1571 20.7167 80.9655 21.2 80.9655 21.8C80.9655 22.45 81.1821 22.9667 81.6155 23.35C82.0655 23.7167 82.6738 23.9 83.4405 23.9ZM93.3557 26V12.25H96.4057V14.875H97.2557L96.4057 15.6C96.4057 14.4667 96.7307 13.5833 97.3807 12.95C98.0474 12.3167 98.9557 12 100.106 12C101.456 12 102.531 12.45 103.331 13.35C104.147 14.25 104.556 15.4583 104.556 16.975V26H101.431V17.3C101.431 16.4667 101.214 15.825 100.781 15.375C100.347 14.925 99.739 14.7 98.9557 14.7C98.189 14.7 97.5807 14.9333 97.1307 15.4C96.6974 15.8667 96.4807 16.5333 96.4807 17.4V26H93.3557Z"
                fill="#EEEEF0"
              />
            </svg>
          );
        }
        return (
          <span
            aria-label={link.text}
            key={link.text}
            className={`navbar-link ${link.selected ? "selected" : ""}`}
          >
            {link.text}
          </span>
        );
      })}
    </div>
  );
};
