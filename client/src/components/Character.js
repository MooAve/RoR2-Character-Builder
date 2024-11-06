import { useState } from "react";
import CharacterSelect from "./CharacterSelect.js";
import Item from "./Item.js";

export default function Character() {

    const [curCharacter, setCharacter] = useState({
        name: "",
        stats: {
            level: 0,
            armor: 0,
            damage: 0,
            damage_per_level: 0,
            health_per_level: 0,
            health_regen: 0,
            max_health: 0,
            regen_per_level: 0,
            speed: 0
      }
    });

    // Set the character's current level and update level-dependent stats
    function setLevel(level) {

        let new_char = Object.create(curCharacter);

        new_char.stats.level = level;
        
        setCharacter(new_char);
    }

    // Retrieve character from database
    async function getCharacter(character) {
    
        const response = await fetch (`http://localhost:5000/characters/${character}`);
        if (response.status === 200) {
            console.log(`Successfully got response!`);
        } else {
            console.log(response.status);
        }
        
        return response.json()
    }
  
    // Call "getCharacter" and set state's current character and stats
    async function pickCharacter(character) {
        
        if (character === "") {
            alert("Please choose a valid character!");
            return;
        }

        const response = await getCharacter(character);
    
        setCharacter(response);
    }

    var item;

    if (curCharacter.name === "") {
      item = <></>;
    } else {
      item = < Item curCharacter={curCharacter} />;
    }

    return (
        <div>
            <h3>Choose a Character:</h3>

            < CharacterSelect setCharacter = {pickCharacter} />

            <h4> Set Level: </h4>

            <input id="level_input" onBlur={e => setLevel(e.target.value)}></input>

            <>{item}</>
        </ div>
    )
}