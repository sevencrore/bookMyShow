import { useEffect,useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../../style/login.css';
import { useParams, useHistory, useLocation } from "react-router-dom";


export default function ({ hide }) {
    
    const { reffered_by } = useParams();
    const history = useHistory();
    const location = useLocation();  // Get the current location object
    const [uid, setUid] = useState(null);
    
    
    useEffect(() => {
        // Extract query parameters from location.search (the part after '?')
        const params = new URLSearchParams(location.search); // Parse the query string
        const userId = params.get("uid"); // Get the 'uid' parameter
        setUid(userId); // Set the 'uid' in the state
    }, [location.search]); // Dependency array - will run when the URL changes
    function googleLogin() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        // Sign in with Google
        signInWithPopup(auth, provider)
            .then((result) => {
                // Extract the Google Access Token (optional)
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user; // Firebase user object

                console.log("Logged in user:", user);

                // Send user data to your backend
                fetch(`${process.env.REACT_APP_HOST}/users/createUser`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        email: user.email,
                        displayName: user.displayName,
                        uid: user.uid, // You can send any relevant data here
                        reffered_by: uid,
                    }),
                })
                    .then(async (res) => {
                        const data = await res.json();
                        console.log("Created User:", data);

                        // Assuming the response contains the _id of the created user
                        const userId = data.user._id; // Adjust according to your backend response

                        // Store user info and user_id in localStorage
                        localStorage.setItem('user', JSON.stringify(user)); // Store entire user object
                        localStorage.setItem('user_id', userId); // Store only the user _id

                        history.push("/");
                        // Hide the login modal or screen
                        hide(false);

                        // Optionally, scroll to the top
                        window.scroll({ top: 0, behavior: 'smooth' });
                       
                    })
                    .catch((e) => {
                        console.log("Error during user creation:", e);
                    });

            })
            .catch((error) => {
                // Handle Errors here
                console.error("Google login error:", error.message);
            });
    }

    return (
        <div className="container" style={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="sub-pop">Get Started</p>

            <div className="google-btn" onClick={googleLogin}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" style={{ width: "35px", marginTop: "18px", height: "45px" }} src="https://img.icons8.com/?size=48&id=V5cGWnc9R4xj&format=png" alt="Google logo" />
                    <p className="btn-text text"><b>Sign in with Google</b></p>
                </div>
            </div>
        </div>
    );
}
