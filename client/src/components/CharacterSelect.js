import {useState, useEffect} from "react";

export default function CharacterSelect({setCharacter}) {

    const[options, setOptions] = useState([])

    useEffect(() => {

        // Fetch list of available character names
        async function getCharacterOptions() {
        const response = await fetch (`http://localhost:5000/characters/`);
        if (response.status === 200) {
            console.log(`Successfully got response!`);
        } else {
            console.log(response.status);
        }
            return response.json();
        }

        // Populate select element with loaded options
        async function populateCharacterSelect() {

            let res = await getCharacterOptions();

            var new_options = [];

            for (let i = 0; i < res.length; i++) {

                new_options.push(<option key = {res[i].name} value = {res[i].name}>{res[i].name}</option>);
            }

            setOptions(new_options);
        }
    
        if (options.length === 0) {
            populateCharacterSelect();
        }
        
    }, []);
    

    return (
        <select id="character_select" onChange = {e => setCharacter(e.target.value)}>
            <option value = "">Please select a character</option>
            {options}
        </select>
    );
}