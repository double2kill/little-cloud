import { Routes, Route } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { HomePage } from "./pages/HomePage";
import { laniConfig } from "./characters/lani";
import { crystalConfig } from "./characters/crystal";
import {
  ROUTE_PATH_CRYSTAL,
  ROUTE_PATH_HOME,
  ROUTE_PATH_LANI,
} from "./routes";

export { ROUTE_PATH_CRYSTAL, ROUTE_PATH_HOME, ROUTE_PATH_LANI } from "./routes";

export function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATH_HOME} element={<HomePage />} />
      <Route
        path={ROUTE_PATH_LANI}
        element={<CalendarPage config={laniConfig} />}
      />
      <Route
        path={ROUTE_PATH_CRYSTAL}
        element={<CalendarPage config={crystalConfig} />}
      />
    </Routes>
  );
}
