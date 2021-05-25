import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userp = [
    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
      id: 1,
      label: "Make Remittance",
      link: "/app/typography",
      icon: <TypographyIcon />,
    },
    {
      id: 2,
      label: "Transaction Details",
      link: "/app/tables",
      icon: <TableIcon />,
    },
    {
      id: 3,
      label: "Quick send",
      link: "/app/notifications",
      icon: <NotificationsIcon />,
    },
    { id: 5, type: "divider" },
    { id: 6, type: "title", label: "HELP" },

    {
      id: 8,
      label: "Support",
      link: "https://lanstar.co.ke",
      icon: <SupportIcon />,
    },
    {
      id: 9,
      label: "FAQ",
      link: "https://lanstar.co.ke",
      icon: <FAQIcon />,
    },
    { id: 10, type: "divider" },
    {
      id: 9,
      label: "Settings",
      link: "https://lanstar.co.ke",
      icon: <FAQIcon />,
    },
  ];

  const Admin = [
    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
      id: 4,
      label: "Admin",
      link: "/app/ui",
      icon: <UIElementsIcon />,
      children: [
        { label: "view Transactions", link: "/app/ui/icons" },
        { label: "Add client", link: "/app/ui/charts" },
        { label: "register user", link: "/app/ui/maps" },
      ],
    },
    { id: 5, type: "divider" },
    { id: 6, type: "title", label: "HELP" },

    {
      id: 8,
      label: "Support",
      link: "https://lanstar.co.ke",
      icon: <SupportIcon />,
    },
    {
      id: 9,
      label: "FAQ",
      link: "https://lanstar.co.ke",
      icon: <FAQIcon />,
    },
    { id: 10, type: "divider" },
    {
      id: 9,
      label: "Settings",
      link: "https://lanstar.co.ke",
      icon: <FAQIcon />,
    },
  ];
  if (user.data.roles.role === "ADMIN") {
    return Admin;
  } else if (user.data.roles.role === "USER") {
    return userp;
  }
};

const tructure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Send Money",
    link: "/app/typography",
    icon: <TypographyIcon />,
  },
  {
    id: 2,
    label: "Transaction Details",
    link: "/app/tables",
    icon: <TableIcon />,
  },
  {
    id: 3,
    label: "Quick send",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "Admin",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "view Transactions", link: "/app/ui/icons" },
      { label: "Add client", link: "/app/ui/charts" },
      { label: "register user", link: "/app/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },

  {
    id: 8,
    label: "Support",
    link: "https://flatlogic.com/forum",
    icon: <SupportIcon />,
  },
  {
    id: 9,
    label: "FAQ",
    link: "https://flatlogic.com/forum",
    icon: <FAQIcon />,
  },
  { id: 10, type: "divider" },
  {
    id: 9,
    label: "Settings",
    link: "https://flatlogic.com/forum",
    icon: <FAQIcon />,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure().map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
