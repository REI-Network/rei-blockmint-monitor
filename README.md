# rei-blockMint-monitor
## Description: A simple block miner for the Rei blockchain

## Installation
```bash
npm install
```

## Check the .env file
You need to `cp .env.example .env` and fill your own config including the `database_connection` and `alarm_bot_url`.
If you don't want to use the alarm bot, you can delete it and also you can change alarm logic in `src/tasks/minerMonitor.ts`.
## Usage
```bash
npm run start
```
## API
### Structure
#### Block
```json
  {
    blockNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    hash: {
      type: DataTypes.STRING,
    },
    miner: {
      type: DataTypes.STRING,
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
  }
```
#### Miner
```json
Miner.init(
  {
    miner: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    minedNumber: {
      type: DataTypes.INTEGER,
    },
    lastBlock: {
      type: DataTypes.INTEGER,
    },
    lastTimeStamp: {
      type: DataTypes.INTEGER,
    },
    reward: {
      type: DataTypes.DECIMAL(65, 0),
    },
  }
```

#### MissRecord
```json
MissRecord.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    blockNumber: {
      type: DataTypes.INTEGER,
    },
    missMiner: {
      type: DataTypes.STRING,
    },
    round: {
      type: DataTypes.INTEGER,
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
  }
```

#### SlashRecord

```json
SlashRecord.init(
  {
    slashBlockHeight: {
      type: DataTypes.INTEGER,
    },
    duplicateVoteHeight: {
      type: DataTypes.INTEGER,
    },
    reason: {
      type: DataTypes.STRING,
    },
    validator: {
      type: DataTypes.STRING,
    },
    slashBlockTimestamp: {
      type: DataTypes.INTEGER,
    },
    slashAmount: {
      type: DataTypes.DECIMAL(65, 0),
    },
    voteAJson: {
      type: DataTypes.JSONB,
    },
    voteBJson: {
      type: DataTypes.JSONB,
    },
  }
```

### example

#### get miner message
```bash
curl 'http://127.0.0.1:3000/api/miner?miner=0x4e02f5dd4b2cd055b31cb2a62f19b1c57a9c992c'
```

```json
{
   "minerMessage" : {
      "createdAt" : "2022-09-14T03:22:35.309Z",
      "lastBlock" : 7306487,
      "lastTimeStamp" : 1663095061,
      "minedNumber" : 35784,
      "miner" : "0x4e02f5dd4b2cd055b31cb2a62f19b1c57a9c992c",
      "reward" : "34041095890403487383552",
      "updatedAt" : "2022-09-14T05:24:45.124Z"
   },
   "minerMissRecordNumber" : 1399
}
```

#### get mined block message
```bash
 curl'http://127.0.0.1:3000/api/minedblocks?miner=0x7b7bb7c41d3cc9bb967e4fc1a240292a228b4968&offset=10&limit=1' 
 ```

```json
[
   {
      "blockNumber" : 7011552,
      "createdAt" : "2022-09-14T03:22:38.621Z",
      "hash" : "0xcee6836cd2db7fab349dda87fb02b446701a1821343f274387e6fdff8d964ec8",
      "miner" : "0x7b7bb7c41d3cc9bb967e4fc1a240292a228b4968",
      "timestamp" : 1661945917,
      "updatedAt" : "2022-09-14T03:22:38.621Z"
   }
]
```

#### get miss record
```bash
curl 'http://127.0.0.1:3000/api/missrecords?miner=0x39fefe8d70d21e8946dedcd30f4ce874f0aabe1a&offset=1&limit=1'
```

```json
{
   "missRecords" : [
      {
         "blockNumber" : 7014348,
         "createdAt" : "2022-09-14T03:24:22.414Z",
         "id" : "7014348-0x39fefe8d70d21e8946dedcd30f4ce874f0aabe1a-0",
         "missMiner" : "0x39fefe8d70d21e8946dedcd30f4ce874f0aabe1a",
         "round" : 0,
         "updatedAt" : "2022-09-14T03:24:22.414Z"
      }
   ]
}
```
