import "./App.css";
import ParkingApp from "./Component/ParkingApp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingLot from "./Component/ParkingLot.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store.tsx";

function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ParkingApp />}></Route>
            <Route path="/parkinglot" element={<ParkingLot />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
