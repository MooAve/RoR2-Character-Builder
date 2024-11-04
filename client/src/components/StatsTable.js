
export default function StatsTable({stats}) {

    return (
        <table id = "char_stats">
            <thead align = "left">
                Base Stats
            </thead>
            <tbody>
                <tr><td>
                Max Health: {stats.max_health} (+{stats.health_per_level} per Level)
                </td></tr>
                <tr><td>
                Damage: {stats.damage} (+{stats.damage_per_level} per Level)
                </td></tr>
                <tr><td>
                Health Regen: {stats.health_regen} (+{stats.regen_per_level} per Level)
                </td></tr>
                <tr><td>
                Speed: {stats.speed}
                </td></tr>
                <tr><td>
                Armor: {stats.armor}
                </td></tr>
            </tbody>
        </table>
    );
}