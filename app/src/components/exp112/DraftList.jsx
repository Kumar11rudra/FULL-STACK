import DraftItem from "./DraftItem";

const DraftList = ({
  drafts,
  setDrafts,
  setEditingDraft,
}) => {

  return (

    <div className="draft-list">

      <h2>Saved Drafts</h2>

      {

        drafts.length === 0

          ? <p>No Drafts Available.</p>

          : drafts.map((draft) => (

            <DraftItem

              key={draft.id}

              draft={draft}

              drafts={drafts}

              setDrafts={setDrafts}

              setEditingDraft={setEditingDraft}

            />

          ))

      }

    </div>

  );

};

export default DraftList;
