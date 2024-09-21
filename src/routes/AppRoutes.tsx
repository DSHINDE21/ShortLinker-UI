import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import LoginPage from "@ShortLinker/pages/LoginPage";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import DashboardPage from "@ShortLinker/pages/Dashboard";

const openRoutes = [
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  // Add more open routes as needed
];

const closedRoutes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
  // Add more closed routes as needed
];

const AppRoutes = () => {
  const allRoutes = [...openRoutes, ...closedRoutes];

  const element = useRoutes(allRoutes);

  return <Suspense fallback={<Spinner />}>{element} </Suspense>;
};

export default AppRoutes;
