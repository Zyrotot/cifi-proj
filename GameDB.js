let GameDB = {
  version: 3,
  academy: {
    personnel: ['pods', 'fireteams', 'titans', 'corvettes'],
    planets: 4,
    farms_number: 4,
    materials: [
      'Difar',
      'Kento',
      'Chromium',
      'Exon',
      'Organium',
      'Adamorphium',
      'Moskom',
      'Darkseid',
      'Fragments'
    ],
    // baseTimes are in minutes
    farms: [
      {
        id: 11,
        baseTime: 30,
        maxPop: 20,
        baseAP: 5,
        // Difar
        baseMats: [38, 0, 0, 0, 0, 0, 0, 0, 0],
        isTimeRounded: false,
      },
      {
        id: 12,
        baseTime: 360,
        maxPop: 60,
        baseAP: 150,
        // Kento
        baseMats: [0, 320, 0, 0, 0, 0, 0, 0, 0],
        isTimeRounded: false,
      },
      {
        id: 13,
        baseTime: 2400,
        maxPop: 100,
        baseAP: 1200,
        // Difar, Kento, Chromium
        baseMats: [1350, 280, 760, 0, 0, 0, 0, 0, 0],
        isTimeRounded: false,
      },
      {
        id: 14,
        baseTime: 6000,
        maxPop: 120,
        baseAP: 1200,
        // Fragments
        baseMats: [0, 0, 0, 0, 0, 0, 0, 0, 0.006],
        isTimeRounded: false,
      },
      {
        id: 21,
        baseTime: 150,
        maxPop: 80,
        baseAP: 35,
        // Exon
        baseMats: [0, 0, 0, 35, 0, 0, 0, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 22,
        baseTime: 2400,
        maxPop: 160,
        baseAP: 170,
        // Chromium, Organium
        baseMats: [0, 0, 560, 0, 80, 0, 0, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 23,
        baseTime: 72000,
        maxPop: 500,
        baseAP: 11500,
        // Exon, Organium, Adamorphium
        baseMats: [0, 0, 0, 2200, 320, 260, 0, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 24,
        baseTime: 132000,
        maxPop: 1000,
        baseAP: 23000,
        baseMats: [0, 0, 0, 0, 0, 0, 0, 0, 0.028],
        isTimeRounded: true,
      },
      {
        id: 31,
        baseTime: 3000,
        maxPop: 150,
        baseAP: 2000,
        // Moskom
        baseMats: [0, 0, 0, 0, 0, 0, 19, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 32,
        baseTime: 975000,
        maxPop: 2000,
        baseAP: 1000000,
        // Darkseid
        baseMats: [0, 0, 0, 0, 0, 0, 0, 80, 0],
        isTimeRounded: true,
      },
      {
        id: 33,
        baseTime: 1875000,
        maxPop: 4000,
        baseAP: 2000000,
        // Organium, Adamorphium, Moskom, Darkseid
        baseMats: [0, 0, 0, 0, 5200, 2440, 3980, 160, 0],
        isTimeRounded: true,
      },
      {
        id: 34,
        baseTime: 1875000,
        maxPop: 4000,
        baseAP: 2000000,
        baseMats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 41,
        baseTime: 21000,
        maxPop: 1000,
        baseAP: 17000,
        // Difar, Kento, Organium
        baseMats: [40, 60, 0, 0, 50, 0, 0, 0, 0],
        isTimeRounded: true,
      },
      {
        id: 42,
        baseTime: 4875000,
        maxPop: 10000,
        baseAP: 3300000,
        // Chromium, Adamorphium, Darkseid
        baseMats: [0, 0, 8000, 0, 0, 7000, 0, 2000, 0],
        isTimeRounded: true,
      },
      {
        id: 43,
        baseTime: 9750000,
        maxPop: 20000,
        baseAP: 6700000,
        // Exon, Moskom, Darkseid
        baseMats: [0, 0, 0, 30000, 0, 0, 20000, 5000, 0],
        isTimeRounded: true,
      },
      {
        id: 44,
        baseTime: 9750000,
        maxPop: 20000,
        baseAP: 6700000,
        baseMats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        isTimeRounded: true,
      },
    ], // END .farms
    projects: [
      {
        name: 'Storage Facility',
        baseCosts: [600, 200, 0, 0, 0, 0, 0, 0, 0],
        costScalar: 1.25,
        costBump: 0.016,
        costBumpOuro: 0.136,
        bpCount: 1,
      },
      {
        name: 'Transfer Wires',
        baseCosts: [2750, 1500, 500, 0, 0, 0, 0, 0, 0],
        costScalar: 1.4,
        costBump: 0.05,
        costBumpOuro: 0.1873,
        costBumpOuroDivider: 184.57,
        bpCount: 1,
      },
      {
        name: 'Bio-Mechanics Lab',
        baseCosts: [0, 0, 2400, 1000, 500, 0, 0, 0, 0],
        costScalar: 1.7,
        costBump: 0.09,
        costBumpOuro: 0.2712,
        costBumpOuroDivider: 509.32,
        bpCount: 1,
      },
      {
        name: 'Exo-Energy',
        baseCosts: [0, 7000, 5000, 1500, 1500, 0, 0, 0, 0],
        costScalar: 1.4,
        costBump: 0.07,
        costBumpOuro: 0.2675, // TODO: to confirm
        bpCount: 1,
      },
      {
        name: 'Defensive Research',
        baseCosts: [0, 0, 0, 0, 0, 1000, 200, 0, 0],
        costScalar: 1.6,
        costBump: 0.08,
        costBumpOuro: 0.309, // TODO: to confirm
        bpCount: 1,
      },
      {
        name: 'Warp-Drive Lab',
        baseCosts: [0, 0, 0, 0, 260000, 120000, 28000, 28000],
        costScalar: 2,
        costBump: 0.11,
        bpCount: 1,
      },
      {
        name: 'Fuel Compression',
        baseCosts: [1e38, 0, 0, 4e37, 0, 0, 7e36, 0, 0],
        costScalar: 3,
        costBump: 0.2,
        bpCount: 2,
      },
      {
        name: 'Quantum Weaponry',
        baseCosts: [0, 2e45, 0, 0, 5e44, 0, 0, 0, 0],
        costScalar: 3.2,
        costBump: 0.25,
        bpCount: 2,
      },
      {
        name: 'Robo-Douglett',
        baseCosts: [0, 0, 3e55, 0, 0, 6e55, 0, 8e54],
        costScalar: 18,
        costBump: 0.5,
        costBumpLvInterval: 10,
        bpCount: 3,
      },
    ],
    bpRequirements: [
      10, // cm1-3
      20, // cm4-6
      30, // cm7-9
      40, // cm10-12
      50, // cm13-15
      60, // cm16-18
      80, // cm19-21
      100, // cm22-24
      120, // cm25-27
      140, // cm28-30
      160, // cm31-33
    ].reduce((acc, c) => {
      acc.push(c, c, c)
      return acc
    }, []),
    badgeRequirement: [
      // worker 50, in 50, tink 50, looper 75, eff 75, eng 100; total 400
      // c1 50 cores, c2 55 cores, c3 65 cores, 100 instant cores; total 270
      // need more 130 cores to complete first 6 badges
      [130 * 4], // up till engi
      [150 * 4, 'Momentum Badge'], // mom
      [75 * 4, 'The 8th Badge'], // 8th
      [75 * 4, 'The 9th Badge'], // 9th
      [300 * 4, 'The 10th Badge'], // 10th
      [300 * 4, 'The 11th Badge'], // 11th
    ],
    projectNextLevelCost(projectID, level, costDiv, ouroEnabled) {
      let project = this.projects[projectID]

      const baseCosts = project.baseCosts
      const costScalar = project.costScalar
      const costBump = (ouroEnabled && project.costBumpOuro) || project.costBump
      const bumpTimes = Math.floor(level / (project.costBumpLvInterval || 100))
      const ouroDivider =
        ouroEnabled && project.costBumpOuroDivider && bumpTimes > 0
          ? project.costBumpOuroDivider
          : 1

      const costMultiplier =
        Math.pow(costScalar + costBump * bumpTimes, level) /
        costDiv /
        ouroDivider

      return baseCosts.map((mat) => mat * costMultiplier)
    }, // END .projects
  },
  fleet: {
    zeus: {
      // prettier-ignore
      rankRequirements: [
        1, 5, 9, 25, 33, 41, 73, 85, 97, 145, // 10
        201, 221, 301, 326, 351, 451, 481, 511, 631, 666, // 20
        877, 1052, 1102, 1152, 1352, 1408, 1464, 1689, 1752, 1814, // 30
        2580, 2666, 2752, 3096, 3189, 3283, 3658, 3760, 3861, 4268, // 40
        5471, 5608, 6155, 6301, 6448, 7034, 7190, 7346, 7971, 8137, // 50
        10379, 11209, 11429, 11649, 12527, 12759, 12991, 13919, 14163, 14407, // 60
        19230, 19550, 19871, 21152, 21488, 21824, 23167, 23518, 23869, 25272, // 70
        32048, 32506, 34337, 34814, 35291, 37198, 37694, 38190, 40174, 40689, // 80
        51504, 54079, 54747, 55414, 58085, 58776, 59468, 62233, 62948, 63664, // 90
        83156, 84080, 85004, 88699, 89653, 90607, 94421, 95405, 96388, 100322, // 100
        126669, 127936, 133002, 134306, 135610, 140825, 142166, 143507, 148872, 150250, // 110
        151629, 157142, 158558, 159973, 165636, 167089, 168541, 174353, 175843, 177333, // 120
        183294, 184821, 186348, 192458, 194022, 195587, 201846, 203447, 205049, 211457, // 130
        213096, 214735, 221292, 222968, 224644, 231350, 233063, 234777, 241632, 243383, // 140
        245133, 252137, 253925, 255713, 262866, 264691, 266517, 273818, 275681, 277543, // 150
        284994, 286894, 288794, 296393, 298331, 300268, 308016, 309991, 311965, 319863, // 160
      ],
    },
  },
}

function parseBigNum(value) {
  // k, m, b, t, qa, qu, sx, sp, o, n, d
  value = value.toLowerCase()
  if (value.includes('k')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e3
  } else if (value.includes('m')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e6
  } else if (value.includes('b')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e9
  } else if (value.includes('t')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e12
  } else if (value.includes('qa')) {
    value = parseFloat(value.slice(0, -2))
    if (isNaN(value)) return value
    value *= 1e15
  } else if (value.includes('qu')) {
    value = parseFloat(value.slice(0, -2))
    if (isNaN(value)) return value
    value *= 1e18
  } else if (value.includes('sx')) {
    value = parseFloat(value.slice(0, -2))
    if (isNaN(value)) return value
    value *= 1e21
  } else if (value.includes('sp')) {
    value = parseFloat(value.slice(0, -2))
    if (isNaN(value)) return value
    value *= 1e24
  } else if (value.includes('o')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e27
  } else if (value.includes('n')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e30
  } else if (value.includes('d')) {
    value = parseFloat(value.slice(0, -1))
    if (isNaN(value)) return value
    value *= 1e33
  } else {
    value = parseFloat(value)
    if (isNaN(value)) return value
  }

  return value
}
