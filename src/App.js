import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Pages from "./Components/Pages/Pages";
import { AppProvider } from "./Components/Context/AppContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Pages />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
