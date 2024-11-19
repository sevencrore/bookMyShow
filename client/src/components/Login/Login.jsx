import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../../style/login.css';

export default function({ hide }) {
  useEffect(() => {
    // Optionally, add any setup or cleanup code here
  }, []);

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
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
          <p className="btn-text text"><b>Sign in with Google</b></p>
        </div>
      </div>
    </div>
  );
}
