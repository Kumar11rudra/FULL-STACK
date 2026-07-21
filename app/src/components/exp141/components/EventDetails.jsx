function EventDetails({ event, onClose }) {

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Scheduled Post</h2>

        <p>

          <strong>Title :</strong>

          {event.title}

        </p>

        <p>

          <strong>Date :</strong>

          {event.startStr || event.start?.toLocaleDateString()}

        </p>

        {

          event.end && (

            <p>

              <strong>End :</strong>

              {event.endStr || event.end?.toLocaleDateString()}

            </p>

          )

        }

        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>

  );

}

export default EventDetails;
