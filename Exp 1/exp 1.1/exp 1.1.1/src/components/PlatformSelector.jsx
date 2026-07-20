import platforms from "../data/platforms";

const PlatformSelector = ({
  selectedPlatforms,
  handlePlatformChange,
}) => {

  return (

    <div className="platform-selector">

      <h3>Select Platforms</h3>

      {Object.keys(platforms).map((platform) => (

        <label key={platform}>

          <input

            type="checkbox"

            checked={selectedPlatforms.includes(platform)}

            onChange={() => handlePlatformChange(platform)}

          />

          {platform}

        </label>

      ))}

    </div>

  );

};

export default PlatformSelector;
