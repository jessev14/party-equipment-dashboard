import { moduleName } from "./party-equipment-dashboard.js";


export class PartyEquipmentDashBoard extends Application {

    static get defaultOptions() {
        const options = super.defaultOptions;

        return mergeObject(options, {
            title: "Party Equipment Dashboard",
            width: 330,
            height: 500,
            resizable: true
        });
    }

    get template() {
        return `modules/${moduleName}/templates/party-equipment-dashboard.hbs`;
    }
    
    getData() {
        const data = {};
        data.partyMembers = [];

        const partyMembers = game.actors.filter(a => a.hasPlayerOwner);
        for (const partyMember of partyMembers) {
            const partyMemberData = {};

            partyMemberData.id = partyMember.id;
            partyMemberData.name = partyMember.name;
            partyMemberData.items = [];
            const armor = partyMember.items.filter(i => i.type === "equipment" && !["trinket", "clothing"].includes(i.data.data.armor.type));
            partyMemberData.items.push(...armor);
            const weapons = partyMember.items.filter(i => i.type === "weapon");
            partyMemberData.items.push(...weapons);

            if (game.settings.get(moduleName, "filterEquipped")) partyMemberData.items = partyMemberData.items.filter(i => i.data.data.equipped);

            data.partyMembers.push(partyMemberData);
        }

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Respond to input changes
        html.find(`input`).change(async ev => {
            const $input = $(ev.currentTarget);
            const value = $input.val();

            const actorID = $input.data("actorId");
            const actor = game.actors.get(actorID);
            const itemID = $input.data("itemId");
            const item = actor.items.get(itemID);

            if (item.type === "weapon") {
                const currentDamage = item.data.data.damage.parts;
                currentDamage[0][0] = value;
                await item.update({
                    "data.damage.parts": currentDamage
                });

                ui.notifications.info(`${item.name} damage formula updated: ${value}`);
            } else {
                await item.update({
                    "data.armor.value": parseInt(value)
                });

                ui.notifications.info(`${item.name} AC updated: ${value}`);
            }
        });
    }
}
