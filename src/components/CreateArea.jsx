import  {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [noteCreated, setNoteCreated] = useState({
    title: "",
    content: ""
  });

  async function onSubmitForm(e){
    if (noteCreated.title !== "" && noteCreated.content !== "") {

      e.preventDefault();
      props.onAdd(noteCreated);
      setNoteCreated({
        title: "",
        content: ""
      })
  
      const response = await fetch("api", {
        method: "POST",
        body: JSON.stringify(noteCreated),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await response.json();
  
      if(!response.ok) {
        setError(json.error);
      }
      if(response.ok){
        setError(null);
        console.log("new note added", json);
      }
    }
  }

  function handleChange(event){
    const {name, value} = event.target;

    setNoteCreated(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function expand(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form
        className="create-note"
        onSubmit={onSubmitForm}>
        {isExpanded && <input
          onChange={handleChange}
          name="title"
          value={noteCreated.title}
          placeholder="Title"/>}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          value={noteCreated.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1} />
        <Zoom in={isExpanded}>
          <Fab type="submit"><AddIcon/></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;