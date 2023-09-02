import "./App.css";
import { Header } from "./components/Header";
import { Sound } from "./components/Sound";
import { GameBoard } from "./components/GameBoard";

const App = () => {

  ////////RETURN PLAYING AREA/APP///////////////////

  return (
    <section className="container">
      <Header />
    <GameBoard/>
      <Sound />
    </section>
  );
};
export default App;
