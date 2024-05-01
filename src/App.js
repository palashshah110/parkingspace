import "./App.css";
import ParkingApp from "./Component/ParkingApp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingLots from "./Component/ParkingLots.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store.tsx";

function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ParkingApp />}></Route>
            <Route path="/parkinglot" element={<ParkingLots />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
