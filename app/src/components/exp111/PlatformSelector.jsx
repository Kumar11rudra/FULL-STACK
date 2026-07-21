import platforms from "../../data/platforms";

export default function PlatformSelector({
    selectedPlatforms,
    handlePlatformChange,
}) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Select Platforms</h3>

            {Object.keys(platforms).map((platform) => (
                <label
                    key={platform}
                    style={{ display: "block", marginBottom: "8px" }}
                >
                    <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                    />
                    {" "}
                    {platform}
                </label>
            ))}
        </div>
    );
}