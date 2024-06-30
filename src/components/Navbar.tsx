import {
  INavLink,
  INavLinkGroup,
  INavStyles,
  Nav,
  NeutralColors,
} from "@fluentui/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navStyles: Partial<INavStyles> = {
  root: {
    width: 210,
    overflowY: "auto",
    background: NeutralColors.white,
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
    "@media (max-width: 720px)": {
      width: "100%",
    },
  },
  groupContent: {
    marginBottom: "0",
  },
};

export const Navbar = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkGroups: INavLinkGroup[] = useMemo(
    () => [
      {
        links: [
          {
            name: "Home",
            url: "/",
            icon: "Home",
            key: "home",
          },
          {
            name: "Search contact",
            url: "/search",
            icon: "ProfileSearch",
            key: "search",
          },
        ],
      },
    ],
    []
  );

  const handleOnLinkClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
    item: INavLink | undefined
  ) => {
    if (item && e) {
      e.preventDefault();
      navigate(item.url);
    }
  };

  useEffect(() => {
    const navLink = navLinkGroups[0].links.find(
      (link) => link.url === location.pathname
    );
    if (navLink && navLink.key) setSelectedLink(navLink.key);
  }, [location, navLinkGroups]);

  return (
    <Nav
      onLinkClick={(e, item) => handleOnLinkClick(e, item)}
      selectedKey={selectedLink}
      groups={navLinkGroups}
      styles={navStyles}
    />
  );
};
