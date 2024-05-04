import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./components/WeatherApp";
import Home from "./components/HomePage";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar brandName="EpiWeather" />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/WeatherApp/:lat/:lon" element={<Weather />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
