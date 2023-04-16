import { useState } from 'react'
import {Numbers, upperCase, lowerCase, Symbols} from "./Components/Characters";
import './App.scss'
import Footer from "./Components/Footer";

function App() {
const [password, setPassword] = useState("");
const [includeUpperCase, setIncludeUpperCase] = useState(false);
const [includeLowerCase, setIncludeLowerCase] = useState(false);
const [includeNumbers, setIncludeNumbers] = useState(false);
const [includeSymbols, setIncludeSymbols] = useState(false);
const [copyButtonText, setCopyButtonText] = useState("Copy");


//Create Password
const createPassword = (length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) => {
  let result = "";
  let characters = "";
  if (includeUpperCase) {
    characters = characters + upperCase;
  }

  if (includeLowerCase) {
    characters = characters + lowerCase;
  }

  if (includeNumbers) {
    characters = characters + Numbers;
  }

  if (includeSymbols) {
    characters = characters + Symbols;
  }

  for (let i = 0; i < length; i++) {
    result = result + characters.charAt(Math.floor(Math.random() * characters.length));
  }

 return result;
}

//Generate Password
const generatePassword = () => {

  if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
    setPassword("No checkbox was entered");
    return;
  } 

  const passwordLength = document.getElementById("password").value;
  if (passwordLength > 15) {
    setPassword("Cannot be greater than 15");
    return;
  }

    const newPassword = createPassword(
      passwordLength,
      includeUpperCase,
      includeLowerCase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
      // copy password to clipboard
      const tempInput = document.createElement("input");
      tempInput.type = "text";
      tempInput.value = newPassword;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      setTimeout(() => {
        setCopyButtonText("Copy"); // reset the button text after 1 second
      }, 1000);
}

  return (
    <> 
    <div className="wrapper">
  <div className="generator-container">
    <div className="main-content">
    <h2>Password Generator</h2>
    <div className="displayPassword">
      <p>{password}</p>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password Length</label>
      <input className="pw" type="number" name="password" id="password" max="15" min="5" />
    </div>
    <div className="form-group">
      <label htmlFor="upperCaseLetter">Inlclude Uppercase</label>
      <input 
      type="checkbox" 
      name="uppercase" 
      id="uppercase" 
      checked={includeUpperCase}
      onChange={(event) => setIncludeUpperCase(event.target.checked)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="lowerCaseLetter">Inlclude LowerCase</label>
      <input 
      type="checkbox" 
      name="lowercase" 
      id="lowercase" 
      checked={includeLowerCase}
      onChange={(event) => setIncludeLowerCase(event.target.checked)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="numbers">Inlclude Numbers</label>
      <input 
      type="checkbox" 
      name="numbers" 
      id="numbers" 
      checked={includeNumbers}
      onChange={(event) => setIncludeNumbers(event.target.checked)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="symbols">Inlclude Symbols</label>
      <input 
      type="checkbox" 
      name="symbols" 
      id="symbols" 
      checked={includeSymbols}
      onChange={(event) => setIncludeSymbols(event.target.checked)}
      />
    </div>
    <div className="generatePassword">
      <button className="getNewPassword" onClick={generatePassword}>New Password</button>
      <button onClick={() => {
  navigator.clipboard.writeText(password);
  setCopyButtonText("Copied");
  setTimeout(() => {
    setCopyButtonText("Copy");
  }, 1000);
}}>{copyButtonText}</button>
    </div>
  </div>
  </div>
    </div>
      <Footer/>
      </>
  )
}

export default App;
