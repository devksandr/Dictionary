import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { FilesPage } from "./components/pages/FilesPage";
import { FilePage } from "./components/pages/FilePage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/files',
    element: <FilesPage />
  },
  {
    path: '/file/:id',
    element: <FilePage />
  }
];

export default AppRoutes;
