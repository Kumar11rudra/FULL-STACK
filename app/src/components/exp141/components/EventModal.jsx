import { useState } from "react";

function EventModal({ defaultDate, onSave, onClose }) {

  const [title, setTitle] = useState("");

  const [date, setDate] = useState(defaultDate || "");

  const [color, setColor] = useState("#2563eb");

  const submitHandler = (e) => {

    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter event title.");
      return;
    }

    onSave({
      title,
      start: date,
      color
    });

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Create Schedule</h2>

        <form onSubmit={submitHandler}>

          <label>Post Title</label>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Schedule Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Event Color</label>

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <div className="modal-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              Save
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EventModal;
