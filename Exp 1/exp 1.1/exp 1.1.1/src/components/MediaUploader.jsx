const MediaUploader = ({ media, setMedia }) => {

  const handleFile = (event) => {

    const file = event.target.files[0];

    if (file) {

      setMedia(file);

    }

  };

  return (

    <div className="media-uploader">

      <h3>Attach Media</h3>

      <input

        type="file"

        accept="image/*,video/*"

        onChange={handleFile}

      />

      {

        media && (

          <p>

            Selected File : {media.name}

          </p>

        )

      }

    </div>

  );

};

export default MediaUploader;
