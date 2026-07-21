import {
  deleteDraftStorage
} from "../utils/localStorage";

const DraftItem = ({
  draft,
  drafts,
  setDrafts,
  setEditingDraft,
}) => {

  const handleDelete = () => {

    const updatedDrafts = drafts.filter(

      (item) => item.id !== draft.id

    );

    setDrafts(updatedDrafts);

    deleteDraftStorage(updatedDrafts);

  };

  return (

    <div className="draft-card">

      <p>{draft.text}</p>

      <div className="actions">

        <button

          onClick={() => setEditingDraft(draft)}

        >

          Edit

        </button>

        <button

          className="delete"

          onClick={handleDelete}

        >

          Delete

        </button>

      </div>

    </div>

  );

};

export default DraftItem;
