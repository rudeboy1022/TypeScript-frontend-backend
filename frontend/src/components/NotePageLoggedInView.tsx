import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { AddEditNoteDialog } from '../components/AddEditNoteDialog';
import { Note } from '../components/Note';
import { Note as NoteModel } from '../models/note';
import * as NoteApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";

export const NotePageLoggedInView = () => { 

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [noteLoading, setNoteLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  
    const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(()=>{
        async function loadNotes() {
          try {
            setShowNotesLoadingError(false);
            setNoteLoading(true);
            const notes = await NoteApi.fetchNotes();
            setNotes(notes);
          } catch (error) {
            console.error(error);
            setShowNotesLoadingError(true);
            
          }finally{
            setNoteLoading(false);
          }
        }
        loadNotes();
      },[]);
    
      async function deleteNote(note: NoteModel) {
        try {
          await NoteApi.deleteNote(note._id);
          setNotes(notes.filter(existingNote => existingNote._id !== note._id));
          
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    
      const noteGrid = 
      <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit}/>
          </Col>      
        ))}
      </Row>


    return(
        <>
            <Button onClick={()=> setShowAddNoteDialog(true)} className={`mb-4, ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}>
                <FaPlus />
                Add ner note
            </Button>
            {noteLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>something go wrong. Please reflesh page</p>}
            {!noteLoading && !showNotesLoadingError &&
            <>
                {notes.length > 0 ? noteGrid : <p>You dont have note yet</p>}
            </>
            }
            {
            showAddNoteDialog && 
            <AddEditNoteDialog
                onDismiss={()=> setShowAddNoteDialog(false)} 
                onNoteSaved={(newNote)=>{
                setNotes([...notes, newNote]);
                setShowAddNoteDialog(false);
                }}
            />
            }
            {
            noteToEdit && 
            <AddEditNoteDialog
                noteToEdit={noteToEdit}
                onDismiss={() => setNoteToEdit(null)}
                onNoteSaved={(updatedNote)=>{
                setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                setNoteToEdit(null);
                }}
            />
            }
        </>
    )
 }