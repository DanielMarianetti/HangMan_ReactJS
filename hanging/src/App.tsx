import { useEffect, useState } from 'react'
import './App.css'
import { HangImage } from './components/HangImage'
import {letters} from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord'

function App() {

  const [word] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState( '_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  //El jugador perdió
  useEffect( () => {
    if(attempts === 9){
      setLose(true)
    }
  }, [attempts]); //hooks

  //El jugador ganó
  useEffect(() => {
    console.log(hiddenWord.split(' ').join(''));
    if(hiddenWord.split(' ').join('') === word){
      console.log("same")
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {

    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }
      const hiddenWordArray = hiddenWord.split(" ");
      console.log(letter, "existe");
      for(let i = 0; i < word.length; i++){
        if (word[i] === letter){
          hiddenWordArray[i] = letter;
        }
      }
      setHiddenWord(hiddenWordArray.join(" "))
  }

  return(
    <div className="App">
      {/* Imágenes */}
      <HangImage imageNumber={attempts}/>

      {/* Palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/*Mensaje si perdió*/}
      {
        lose ? 
        <h2 id='mensajePerder'>Usted perdió, la palabra oculta es {word}</h2> 
        : " "
      }

      {/*Mensaje si ganó*/}
      {
        won ? 
        <h2 className='mensajeGano'>Usted ganó, FELICITACIONES</h2> 
        : " "
      }

      {/* Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/* Botones de letras */}
      {
        letters.map((letter) => 
          <button
            onClick={() => checkLetter(letter)} 
            key = {letter}>
              {letter}
          </button>
        )
      }
    </div>
  )
}

export default App
