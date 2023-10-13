import "./App.css";
import { Header } from "./components/Header";
import { Sound } from "./components/Sound";
import { GameBoard } from "./components/GameBoard";
import { useContext } from "react"
import { GameContext } from "./gameContext"
import { StartScreen } from "./components/StartScreen";

const App = () => {
  const {newGame,setNewGame}=useContext(GameContext)
  ////////RETURN PLAYING AREA/APP///////////////////

  return (
    <>
{newGame&&<StartScreen/>}
{!newGame&&
    <section className="container">
      <Header />
    <GameBoard/>
      <Sound />
    </section>
    }
  
    </>
  );
};
export default App;
