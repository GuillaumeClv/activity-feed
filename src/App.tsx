import { FilterProvider } from "./context";
import { ActivityFeed } from "./components";
import "./App.css";

function App() {
  return (
    <FilterProvider>
      <ActivityFeed />
    </FilterProvider>
  );
}

export default App;
