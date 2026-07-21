import { useState, useEffect } from "react";
import {
  saveDraft,
  updateDraftStorage
} from "../utils/localStorage";

const DraftEditor = ({
  drafts,
  setDrafts,
  editingDraft,
  setEditingDraft,
}) => {

  const [text, setText] = useState("");

  useEffect(() => {

    if (editingDraft) {

      setText(editingDraft.text);

    }

  }, [editingDraft]);

  const handleSubmit = () => {

    if (text.trim() === "") {

      alert("Please enter draft.");

      return;

    }

    if (editingDraft) {

      const updatedDraft = {

        ...editingDraft,

        text

      };

      const updatedDrafts = drafts.map((draft) =>
        draft.id === editingDraft.id ? updatedDraft : draft
      );

      setDrafts(updatedDrafts);

      updateDraftStorage(updatedDrafts);

      setEditingDraft(null);

    } else {

      const newDraft = {

        id: Date.now(),

        text

      };

      const updatedDrafts = [...drafts, newDraft];

      setDrafts(updatedDrafts);

      saveDraft(updatedDrafts);

    }

    setText("");

  };

  return (

    <div className="editor">

      <textarea

        placeholder="Write your draft..."

        value={text}

        onChange={(e) => setText(e.target.value)}

      />

      <button onClick={handleSubmit}>

        {editingDraft ? "Update Draft" : "Save Draft"}

      </button>

    </div>

  );

};

export default DraftEditor;
