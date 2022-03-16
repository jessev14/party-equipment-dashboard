import { PartyEquipmentDashBoard } from "./PartyEquipmentDashBoard.js"

export const moduleName = "party-equipment-dashboard";


Hooks.once("init", () => {
    game.modules.get(moduleName).api = {PartyEquipmentDashBoard: new PartyEquipmentDashBoard};

    game.settings.register(moduleName, "filterEquipped", {
        name: "Include Equipped Items Only",
        hint: "",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
});


Hooks.on("getSceneControlButtons", controls => {
    if (!game.user.isGM) return;

    const bar = controls.find(c => c.name === "token");
    bar.tools.push({
        name: "Party Equipment Dashboard",
        title: "Party Equipment Dashboard",
        icon: "fas fa-briefcase",
        onClick: () => game.modules.get(moduleName).api.PartyEquipmentDashBoard.render(true),
        button: true
    });
});

Hooks.on("updateItem", (item, diff, options, userID) => {
    game.modules.get(moduleName).api.PartyEquipmentDashBoard.render();
});
