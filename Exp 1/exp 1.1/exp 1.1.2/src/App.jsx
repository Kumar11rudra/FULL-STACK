import "./App.css";

import { useEffect, useState } from "react";

import DraftEditor from "./components/DraftEditor";
import DraftList from "./components/DraftList";

import { getDrafts } from "./utils/localStorage";

function App() {

  const [drafts, setDrafts] = useState([]);

  const [editingDraft, setEditingDraft] = useState(null);

  useEffect(() => {

    setDrafts(getDrafts());

  }, []);

  return (

    <div className="app">

      <header className="header">

        <h1>Draft Management System</h1>

        <p>

          Experiment 1.1.2

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
