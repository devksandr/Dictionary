import { FilesPage } from "./components/pages/FilesPage/FilesPage";
import { FilePage } from "./components/pages/FilePage/FilePage";
import { PhrasesPage } from "./components/pages/PhrasesPage/PhrasesPage";

const AppRoutes = [
  {
    index: true,
    path: '/',
    element: <FilesPage />
  },
  {
    path: '/file/:id',
    element: <FilePage />
  },
  {
    path: '/phrases/',
    element: <PhrasesPage />
  }
];

export default AppRoutes;
