const STORAGE_KEY = "drafts";

export const getDrafts = () => {

  const drafts = localStorage.getItem(STORAGE_KEY);

  return drafts ? JSON.parse(drafts) : [];

};

export const saveDraft = (drafts) => {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(drafts)

  );

};

export const updateDraftStorage = (drafts) => {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(drafts)

  );

};

export const deleteDraftStorage = (drafts) => {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(drafts)

  );

};
