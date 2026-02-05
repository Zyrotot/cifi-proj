/*

PLAYER DATA CHANGE LOG

*/

const blankPlayer = {
  version: 15,
  activePortal: 'academyEffector',
  colorProfile: {
    academyProjects: ['#444444', '#CCCC44', '#44CC44', '#4444CC'],
  },
  level: 0, // Player level
  loopsFilled: 0,
  fleet: {
    zeus: {
      evo: 0,
      rank: { current: 0, progress: 0, goal: 1 },
      freePoints: 0,
      crew: 0,
      installs: [
        0, // Cells Gained *= (0.5 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // AP Gained *= (0.1 * [level] * [Zeus Crew] + 1)
        0, // Mission Materials *= (0.25 * [level] * [Zeus Crew] + 1)
        0, // [Cells Gained, Shards Gained] *= (0.005 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // [Cells Gained, RP Gained] *= (0.005 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // [MP Gained, Mission Materials] *= (0.1 * [level] * [Zeus Crew] + 1)
        0, // [All Gen Output, AP Gained] *= (0.01 * [level] * [Zeus Crew] + 1)
        0, // All Gen Output *= (0.01 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // Cells Gained *= (0.05 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // RP Gained *= (0.01 * [level] * [Missions Completed] * [Zeus Crew] + 1)
        0, // Shards Gained *= (0.01 * [level] * [Missions Completed] * [Zeus Crew] + 1)
      ],
    },
    ouro: {
      crew: 0,
      installs: [0, 0, 0, 0, 0, 0],
    },
  },
  loopMods: {
    zeusRankBenefits: 0, // Mission Materials *= pow(0.01 * [Zeus Rank Benefits] + 1, [Zeus Rank])
    materialHauling: 0, // Mission Materials *= pow(1.05, [Material Hauling])
    beyonders: 0, // [AP Gained, Mission Materials] *= pow(1.01, [Beyonders])
    swarm: 0, // Mission Materials *= pow(1.25, [Swarm]), Mission Time /= pow(1.03, [Swarm])
    expansion: 0, // Mission Materials *= pow(1.01, [Expansion])
    looping: 0, // Mission Materials *= pow(0.0002 * [Looping] + 1, [Loops Filled])
    productivity: 0, // Mission Speed *= pow(1.1, [Productivity]), Mission Materials *= pow(0.002 * [Productivity] + 1, [Player Level])
    sekhur5: 0, // Mission Materials *= 1.25
  },
  shardMilestones: [
    0, // (01) Alpha
    0, // (02) Aquarius
    0, // (03) Libra
    0, // (04) Modifying
    0, // (05) Flowering
    0, // (06) Connecting
    0, // (07) Duality
    0, // (08) Morphing
    0, // (09) Producing
    0, // (10) Expanding
    0, // (11) Triangular
    0, // (12) Extracting
    0, // (13) Seeding
    0, // (14) Pathing
    0, // (15) Ritualistic
    0, // (16) Modulistic
    0, // (17) Machining
    0, // (18) Studying
    0, // (19) Lucky
    0, // (20) Duplicating
    0, // (21) Targeting
    0, // (22) Quadratic
    0, // (23) Layering
    0, // (24) Torn
    0, // (25) Fabricating
    0, // (26) Wonderous
    0, // (27) Sharp
    0, // (28) Sly
    0, // (29) Earthly
  ],
  research: {
    research43: 0, // (1-6) Material: Lv2 x1.5, Lv4 x1.5, Lv6 x1.5
    research55: 0, // (1-6) Material: Lv2 x1.75, Lv4 x1.75, Lv6 x1.75
    research58: 0, // (1-6) Speed: Lv1 *1.05, Lv3 *1.05, Lv5 *1.05
    research60: 0, // (1-6) Material: Lv2 x5
    research62: 0, // (1-6) Proj Cost: Lv2 /1.5, Lv4 /2, Lv6 /2.5
    research67: 0, // (1-6) Material: Lv2 x2, Lv4 x3, Lv6 x4
    research70: 0, // (1-6) Material: Lv2 x5; Speed: Lv5 *2
    research72: 0, // (1-6) Proj Cost: Lv2 /2, Lv3 /3, Lv4 /3, Lv5 /4, Lv6 /4
    research77: 0, // (1-6) Material: Lv2 x3, Lv4 x4, Lv6 x5
    research80: 0, // (1-6) Material: Lv2 x9; Speed: Lv5 *1.5
    research87: 0, // (1-6) Material: Lv1 x13, Lv2 x21, Lv3 x34, Lv4 x55, Lv5 x89, Lv6 x144
  },
  academy: {
    personnel: [
      {
        // Mining Pods
        power: 1,
        population: 0,
      },
      {
        // Fireteam Carriers
        power: 4,
        population: 0,
      },
      {
        // Titan Haulers
        power: 12,
        population: 0,
      },
      {
        // Combat Corvettes
        power: 16,
        population: 0,
      },
    ],
    farms: [
      [
        // Planet 1
        {
          // Farm 1-1
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 1-2
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 1-3
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 1-4
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
      ],
      [
        // Planet 2
        {
          // Farm 2-1
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 2-2
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 2-3
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 2-4
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
      ],
      [
        // Planet 3
        {
          // Farm 3-1
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 3-2
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 3-3
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 3-4
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
      ],
      [
        // Planet 4
        {
          // Farm 4-1
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 4-2
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 4-3
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
        {
          // Farm 4-4
          pods: 0,
          fireteams: 0,
          titans: 0,
          corvettes: 0,
          locked: false,
        },
      ],
    ],
    farmYieldSetting: { type: 0, duration: 60 },
    farmYieldSelected: '1-h',
    stock: [0, 0, 0, 0, 0, 0, 0, 0],
    exchanges: {
      techSamples: 0,
      //
      fuelCells: 0,
      //
      dataCubes: 0,
    },
    projectLevels: [
      0 /* Cells Gained *= pow(4, level) */,
      0 /* All Gen Output *= pow(2, level) */,
      0 /* MP Gained *= pow(2, level) */,
      0 /* Shards Gained *= pow(2, level) */,
      0 /* RP Gained *= pow(2, level) */, 0 /* AP Gained *= pow(1.25, level) */,
      0 /* All Gen *= pow(3, level), RP *= pow(2.5, level), AP *= pow(1.6, level) */,
      0, 0,
    ],
    projectGoals: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    badges: {
      workers: false,
      innovation: false,
      tinkering: false,
      loopers: false,
      efficiency: false,
      engineering: false,

      darkInnovation: false,
      innovation2: false,
    },
  },
  diamonds: {
    special: {
      materials: 0,
    },
    ultima: {
      materialBonus: 1,
    },
    iapCollector: false,
    iapFragmentation: false,
  },
  relics: {
    relic3: 0,
    relic5: 0,
    relic20: 0,
  },
  gadgets: {
    gadget8: 0,
    gadget12: 0,
  },
  ouro: {
    enabled: false,
    meltdown: 0.0001,
    gemCreationNode3Bonus: 1,
    knoxSowLevel: 0,
    knoxMaxStage: 0,
    necrumStacks: 0,
    eternityBonus: 0,
    exo3: false,
    ts: {
      ts7: false,
    }
  },
}

const LSKey = 'CifiProjSave'

// Initializes to blank save in absence of preexisting save
let playerData = JSON.parse(localStorage.getItem(LSKey)) || blankPlayer

function SavePlayerData(data) {
  localStorage.setItem(LSKey, JSON.stringify(data || playerData))
}

function LoadPlayerData() {
  playerData = JSON.parse(localStorage.getItem(LSKey))
}

function ResetPlayerData() {
  localStorage.removeItem(LSKey)
}

// Add new properties to player data object upon opening newer version of Super Assistant
function UpdatePlayerData() {
  SavePlayerData()
}

function fixPlayerData() {
  if (!playerData.ouro) {
    playerData.ouro = blankPlayer.ouro
  }

  if (playerData.meltdown) {
    playerData.ouro.meltdown = playerData.meltdown
    delete playerData.meltdown
  }

  if (!playerData.diamonds.ultima) {
    playerData.diamonds.ultima = blankPlayer.diamonds.ultima
  }

  if (!playerData.relics) {
    playerData.relics = blankPlayer.relics
  }

  if (playerData.relics.glider) {
    playerData.relics.relic3 = playerData.relics.glider
    delete playerData.relics.glider
  }

  if (!playerData.gadgets) {
    playerData.gadgets = blankPlayer.gadgets
  }

  if (!playerData.fleet.ouro) {
    playerData.fleet.ouro = blankPlayer.fleet.ouro
  }

  if (playerData.academy.farms.length < 4) {
    playerData.academy.farms.push(
      JSON.parse(JSON.stringify(blankPlayer.academy.farms[3]))
    )
  }

  for (let p = 0; p < blankPlayer.academy.farms.length; p++) {
    for (let f = 0; f < blankPlayer.academy.farms[p].length; f++) {
      if (!playerData.academy.farms[p][f]) {
        playerData.academy.farms[p][f] = JSON.parse(
          JSON.stringify(blankPlayer.academy.farms[p][f])
        )
      }
    }
  }

  if (!playerData.ouro.ts) {
    playerData.ouro.ts = blankPlayer.ouro.ts
  }

  newResearch = blankPlayer.research

  if (Array.isArray(playerData.research.mission)) {
    newResearch.research43 = playerData.research.mission[0]
    newResearch.research55 = playerData.research.mission[1]
    newResearch.research58 = playerData.research.mission[2]
    newResearch.research67 = playerData.research.mission[3]
    newResearch.research77 = playerData.research.mission[4]

    delete playerData.mission
  }

  if (Array.isArray(playerData.research.perfection)) {
    newResearch.research60 = playerData.research.perfection[1]
    newResearch.research70 = playerData.research.perfection[2]
    newResearch.research80 = playerData.research.perfection[3]

    delete playerData.perfection
  }

  if (Array.isArray(playerData.research.construction)) {
    newResearch.research72 = playerData.research.construction[0]
    newResearch.research80 = playerData.research.construction[1]

    delete playerData.construction
  }

  newResearch.research87 = playerData.research.research87 || 0

  playerData.research = newResearch

  if (playerData.version < blankPlayer.version) {
    playerData.version = blankPlayer.version
    UpdatePlayerData()
  }
}

fixPlayerData()
