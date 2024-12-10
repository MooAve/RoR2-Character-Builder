export default function CreateItem() {
    
    function StatEl(name) {

        let elName = `${name}_name`;
        let elVal = `${name}_value`;
        let elStack = `${name}_stack`;
        let elScale = `${name}_scaling`

        return(
            <>
                <h3>{name}</h3>
                <label htmlFor={elName}>Name:</label>
                <input type="text" name={elName}></input>

                <label htmlFor={elVal}>Base Value:</label>
                <input type="text" name={elVal}></input>

                <label htmlFor={elStack}>Per-Stack Value</label>
                <input type="text" name={elStack}></input>

                <label htmlFor={elScale}>Scaling Type:</label>
                <select name={elScale}>
                    <option value="linear">Linear</option>
                    <option value="hyperbolic">Hyperbolic</option>
                    <option value="exp">Exponential</option>
                    <option value="log">Logarithmic</option>
                    <option value="other">Other</option>
                </select>
            </>
        );
    }
    
    return(
        <div>
            <h2>Item Creator</h2>
            <form action="http://localhost:5000/items" method="post">
                <label for="name">Name:</label>
                <input type="text" name="name"></input>

                <label htmlFor="rarity">Rarity:</label>
                <select name="rarity">
                    <option value = "common">Common</option>
                    <option value = "uncommon" style = {{backgroundColor: "#33ff57"}}>Uncommon</option>
                    <option value = "legendary" style = {{backgroundColor: "#ff380d"}}>Legendary</option>
                    <option value = "boss" style = {{backgroundColor: "#fff700"}}>Boss</option>
                    <option value = "lunar" style = {{backgroundColor: "#1ebfff"}}>Lunar</option>
                    <option value = "void" style = {{backgroundColor: "#ec1bff"}}>Void</option>
                </select>

                <label htmlFor="category">Category:</label>
                <select name="category">
                    <option value = "damage" style = {{backgroundColor: "#ff5733"}}>Damage</option>
                    <option value = "healing" style = {{backgroundColor: "#8cff55"}}>Healing</option>
                    <option value = "utility" style = {{backgroundColor: "#ad64ff"}}>Utility</option>
                </select>

                {StatEl("stat_1")}

                {StatEl("stat_2")}

                <h3>Effect 1</h3>
                <select name="effect_1_type">
                    <option value = "on_hit">On Hit</option>
                    <option value="on_kill">On Kill</option>
                    <option value="when_damaged">When Damaged</option>
                    <option value="misc">Misc.</option>
                </select>

                <label for="effect_1_description">Description:</label>
                <input type="text" name="effect_1_description"></input>

                {StatEl("effect_1_stat_1")}

                {StatEl("effect_1_stat_2")}

                
                <h3>Effect 2</h3>
                <select name="effect_2_type">
                    <option value = "on_hit">On Hit</option>
                    <option value="on_kill">On Kill</option>
                    <option value="when_damaged">When Damaged</option>
                    <option value="misc">Misc.</option>
                </select>

                <label for="effect_2_description">Description:</label>
                <input type="text" name="effect_2_description"></input>

                {StatEl("effect_2_stat_1")}

                {StatEl("effect_2_stat_2")}

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}