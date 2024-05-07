import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from 'firebase/auth';
import "./styles/chat.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Auth = (props) => {
    const { setIsAuth } = props;

    const signInWithGoogle = async () => {  
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="root">
            <div className="header-auth">
                <span className="contenu-header">
                    <img src='./images/coeur_blanc.webp' id="heartImage" className="coeur" alt="Coeur blanc" />
                    <span className='Leonard-Rien'>Léonard Rien</span>
                    <span className='titre-header'>Messagerie</span>
                </span>
            </div>
            <div className="bloc1">Hey ! Ceci est une messagerie instantanée en ligne, depuis un navigateur et j'espère bientôt en WebApp, en application.
            </div>
            <div className="bloc2">Pour y accéder, tu dois te connecter avec Google :
            <button className="bouton-SignIn" onClick={signInWithGoogle}>Connexion</button>
            </div>
            <div className="auth">
               
                
            </div>
        </div>
    );
};