# Factions Discord Bot

## Setup
1. Push this repository to GitHub.
2. Go to Settings → Secrets → Actions → New repository secret.
   - Name: `DISCORD_TOKEN`
   - Value: your bot token
3. GitHub Actions will automatically run the bot 24/7 using pm2.
4. Invite the bot to your server with `applications.commands` and `bot` scopes.
5. The bot auto-registers slash commands on startup.
6. New members joining with faction roles automatically add +5 legions to their faction.
