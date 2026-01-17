/*

PLAYER DATA CHANGE LOG

*/

const blankPlayer = {
  version: 14,
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
    mission: [
      0, // (1) [AP = (level > 2 ? 1.3 : 1) * (level > 4 ? 1.3 : 1), Materials = pow(1.5, floor(level / 2))]
      0, // (2) [AP = (level > 2 ? 1.5 : 1) * (level > 4 ? 1.5 : 1), Materials = pow(1.75, floor(level / 2))]
      0, // (3) [Mission Speed = pow(1.05, floor((level + 1) / 2)) || BUGGED = pow(1.05, floor((level + 1) / 2)) / (0.05 * (level === 6) + 1)]
      0, // (4) [AP = (level > 2 ? 2 : 1) * (level > 4 ? 3 : 1), Materials = (level > 1 ? 2 : 1) * (level > 3 ? 3 : 1) * (level > 5 ? 4 : 1)]
      0, //  (5) [AP = (level > 2 ? 3 : 1) * (level > 4 ? 4 : 1), Materials = (level > 1 ? 3 : 1) * (level > 3 ? 4 : 1) * (level > 5 ? 5 : 1)]
    ],
    perfection: [
      0, // (1) [AP = level > 3 ? 10 : 1]
      0, // (2) [AP = level > 3 ? 10 : 1, Materials = 4 * (level > 1) + 1]
      0, // (3) [AP = level > 3 ? 50 : 1, Materials = 4 * (level > 1) + 1, Mission Speed = (level > 4) + 1]
      0, // (4) [AP = level > 3 ? 99 : 1, Materials = 8 * (level > 1) + 1, Mission Speed = (level > 4) + 1]
    ],
    construction: [
      0, // (1) Project Cost = (level > 1 ? 1.5 : 1) * (level > 3 ? 2 : 1) * (level > 5 ? 2.5 : 1)]
      0, // (2) Project Cost = (level > 1 ? 2 : 1) * (level > 3 ? 3 : 1) * (level > 5 ? 4 : 1)]
    ],
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
  },
  relics: {
    relic3: 0,
    relic5: 0,
    relic20: 0,
  },
  ouro: {
    enabled: false,
    meltdown: 0.0001,
    gemCreationNode3Bonus: 1,
    knoxSowBonus: 1,
    extractorDrillBonus: 1,
    necrumBonus: 1,
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

  if (!playerData.fleet.ouro) {
    playerData.fleet.ouro = blankPlayer.fleet.ouro
  }

  if (playerData.academy.farms.length < 4) {
    playerData.academy.farms.push(blankPlayer.academy.farms[3])
  }

  if (playerData.version < blankPlayer.version) {
    playerData.version = blankPlayer.version
    UpdatePlayerData()
  }
}

fixPlayerData()
