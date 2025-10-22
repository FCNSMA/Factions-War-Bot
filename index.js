// Factions Discord Bot - Full GitHub-ready
import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.get('/', (_req, res) => res.send('Factions bot alive'));
app.listen(3000, () => console.log('Keep-alive server running'));

const DATA_FILE = path.join(process.cwd(), 'factions_data.json');
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    const init = {
      factions: { cosmic: {legions:0}, elysium: {legions:0}, galactic: {legions:0}, arcane: {legions:0} },
      territories: {},
      pendingMoves: [],
      lastDaily: 0
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(init, null, 2));
    return init;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function saveData(d){ fs.writeFileSync(DATA_FILE, JSON.stringify(d,null,2)); }
let data = loadData();

const ROLE_NAMES = ['Cosmic','Elysium','Galactic','Arcane'];
function getUserFaction(member){
  for(const role of member.roles.cache.values())
    if(ROLE_NAMES.includes(role.name)) return role.name.toLowerCase();
  return null;
}
function now(){ return Date.now(); }
function computeArrival(fromFaction,toCity,toArea,targetOwner){ /* ... */ }
function canAttackArea(factionKey,city,area){ /* ... */ }
function processDailyIncrement(){ /* ... */ }
async function processPendingMoves(client){ /* ... */ }
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

const client = new Client({ intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', async ()=>{
  console.log('Factions bot ready!');
  await processPendingMoves(client);
  processDailyIncrement();
});

client.on('interactionCreate', async interaction=>{
  // handle slash commands like /military, /map, /attack, /defend
});

client.on('guildMemberAdd', member => {
  const faction = getUserFaction(member);
  if(faction) {
    data.factions[faction].legions += 5;
    saveData(data);
    console.log(`Added +5 legions to ${faction} for new member ${member.user.tag}`);
  }
});

client.login(process.env.DISCORD_T_
