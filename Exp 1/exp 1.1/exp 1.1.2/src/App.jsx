import "./App.css";

import DraftEditor from "./components/DraftEditor";
import DraftList from "./components/DraftList";

import { useState } from "react";

function App() {

  const [drafts, setDrafts] = useState([]);

  const [editingDraft, setEditingDraft] = useState(null);

  return (

    <div className="app">

      <header className="header">

        <h1>Draft Management System</h1>

        <p>
          Experiment 1.1.2 - Save, Edit & Manage Drafts
        </p>

      </header>

      <DraftEditor

        drafts={drafts}
        setDrafts={setDrafts}

        editingDraft={editingDraft}
        setEditingDraft={setEditingDraft}

      />

      <DraftList

        drafts={drafts}
        setDrafts={setDrafts}

        setEditingDraft={setEditingDraft}

      />

    </div>

  );

}

export default App;
