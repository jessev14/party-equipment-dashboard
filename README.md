![All Downloads](https://img.shields.io/github/downloads/jessev14/party-equipment-dashboard/total?style=for-the-badge)

![Latest Release Download Count](https://img.shields.io/github/downloads/jessev14/party-equipment-dashboard/latest/PED.zip)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fparty-equipment-dashboard&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=party-equipment-dashboard)

This module was funded by a commission. Donations help fund updates and new modules!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jessev14)

# Party Equipment Dashboard

Party Equipment Dashboard implements a dashboard for GM users to easily and quickly change armor AC and weapon damage formulas of party members.

<img src="/img/party-equipment-dashboard.png" />

## Technical Notes
`PartyEquipmentDashboard` is a new `Application` sublcass.

The application filters "party members" from the game's actors using the `#hasPlayerOwner` actor method.

Each party member's items are then filtered for armor and weapons. This data is used to render the application's template.

Each AC and damage formula are placed in a text input element. `change` listeners are registered to each of these inputs to update the corresponding item on the corresponding actor when the input value is changed.
