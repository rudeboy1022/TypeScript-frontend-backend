import { useEffect, useState } from "react";
import { LoginModal } from "./components/LoginModal";
import { NavBar } from "./components/NavBar";
import { SignUpModal } from "./components/SignUpModal";
import { User } from "./models/user";
import * as NoteApi from "./network/notes_api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NotePage } from "./Pages/NotePage";
import { PrivacyPage } from "./Pages/PrivacyPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import styles from "./styles/App.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <>
        <NavBar
          loggedInUser={loggedInUser}
          onLogInClicked={() => {
            setShowLoginModal(true);
          }}
          onSignUpClicked={() => {
            setShowSignUpModal(true);
          }}
          onLogOutSuccessful={() => {
            setLoggedInUser(null);
          }}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotePage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => {
              setShowSignUpModal(false);
            }}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
            }}
          />
        )}

        {showLoginModal && (
          <LoginModal
            onDismiss={() => {
              setShowLoginModal(false);
            }}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
