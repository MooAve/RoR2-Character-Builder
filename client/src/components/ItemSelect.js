import { useState, useEffect } from "react";

export default function ItemSelect() {

    const[options, setOptions] = useState([]);

    
    useEffect(() => {
        // Populate item select with items in database
        async function populateItemSelect() {
            let res = await getItemOptions()

            var new_options = [];

            for (let i = 0; i < res.length; i++) {
                
                if (res[i].name === "") {
                    continue;
                }

                new_options.push(<option key = {res[i].name} value = {res[i].name}>{res[i].name}</option>);
            }

            setOptions(new_options);
        }

        if (options.length === 0) {
            populateItemSelect();
        }
    }, []);

    // Fetch list of available item names
    async function getItemOptions() {
        const response = await fetch (`http://localhost:5000/items/`);
        if (response.status === 200) {
        console.log(`Successfully got response!`);
        } else {
        console.log(response.status);
        }
        return response.json();
    } 
    
    // Fetch a list of item names matching the provided filter
    async function getFilteredItems(type, val) {

        // Return all items if a filter is empty
        if (type === "" || val === "") {
            return getItemOptions();
        }

        const response = await fetch(`http://localhost:5000/items/filter/${type}/${val}`);
        if (response.status === 200) {
            console.log(`Successfully got response!`);
            } else {
            console.log(response.status);
            }
            return response.json();
    }

    // Filters the items list using the provided filter
    async function filterItems(type, val) {

        const res = await getFilteredItems(type, val);

        var new_options = [];

        for (let i = 0; i < res.length; i++) {
            
            if (res[i].name === "") {
                continue;
            }

            new_options.push(<option key = {res[i].name} value = {res[i].name}>{res[i].name}</option>);
        }

        setOptions(new_options);
    }

    return(
        <div>
            <select id="item_select">
                <option value = "">Please choose an item</option>
                {options}
            </select>
            <h5>
                Filters:
            </h5>
            <label for="rarity">Rarity:</label>
            <select id="rarity" onChange = {e => filterItems("rarity", e.target.value)}>
                <option value = "">Any</option>
                <option value = "common">Common</option>
                <option value = "uncommon" style = {{backgroundColor: "#33ff57"}}>Uncommon</option>
                <option value = "legendary" style = {{backgroundColor: "#ff380d"}}>Legendary</option>
                <option value = "boss" style = {{backgroundColor: "#fff700"}}>Boss</option>
                <option value = "lunar" style = {{backgroundColor: "#1ebfff"}}>Lunar</option>
                <option value = "void" style = {{backgroundColor: "#ec1bff"}}>Void</option>
            </select>
            <label for="type">Category:</label>
            <select id="type">
                <option value = "">Any</option>
                <option value = "damage" style = {{backgroundColor: "#ff5733"}}>Damage</option>
                <option value = "healing" style = {{backgroundColor: "#8cff55"}}>Healing</option>
                <option value = "utility" style = {{backgroundColor: "#ad64ff"}}>Utility</option>
            </select>
        </div>
    );
}