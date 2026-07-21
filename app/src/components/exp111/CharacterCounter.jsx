import platforms from "../../data/platforms";

const CharacterCounter = ({ text, selectedPlatforms }) => {

    return (

        <div className="character-counter">

            <h3>Character Counter</h3>

            <p>
                Total Characters : <strong>{text.length}</strong>
            </p>

            {

                selectedPlatforms.map((platform) => (

                    <p key={platform}>

                        {platform} : {text.length}/{platforms[platform].limit}

                    </p>

                ))

            }

        </div>

    );

};

export default CharacterCounter;
