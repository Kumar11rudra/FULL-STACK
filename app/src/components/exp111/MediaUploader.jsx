export default function MediaUploader({ media, setMedia }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <label>
                <strong>Attach Media</strong>
            </label>

            <br />
            <br />

            <input
                type="file"
                onChange={(e) => setMedia(e.target.files[0])}
            />

            {media && (
                <p style={{ marginTop: "10px" }}>
                    Attached File: {media.name}
                </p>
            )}
        </div>
    );
}