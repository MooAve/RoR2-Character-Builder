import { useState } from "react";
import ItemSelect from "./ItemSelect.js";
import ItemEffects from "./ItemEffects.js";
import StatsTable from "./StatsTable.js";

export default function Item({curCharacter}) {

    const [items, setItems] = useState([]);
    const [ItemEls, setItemEls] = useState([]);
    const [bonusStats, setBonusStats] = useState({
        armor: 0,
        damage: 0,
        health_regen: 0,
        max_health: 0,
        speed: 0
    });

    // Update the character's stats with the given item's bonuses
    function updateStats(item, old_quantity) {
        let new_stats = bonusStats;

        for (const [key, val] of Object.entries(item.stats)) {
            new_stats[key] = new_stats[key] + (val * (item.quantity - old_quantity));
        }

        setBonusStats(new_stats);
    }

    // Get a specific item from the database
    async function getItem(item) {
        const response = await fetch (`http://localhost:5000/items/${item}`);
        if (response.status === 200) {
            console.log(`Successfully got response!`);
        } else {
            console.log(response.status);
        }

        return response.json()
    }

    // Call "getItem" and add the item to the list
    async function pickItem(item) {

        if (item === "") {
            alert("Please choose a valid item option!");
            return;
        }

        for(let i = 0; i < items.length; i++) {
            if (items[i].name === item) {
                setQuantity(items[i].name, items[i].quantity + 1);

                return;
            }
        }

        const response = await getItem(item);

        let new_items = items;
        new_items.push(response);

        updateItemElements();

        updateStats(response, 0);

        setItems(new_items);

        addEffect(response);
    }

    // Add new item elements for each item in "items"
    function updateItemElements() {
        var item_els = [];

        for(let i = 0; i < items.length; i++) {
            item_els.push(ItemElement(items[i].name));
        }

        setItemEls(item_els);
    }

    // Delete an item from the "items" list and reload the item elements list
    function RemoveItem(item_name) {
        let new_items = items;

        const item_index = new_items.findIndex((cur_item) => cur_item.name === item_name);

        const item = new_items[item_index];

        updateStats(item, item.quantity * 2);

        new_items.splice(item_index, 1);

        setItems(new_items);

        updateItemElements();

        removeEffect(item);
    }

    // Set how many of a given item are owned
    function setQuantity(item_name, quantity) {
        let new_items = items;

        const item_index = new_items.findIndex((cur_item) => cur_item.name === item_name);

        let item = new_items[item_index];

        let old_quantity = item.quantity;

        item.quantity = quantity;

        new_items[item_index] = item;

        updateStats(item, old_quantity);
        setItems(new_items);
        updateItemElements();

        removeEffect(item);
        addEffect(item)
    }

    function ItemElement(value) {
        return(
          <tr value = {value} key = {value}>
            <td>
              { value }
            </td>
            <td>
              <input id = {value} onBlur = {e => setQuantity(e.target.id, e.target.value)}>
              </input>
            </td>
            <td>
              <button onClick = {() => RemoveItem(value)}>X</button>
            </td>
          </tr>
        );
    }

    // Create an effect description with the given effect
    function generateEffectDescription(effect, quantity) {

        var effect_desc = effect.description;
        var effect_stats = effect.stats;

            // Iterate through each stat that the effect alters
            for (const[key, val] of Object.entries(effect_stats)) {

                // Calculate the base 
                let effect_stacks = val[0] + (val[1] * (quantity - 1));

                effect_desc = effect_desc.replace(`{${key}}`, effect_stacks.toString());
            }

        return effect_desc;
    }

    // Adds an element to the effect table
    function addEffectElement(effect, type) {
        let new_effect = document.createElement("td");
        let effect_text = document.createTextNode(effect.description);

        new_effect.setAttribute("id", effect.name + type);
        new_effect.appendChild(effect_text);

        document.getElementById(type).appendChild(new_effect);
    }

    // Adds the effects associated with the given item
    function addEffect(item) {
        
        if (item.effects.length > 0) {

            for (let i = 0; i < item.effects.length; i++) {
                addEffectElement({
                    "name" : item.name,
                    "description" : generateEffectDescription(item.effects[i], item.quantity)
                }, item.effects[i].type);
            }
        }
    }

    function removeEffect(item) {

        if (item.effects.length > 0) {
            for (let i = 0; i < item.effects.length; i++) {
                document.getElementById(item.name + item.effects[i].type).remove();
            }
        }
    }

    // Calculate the character's current stats based on level and held items
    function calculateCurrentStats() {
        
        let new_stats = Object.create(curCharacter.stats);

        new_stats.max_health += new_stats.health_per_level * (curCharacter.level - 1);
        new_stats.health_regen += new_stats.regen_per_level * (curCharacter.level - 1);
        new_stats.damage += new_stats.damage_per_level * (curCharacter.level - 1);

        for (const [key, val] of Object.entries(bonusStats)) {
            new_stats[key] += val;
        }

        return new_stats;
    }

    var stats;

    if (curCharacter.name === "") {
        stats = <></>
    } else {
        stats = < StatsTable stats = {calculateCurrentStats()} />
    }

    return (
        <div>
            <h4>Choose an Item:</h4>

            < ItemSelect />
            <button onClick = {() => pickItem(document.getElementById("item_select").value)}> Add </button>

            <>{stats}</>

            <table id = "cur_items">
                <thead>
                    Current Items: 
                </thead>
                <tbody>{ItemEls}</tbody>
            </table>
            < ItemEffects curItems = {items} />
        </div>
    )
}