import CreateArea from "./CreateArea";
import notesArray from "../notes"
import Note from "./Note";
import NotePermanent from "./NotePermanent";
import { Fragment, useState, useEffect } from "react";

function Home() {
    const [notesPermanent, setNotesPermanent] = useState(notesArray);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async() => {
            const response = await fetch("api");
            const json = await response.json();
            
            if(response.ok) {
                setNotes(json);
            }
        }
            
        fetchNotes();
    }, [])

    function addNote(){
        const fetchNotes = async() => {
            const response = await fetch("api");
            const json = await response.json();
            
            if(response.ok) {
                setNotes(json);
            }
        }
            
        fetchNotes();
    }

    async function deleteNote(id){
        const response = await fetch("/api/" + id, {
            method: "DELETE",
            body: JSON.stringify({id})
          })

        setNotes(prevNotes => {
            return prevNotes.filter((note) => {
                console.log(note._id);
                console.log(id);
                return note._id !== id;
            });
        })
        return;
    }

    return (
        <Fragment>
            <CreateArea
                onAdd={addNote}
            />
            {/* <Note key={1} title="Note title" content="Note content" /> */}
            {notesPermanent.map((note, index) => {
                    return <NotePermanent
                        key={index}
                        id={index}
                        title={note.title}
                        content={note.content}
                    />
            })}
            {notes.map((note, index) => {
                    return <Note
                        key={index}
                        id={note._id}
                        title={note.title}
                        content={note.content}
                        onClicked={deleteNote}
                    />
            })}
        </Fragment>  
    )
}

export default Home;