import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from 'universal-cookie';
import { Chat } from "./components/chat";
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config'; 




const cookies = new Cookies();

function App() {
 const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
 const [room, setRoom] = useState(null);
 const roomInputRef = useRef(null);
const signUserOut = async () => {
  await signOut(auth);
  cookies.remove("auth-token");
setIsAuth(false);
setRoom(null);
}

 if (!isAuth){
  return (
  <div>
    <Auth setIsAuth={setIsAuth} />
  </div>
);
}

return(

<div className="root">
            <div className="header-auth">
                <span className="contenu-header">
                    <img src='logo192.png' id="heartImage" className="coeur" alt="Coeur blanc" />
                    <span className='Leonard-Rien'>Léonard Rien</span>
                    <span className='titre-header'>Messagerie</span>
                   

                </span>
                <button onClick={signUserOut} class="IconeMenu"></button>
                
            </div>

    {room ? (
    <Chat room={room}/> 
   ) : (
    <>
  <div className="bloc1">
    Entre le nom du salon :
  </div>
  <form className="bloc2"> 
    <input className="input-nomSalon" ref={roomInputRef} />
    <button className="bouton-Entrer" onClick={()=> setRoom(roomInputRef.current.value)}>
      Entrer dans le salon
      </button>
      </form>
 </>
  )}
  
  </div>
  
  );
}
export default App;