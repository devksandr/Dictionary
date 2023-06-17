import { FilesPage } from "./components/pages/FilesPage/FilesPage";
import { FilePage } from "./components/pages/FilePage/FilePage";
import { PhrasesPage } from "./components/pages/PhrasesPage/PhrasesPage";
import { SettingsPage } from "./components/pages/SettingsPage/SettingsPage";
import { NotFoundPage } from "./components/pages/NotFoundPage/NotFoundPage";

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
    path: '/file/:id/:slugname',
    element: <FilePage />
  },
  {
    path: '/phrases/',
    element: <PhrasesPage />
  },
  {
    path: '/settings/',
    element: <SettingsPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default AppRoutes;
