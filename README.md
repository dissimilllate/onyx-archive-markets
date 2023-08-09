# Onyx archive markets data service

Archives market's data, checks if values change over limit and sends notifications to discord.

## Installation and usage

### Requirements

* Node.js v16+
* MongoDB v4+
 
### Setup

```bash
npm install
```

### Pre-launch tuning

Before running, copy `.env.example` file as `.env` and set it up.

```bash
cp .env.example .env
```

Set up config at `check.constants.js`. 
Each field corresponds to value that will be checked. Each field value is limit in percents to trigger checker service exception.  

### Running

```bash
npm run start
```
