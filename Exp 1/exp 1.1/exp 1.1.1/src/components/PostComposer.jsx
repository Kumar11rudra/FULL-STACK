import { useState } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import MediaUploader from "./MediaUploader";
import platforms from "../data/platforms";

const PostComposer = () => {

  const [post, setPost] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [media, setMedia] = useState(null);

  const handlePlatformChange = (platform) => {

    if (selectedPlatforms.includes(platform)) {

      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );

    } else {

      setSelectedPlatforms([...selectedPlatforms, platform]);

    }

  };

  const getErrors = () => {

    const errors = [];

    selectedPlatforms.forEach((platform) => {

      if (post.length > platforms[platform].limit) {

        errors.push(
          `${platform}: Character limit is ${platforms[platform].limit}`
        );

      }

    });

    return errors;

  };

  const errors = getErrors();

  return (

    <div className="composer">

      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        handlePlatformChange={handlePlatformChange}
      />

      <textarea

        placeholder="Write your post here..."

        value={post}

        onChange={(e) => setPost(e.target.value)}

      />

      <CharacterCounter

        text={post}

        selectedPlatforms={selectedPlatforms}

      />

      <MediaUploader

        media={media}

        setMedia={setMedia}

      />

      {errors.length > 0 ? (

        <div className="error-box">

          {errors.map((error, index) => (

            <p key={index}>{error}</p>

          ))}

        </div>

      ) : (

        <div className="success-box">

          {selectedPlatforms.length > 0
            ? "Ready to Publish"
            : "Select at least one platform"}

        </div>

      )}

    </div>

  );

};

export default PostComposer;
