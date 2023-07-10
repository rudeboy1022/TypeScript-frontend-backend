import { Container } from "react-bootstrap";
import { NotePageLoggedInView } from "../components/NotePageLoggedInView";
import { NotePageLoggedOutView } from "../components/NotePageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotePageProps {
  loggedInUser: User | null;
}

export const NotePage = ({ loggedInUser }: NotePageProps) => {
  return (
    <Container className={styles.notePage}>
      <>{loggedInUser ? <NotePageLoggedInView /> : <NotePageLoggedOutView />}</>
    </Container>
  );
};
