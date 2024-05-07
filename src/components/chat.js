import { useEffect, useState } from "react";
import { addDoc, 
         collection, 
         serverTimestamp, 
         onSnapshot, 
         query,
         where,
         orderBy} from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import './styles/chat.css'

export const Chat = (props) => {
    const {room} = props;
  const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState([])
  const messagesRef = collection(db, "messages2");


   useEffect(() => {
      const queryMessages = query(
      messagesRef, 
      where("room","==",room), 
      orderBy("createdAt")
    );
      const unsubscribe =  onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
              snapshot.forEach((doc) => {
              messages.push({...doc.data(), id: doc.id});
              });
        setMessages(messages);
      });
      return () => unsubscribe();
   }, [messagesRef, room]);

  const handleSubmit = async (e) =>{
  e.preventDefault();
  if (newMessage === "") return;

  await addDoc(messagesRef, {
    text: newMessage,
    createdAt: serverTimestamp(),
    utilisateur: auth.currentUser ? auth.currentUser.displayName : "Utilisateur inconnu",
    photo: auth.currentUser.photoURL,
    email: auth.currentUser.email,
    room,
  });

  setNewMessage("");
};

return (
    <div className="chat-app">
      <div className="header">
        <div className="NomSalon">Bienvenue dans le salon {room}</div>
      </div>
      <div className="messages"> 
        {messages.map((message) => (
          message.email === auth.currentUser.email ? (
            <div className="message-soi" key={message.id}>
              <div className="message-texte">
    
                <div className="message-contenu">{message.text}</div>
              </div>
            
            </div>
          ) : (
            <div className="message-autre" key={message.id}>
              <img className="photo-utilisateur" src={message.photo} alt="Photo de l'utilisateur"></img>
              <div className="message-texte">
                <div className="nom-utilisateur">{message.utilisateur}</div>
                <div className="message-contenu">{message.text}</div>
              </div>
            </div>
          )
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input 
          className="new-message-input" 
          placeholder="Écrire un message ici..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Envoyer
        </button>
      </form>
    </div>
  );} 