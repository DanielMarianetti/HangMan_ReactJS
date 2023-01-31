import { useEffect, useState } from 'react'
import './App.css'
import { HangImage } from './components/HangImage'
import {letters} from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord'

function App() {

  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState(('_ ').repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false)
  const [won, setWon] = useState(false);
  const [alreadyGuessedLetter, setAlreadyGuessedLetter] = useState(false);

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord(('_ ').repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
    setAlreadyGuessedLetter(false);

  }

  //Determinar si el usuario perdió
  useEffect(() => {
    if(attempts === 9) {
      setLose(true);
    }
  }, [attempts]); //hooks


  //Determinar si el usuario perdió
  useEffect(() => {
    if(hiddenWord.split(" ").join("") === word){
      setWon(true);
    }
  }, [hiddenWord])

  const incrementAttempts = () => {
    setAttempts(Math.min(attempts + 1, 9));
  }

  const checkLetter = (letter: string) => {
    if(lose || won) return;

    // Check already guessed letter
    if(hiddenWord.includes(letter)){
      setAlreadyGuessedLetter(true);
      incrementAttempts();
      return;
    } 

    setAlreadyGuessedLetter(false);
    console.log(alreadyGuessedLetter);
    // end

    if(!(word.includes(letter))){
      incrementAttempts();
      return;
    } 

    const hiddenWordArray = hiddenWord.split(" ");
    
    for(let i = 0; i < word.length; i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  }

  return(
    <div className="App">
      {/* Imágenes */}
      <HangImage imageNumber={attempts}/>

      {/* Palabra oculta */}
      <h3>{ hiddenWord }</h3>

      {/* Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/* Mensaje letra ya adivinada*/}
      {
        (alreadyGuessedLetter) ? <h6>You already guessed that letter, that counts as a miss</h6> : ""
      }



      {/* Mensaje de fin de juego */}
      {
        (lose) ? <h2 id='mensajePerder'>You lost the game, the word was {word.toUpperCase()}</h2>: ""
      }
      {
        (won) ? <h2 className='mensajeGano'>You won!!!</h2> : ""
      }

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

      <br></br>
      <button onClick={newGame}>¿Nuevo juego?</button>
    </div>
  )
}

export default App
