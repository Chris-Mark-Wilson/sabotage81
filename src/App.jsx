import "./App.css";
import { Header } from "./components/Header";
import { Sound } from "./components/Sound";
import { GameBoard } from "./components/GameBoard";
import { useContext } from "react"
import { GameContext } from "./gameContext"
import { StartScreen } from "./components/StartScreen";
import { HighScores } from "./components/HighScores";

const App = () => {
  const {newGame,hiScores}=useContext(GameContext)
  ////////RETURN PLAYING AREA/APP///////////////////

  return (
    <>
{newGame&&!hiScores&&<StartScreen/>}
{!newGame&&!hiScores&&
    <section className="container">
      <Header />
    <GameBoard/>
      <Sound />
    </section>
    }
    {hiScores&&<HighScores/>}
  
    </>
  );
};
export default App;
