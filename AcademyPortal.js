// Bonus Calculation Debug Logger - Always logs
const BonusDebugger = {
  log(label, value, component = null) {
    console.log(`${component ? `[${component}] ` : ''}${label}:`, value);
  },
  
  group(name) {
    console.group(`${name}`);
  },
  
  groupEnd() {
    console.groupEnd();
  }
};

function GetMissionSpeedBonus() {
  BonusDebugger.group('Mission Speed Bonus Calculation');
    
  const swarmBonus = Math.pow(1.0311, playerData.loopMods.swarm);
  BonusDebugger.log('Swarm', swarmBonus, 'SWARM');
  
  const research58Bonus = Math.pow(
    1.05,
    Math.floor((playerData.research.research58 + 1) / 2),
  );
  BonusDebugger.log('Research 58', research58Bonus, 'RESEARCH');
  
  const research70Bonus = (playerData.research.research70 > 4) ? 2 : 1;
  BonusDebugger.log('Research 70', research70Bonus, 'RESEARCH');
  
  const research80Bonus = (playerData.research.research80 > 4) ? 1.5 : 1;
  BonusDebugger.log('Research 80', research80Bonus, 'RESEARCH');

  const engineeringBadgeBonus = playerData.academy.badges.engineering ? 2 : 1;
  BonusDebugger.log('Engineering Badge', engineeringBadgeBonus, 'BADGE');

  const productivityBonus = Math.pow(1.1, playerData.loopMods.productivity);
  BonusDebugger.log('Productivity', productivityBonus, 'LOOPMOD');
  
  const relic3Bonus = 1 + 0.03 * (playerData.relics.relic3 || 0);
  BonusDebugger.log('Relic 3', relic3Bonus, 'RELIC');

  bonus = swarmBonus * research58Bonus * research70Bonus * research80Bonus * engineeringBadgeBonus * productivityBonus * relic3Bonus;
  
  BonusDebugger.log('Final Mission Speed Bonus', bonus || 1, 'TOTAL');
  BonusDebugger.groupEnd();
  
  return bonus || 1;
}

function CalculateFarmTimes(getRawTime = false) {
  let missionSpeedBonus = GetMissionSpeedBonus()

  let farmData = []
  for (let planet = 0; planet < GameDB.academy.planets; planet++) {
    for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
      const farmInfo = GameDB.academy.farms[planet * GameDB.academy.farms_number + farm]
      const farmSetting = playerData.academy.farms[planet][farm]
      const personnelSetting = playerData.academy.personnel

      let power = 0
      let population = 0
      power += (farmSetting.pods || 0) * (personnelSetting[0].power || 0)
      population += farmSetting.pods || 0
      power += (farmSetting.fireteams || 0) * (personnelSetting[1].power || 0)
      population += farmSetting.fireteams || 0
      power += (farmSetting.titans || 0) * (personnelSetting[2].power || 0)
      population += farmSetting.titans || 0
      power += (farmSetting.corvettes || 0) * (personnelSetting[3].power || 0)
      population += farmSetting.corvettes || 0

      if (power === 0) {
        if (getRawTime) {
          farmData.push({ time: 1e10, personnel: population })
          continue
        }
        farmData.push({ time: '', personnel: 0 })
        continue
      }

      const MIN_TIME = 2

      const time = (60 * farmInfo.baseTime) / (power * missionSpeedBonus)
      const isCapped = time <= MIN_TIME
      const actualTime = isCapped
        ? MIN_TIME
        : farmInfo.isTimeRounded
        ? Math.ceil(time)
        : time

      if (getRawTime) {
        farmData.push({ time: actualTime, personnel: population })
        continue
      }

      farmData.push({
        time: formatDuration2(actualTime),
        rawTime: time.toFixed(2),
        isCapped,
        personnel: population,
      })
    }
  }

  return farmData
}

function GetMaxMissionRate() {
  let farms = [...GameDB.academy.farms]

  let missionSpeedBonus = GetMissionSpeedBonus()

  let personnel = [
    {
      power: playerData.academy.personnel[3].power,
      totalPop: playerData.academy.personnel[3].population,
      usedPop: 0,
      get availPop() {
        return this.totalPop - this.usedPop
      },
    },
    {
      power: playerData.academy.personnel[2].power,
      totalPop: playerData.academy.personnel[2].population,
      usedPop: 0,
      get availPop() {
        return this.totalPop - this.usedPop
      },
    },
    {
      power: playerData.academy.personnel[1].power,
      totalPop: playerData.academy.personnel[1].population,
      usedPop: 0,
      get availPop() {
        return this.totalPop - this.usedPop
      },
    },
    {
      power: playerData.academy.personnel[0].power,
      totalPop: playerData.academy.personnel[0].population,
      usedPop: 0,
      get availPop() {
        return this.totalPop - this.usedPop
      },
    },
  ]

  let farmDetails = []

  for (let planet = 0; planet < GameDB.academy.planets; planet++) {
    for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
      let farmSpecs = {
        id: farms[planet * GameDB.academy.farms_number + farm].id,
        locked: false,
        maxPop: farms[planet * GameDB.academy.farms_number + farm].maxPop,
        currentPop: 0,
        popDistro: [0, 0, 0, 0],
        power: 0,
        baseTime: farms[planet * GameDB.academy.farms_number + farm].baseTime / missionSpeedBonus,
        get availSpace() {
          return this.maxPop - this.currentPop
        },
        get timeLimitPassed() {
          return !(this.power === 0 || (this.baseTime * 60) / this.power >= 2)
        },
      }

      if (playerData.academy.farms[planet][farm].locked) {
        farmSpecs.locked = true

        farmSpecs.popDistro = [
          playerData.academy.farms[planet][farm].pods,
          playerData.academy.farms[planet][farm].fireteams,
          playerData.academy.farms[planet][farm].titans,
          playerData.academy.farms[planet][farm].corvettes,
        ]
        farmSpecs.power =
          playerData.academy.farms[planet][farm].pods *
          playerData.academy.personnel[0].power
        farmSpecs.power +=
          playerData.academy.farms[planet][farm].fireteams *
          playerData.academy.personnel[1].power
        farmSpecs.power +=
          playerData.academy.farms[planet][farm].titans *
          playerData.academy.personnel[2].power
        farmSpecs.power +=
          playerData.academy.farms[planet][farm].corvettes *
          playerData.academy.personnel[3].power

        personnel[3].usedPop += playerData.academy.farms[planet][farm].pods
        personnel[2].usedPop += playerData.academy.farms[planet][farm].fireteams
        personnel[1].usedPop += playerData.academy.farms[planet][farm].titans
        personnel[0].usedPop += playerData.academy.farms[planet][farm].corvettes
      }

      farmDetails.push(farmSpecs)
    }
  }

  // console.table(personnel);
  // console.log(farmDetails);

  farmDetails.sort((a, b) => a.baseTime - b.baseTime)

  for (let i = 0; i < farmDetails.length; i++) {
    if (farmDetails[i].locked) continue

    let planet = Math.floor(farmDetails[i].id / 10)
    let farmNum = farmDetails[i].id - planet * 10

    playerData.academy.farms[planet - 1][farmNum - 1].pods = 0
    playerData.academy.farms[planet - 1][farmNum - 1].fireteams = 0
    playerData.academy.farms[planet - 1][farmNum - 1].titans = 0
    playerData.academy.farms[planet - 1][farmNum - 1].corvettes = 0

    for (let personnelNum = 0; personnelNum < 4; personnelNum++) {
      let populate = Math.min(
        farmDetails[i].availSpace,
        personnel[personnelNum].availPop,
      )
      farmDetails[i].currentPop += populate
      farmDetails[i].power += populate * personnel[personnelNum].power
      personnel[personnelNum].usedPop += populate
      playerData.academy.farms[planet - 1][farmNum - 1][
        GameDB.academy.personnel[3 - personnelNum]
      ] += populate

      while (farmDetails[i].timeLimitPassed) {
        farmDetails[i].currentPop--
        farmDetails[i].power -= personnel[personnelNum].power

        if (!farmDetails[i].timeLimitPassed && personnelNum === 3) {
          farmDetails[i].currentPop++
          farmDetails[i].power += personnel[personnelNum].power
          break
        }

        personnel[personnelNum].usedPop--
        playerData.academy.farms[planet - 1][farmNum - 1][
          GameDB.academy.personnel[3 - personnelNum]
        ]--
      }

      if (farmDetails[i].availSpace <= 0) break
    }
  }

  SavePlayerData()
}

const getMatBonusFromLoopMod = () => {
  BonusDebugger.group('Loop Mod Bonuses');
  
  const beyondersBonus = Math.pow(1.01, playerData.loopMods.beyonders);
  BonusDebugger.log('Beyonders', beyondersBonus, 'LOOPMOD');
  
  const swarmBonus = Math.pow(1.5111, playerData.loopMods.swarm);
  BonusDebugger.log('Swarm', swarmBonus, 'LOOPMOD');
  
  const expansionBonus = Math.pow(1.01, playerData.loopMods.expansion);
  BonusDebugger.log('Expansion', expansionBonus, 'LOOPMOD');
  
  const materialHaulingBonus = Math.pow(1.05, playerData.loopMods.materialHauling);
  BonusDebugger.log('Material Hauling', materialHaulingBonus, 'LOOPMOD');
  
  const loopingBonus = Math.pow(1 + 0.0002 * playerData.loopMods.looping, playerData.loopsFilled);
  BonusDebugger.log('Looping', loopingBonus, 'LOOPMOD');
  
  const productivityBonus = Math.pow(1 + 0.002 * playerData.loopMods.productivity, playerData.level);
  BonusDebugger.log('Productivity', productivityBonus, 'LOOPMOD');
  
  const sekhur5Bonus = ((playerData.ouro.enabled && Math.pow(1.25, playerData.loopMods.sekhur5)) || 1);
  BonusDebugger.log('Sekhur5', sekhur5Bonus, 'LOOPMOD');

  const eternityBonus = ((playerData.ouro.enabled && playerData.ouro.eternityBoon) || 1);
  BonusDebugger.log('Eternity Boon', eternityBonus, 'LOOPMOD');
  
  const result = beyondersBonus * swarmBonus * expansionBonus * materialHaulingBonus * loopingBonus * productivityBonus * sekhur5Bonus * eternityBonus;
  BonusDebugger.log('Final Loop Mod Bonus:', result);
  BonusDebugger.groupEnd();
  
  return result;
}

const getMatBonusFromShardMilestone = () => {
  BonusDebugger.group('Shard Milestone Bonuses');
  let bonus = 1

  const wonderous60 = Math.pow(
    1.044,
    Math.max(0, playerData.shardMilestones[25] - 55) *
      (playerData.shardMilestones[25] > 59),
  )
  bonus *= wonderous60
  BonusDebugger.log('Wondrous 60', wonderous60, 'SHARD');
  
  const wonderous90 = Math.pow(
    1.068,
    Math.max(0, playerData.shardMilestones[25] - 84) *
      (playerData.shardMilestones[25] > 89),
  )
  bonus *= wonderous90
  BonusDebugger.log('Wondrous 90', wonderous90, 'SHARD');
  
  const milestone28_20 = Math.pow(
    1.018,
    Math.max(0, playerData.shardMilestones[28] - 20) *
      (playerData.shardMilestones[28] > 24),
  )
  bonus *= milestone28_20
  BonusDebugger.log('Earthly 20', milestone28_20, 'SHARD');
  
  const milestone28_45 = Math.pow(
    1.028,
    Math.max(0, playerData.shardMilestones[28] - 45) *
      (playerData.shardMilestones[28] > 49),
  )
  bonus *= milestone28_45
  BonusDebugger.log('Earthly 45', milestone28_45, 'SHARD');

  BonusDebugger.log('Final Shard Milestone Bonus:', bonus);
  BonusDebugger.groupEnd();
  
  return bonus
}

const getMatBonusFromResearch = () => {
  BonusDebugger.group('Research Bonuses');
  
  const research43Bonus = Math.pow(1.5, Math.floor(playerData.research.research43 / 2));
  BonusDebugger.log('Research 43', research43Bonus, 'RESEARCH');
  
  const research55Bonus = Math.pow(1.75, Math.floor(playerData.research.research55 / 2));
  BonusDebugger.log('Research 55', research55Bonus, 'RESEARCH');

  const research60Bonus = (1 + 4 * (playerData.research.research60 > 1));
  BonusDebugger.log('Research 60', research60Bonus, 'RESEARCH');

  const research67_1 = (playerData.research.research67 > 1 ? 2 : 1);
  const research67_3 = (playerData.research.research67 > 3 ? 3 : 1);
  const research67_5 = (playerData.research.research67 > 5 ? 4 : 1);
  const research67Bonus = research67_1 * research67_3 * research67_5;
  BonusDebugger.log('Research 67', research67Bonus, 'RESEARCH');

  const research70Bonus = (1 + 4 * (playerData.research.research70 > 1));
  BonusDebugger.log('Research 70', research70Bonus, 'RESEARCH');

  const research77_1 = (playerData.research.research77 > 1 ? 3 : 1);
  const research77_3 = (playerData.research.research77 > 3 ? 4 : 1);
  const research77_5 = (playerData.research.research77 > 5 ? 5 : 1);
  const research77Bonus = research77_1 * research77_3 * research77_5;
  BonusDebugger.log('Research 77', research77Bonus, 'RESEARCH');

  const research80Bonus = (1 + 8 * (playerData.research.research80 > 1));
  BonusDebugger.log('Research 80', research80Bonus, 'RESEARCH');

  const research87_1 = (playerData.research.research87 >= 1 ? 13 : 1);
  const research87_2 = (playerData.research.research87 >= 2 ? 21 : 1);
  const research87_3 = (playerData.research.research87 >= 3 ? 34 : 1);
  const research87_4 = (playerData.research.research87 >= 4 ? 55 : 1);
  const research87_5 = (playerData.research.research87 >= 5 ? 89 : 1);
  const research87_6 = (playerData.research.research87 >= 6 ? 144 : 1);
  const research87Bonus = research87_1 * research87_2 * research87_3 * research87_4 * research87_5 * research87_6;
  BonusDebugger.log('Research 87', research87Bonus, 'RESEARCH');

  const bonus = research43Bonus * research55Bonus * research60Bonus * research67Bonus * research70Bonus * research77Bonus * research80Bonus * research87Bonus;
  BonusDebugger.log('Final Research Bonus:', bonus);
  BonusDebugger.groupEnd();

  return bonus
}

const getMatBonusFromOuro = () => {
  BonusDebugger.group('Ouro Material Bonus Calculation');
  
  const relic20Bonus = Math.pow(8, playerData.relics.relic20 || 0);
  BonusDebugger.log('Relic 20', relic20Bonus, 'RELIC');

  const gem3Bonus = relic20Bonus * (playerData.ouro.gemCreationNode3Bonus || 1);
  BonusDebugger.log('Creation Gem Node 3', playerData.ouro.gemCreationNode3Bonus || 1, 'GEM');

  const meltdownValue = gem3Bonus * (playerData.ouro.meltdown || 1);
  BonusDebugger.log('Meltdown', playerData.ouro.meltdown || 1, 'MELTDOWN');

  const ouroNerf = meltdownValue * 0.0689;
  BonusDebugger.log('Ouro Nerf', 0.0689, 'NERF');

  const knoxBonusMultiplier = Math.pow(
    1 + 0.1 * playerData.ouro.knoxSowLevel,
    playerData.ouro.knoxMaxStage
  ) || 1;
  BonusDebugger.log('Knox Bonus', knoxBonusMultiplier, 'KNOX');

  const knoxBonus = ouroNerf * knoxBonusMultiplier;

  const extractorDrillBonus = Math.pow(1.005, playerData.gadgets.gadget8) * 
    Math.pow(1.35, Math.floor(playerData.gadgets.gadget8 / 10));
  BonusDebugger.log('Extractor Drill', extractorDrillBonus, 'GADGET');

  const drillBonus = knoxBonus * (extractorDrillBonus || 1);

  const necrumBonusMultiplier = 1.002 ** playerData.ouro.necrumStacks || 1;
  BonusDebugger.log('Necrum Multiplier', necrumBonusMultiplier, 'NECRUM');
  
  const temporalGem3Bonus = playerData.ouro.temporalGem3 ? Math.pow(1.005, playerData.loopReset, ) : 1;
  BonusDebugger.log('Temporal Gem 3# Node Bonus', temporalGem3Bonus, 'TOTAL');

  const necrumBonus = drillBonus * necrumBonusMultiplier * temporalGem3Bonus;
  BonusDebugger.log('Total Ouro Material Bonus', necrumBonus, 'TOTAL');

  BonusDebugger.groupEnd();
  return necrumBonus;
}

function GetStaticMatBonus() {
  BonusDebugger.group('Static Material Bonus Calculation');
  
  const isOuroEnabled = playerData.ouro.enabled
  const zeus = playerData.fleet.zeus
  const ouro = playerData.fleet.ouro

  let staticMatBonus = 1
  BonusDebugger.log('Base', 1, 'BASE');

  // Loop mods
  const matBonusFromLoopMod = getMatBonusFromLoopMod()
  staticMatBonus *= matBonusFromLoopMod

  // Zeus installs
  BonusDebugger.group('Zeus Ship Installs');
  const darkInnoBonus = isOuroEnabled && playerData.academy.badges.darkInnovation ? 3 : 1;
  const inno2Bonus = isOuroEnabled && playerData.academy.badges.innovation2 ? 222 : 1;
  const shipBonus = isOuroEnabled ? (darkInnoBonus * inno2Bonus) : 1;

  BonusDebugger.log('Dark Innovation', playerData.academy.badges.darkInnovation, 'ZEUS_MULT');
  BonusDebugger.log('Innovation #2', playerData.academy.badges.innovation2, 'ZEUS_MULT');

  const zeus3Bonus = 1 + 0.25 * zeus.installs[2] * (zeus.crew || 0) * shipBonus
  staticMatBonus *= zeus3Bonus
  BonusDebugger.log('Zeus Install 2', zeus3Bonus, 'ZEUS_INSTALL2');
  
  const zeus6Bonus = 1 + 0.1 * zeus.installs[5] * (zeus.crew || 0) * shipBonus
  staticMatBonus *= zeus6Bonus
  BonusDebugger.log('Zeus Install 5', zeus6Bonus, 'ZEUS_INSTALL5');
  
  BonusDebugger.groupEnd();

  // Ouro installs
  if (isOuroEnabled) {
    BonusDebugger.group('Ouro Ship Installs');
    const ouro5Bonus =
      Math.pow(1 + 0.005 * (ouro.installs[4] || 0), ouro.crew || 0) *
      (ouro.installs[4] ? shipBonus : 1);
    BonusDebugger.log('Ouro Install 4', ouro5Bonus, 'OURO_INSTALL4');
    
    const ouroMatBonus = getMatBonusFromOuro();
    staticMatBonus *= ouroMatBonus
    
    staticMatBonus *= ouro5Bonus
    BonusDebugger.groupEnd();
  } else {
    BonusDebugger.log('Ouro Disabled', 1, 'OURO_MATS');
  }

  // Shard milestones
  BonusDebugger.group('Shard Milestones');
  const matBonusFromShardMilestone = getMatBonusFromShardMilestone()
  staticMatBonus *= matBonusFromShardMilestone
  BonusDebugger.groupEnd();

  // Research
  BonusDebugger.group('Research Bonuses');
  const bonusFromResearch = getMatBonusFromResearch()
  staticMatBonus *= bonusFromResearch
  BonusDebugger.groupEnd();

  // Diamond bonuses
  BonusDebugger.group('Diamond Bonuses');
  const diamondSpecial = Math.pow(1.05, playerData.diamonds.special.materials || 0);
  staticMatBonus *= diamondSpecial;
  BonusDebugger.log('Diamond Special', diamondSpecial, 'DIAMOND_SPECIAL');
  
  if (playerData.diamonds.ultima.materialBonus > 1) {
    staticMatBonus *= playerData.diamonds.ultima.materialBonus;
    BonusDebugger.log('Diamond Ultima', playerData.diamonds.ultima.materialBonus, 'DIAMOND_ULTIMA');
  }
  
  if (playerData.diamonds.iapCollector) {
    if (playerData.ouro.exo3) {
      staticMatBonus *= 100;
    } else {
      staticMatBonus *= 1.5;
    }
    BonusDebugger.log('IAP Collector', 100, 'IAP');
  }
  
  BonusDebugger.groupEnd();

  // Project bonus
  BonusDebugger.group('Project Bonuses');
  const projectBonus = Math.pow(1.75, playerData.academy.projectLevels[8]);
  staticMatBonus *= projectBonus
  BonusDebugger.log('Project 8', projectBonus, 'PROJECT');
  BonusDebugger.groupEnd();

  BonusDebugger.log('Total', staticMatBonus, 'TOTAL');
  BonusDebugger.groupEnd();

  return staticMatBonus
}

function GetDynamicMatBonus() {
  return Math.pow(
    0.01 * playerData.loopMods.zeusRankBenefits + 1,
    playerData.fleet.zeus.rank.current,
  )
}

function GetCurrentMatBonus() {
  return GetStaticMatBonus() * GetDynamicMatBonus()
}

function CalculateFarmYields(giveTotal = false) {
  const getDuration = () => {
    let durationSetting = playerData.academy.farmYieldSelected || '1-h'
    const [d, u] = durationSetting.split('-')
    let duration = parseInt(d, 10) * 60 * 60
    if (u === 'd') {
      duration *= 24
    }

    return duration
  }

  let totalDuration = getDuration() || 60 * 60
  let duration = totalDuration

  let staticMatBonus = GetStaticMatBonus()
  let dynamicMatBonus = GetDynamicMatBonus()
  const matBonusPerRank = 0.01 * playerData.loopMods.zeusRankBenefits + 1

  let farmTimes = CalculateFarmTimes(true)

  let farms = []

  for (let i = 0; i < farmTimes.length; i++) {
    const farmDuration = farmTimes[i].time
    if (farmDuration <= duration) {
      let newFarm = {
        id: GameDB.academy.farms[i].id,
        staticMats: [...GameDB.academy.farms[i].baseMats],
        runTime: farmDuration,
        activeTime: farmDuration,
        farmCount: Math.floor(duration / farmDuration),
      }
      farms.push(newFarm)
    }
  }

  const ts7Multiplier = (playerData.ouro.enabled && playerData.ouro.ts.ts7) ? 2 : 1

  let missionYield = farms.reduce((acc, farm) => acc + farm.farmCount, 0)
  let missionContrib = farms.reduce((acc, farm) => {
    acc[farm.id] = farm.farmCount
    return acc
  }, {})
  let matYield = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let matContrib = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  if (giveTotal) {
    matYield = [...playerData.academy.stock]
  }
  let rankProgress = playerData.fleet.zeus.rank.progress
  let yieldRank = playerData.fleet.zeus.rank.current

  if (farms.length === 0) {
    return { missionYield, missionContrib, matYield, matContrib }
  }

  // use precise calculation if duration is less than 3 days
  if (totalDuration < 3 * 24 * 3600) {
    while (duration > 0) {
      farms.sort((a, b) => {
        return a.activeTime - b.activeTime
      })
      let subTime = farms[0].activeTime

      if (subTime > duration) break

      for (let i = 0; i < farms.length; i++) {
        farms[i].activeTime -= subTime

        if (farms[i].activeTime <= 0) {
          farms[i].activeTime = farms[i].runTime
          for (let mat = 0; mat < farms[i].staticMats.length; mat++) {
            const isLastMat = mat === farms[i].staticMats.length - 1

            const product = isLastMat
              ? farms[i].staticMats[mat] * ts7Multiplier  // only TS7 applies
              : farms[i].staticMats[mat] * staticMatBonus * dynamicMatBonus * ts7Multiplier 
            matYield[mat] += product
            if (matContrib[mat][farms[i].id]) {
              matContrib[mat][farms[i].id] += product
            } else {
              matContrib[mat][farms[i].id] = product
            }
          }

          rankProgress += ts7Multiplier
        }
      }

      const rankReq = GameDB.fleet.zeus.rankRequirements[yieldRank]
      if (rankReq && rankProgress >= rankReq) {
        rankProgress -= rankReq
        yieldRank++
        dynamicMatBonus = Math.pow(matBonusPerRank, yieldRank)
      }

      duration -= subTime
    }
  } else {
    // use estimated calculation if duration is 3 days or longer

    const currentZeusRankBonus = Math.pow(matBonusPerRank, yieldRank)
    let incRank = 0
    let zeusRankBonusOverTime = 0

    let missionCount = missionYield
    while (missionCount > 0) {
      let toNextRank =
        GameDB.fleet.zeus.rankRequirements[yieldRank + incRank] || 1e30
      if (rankProgress > 0) {
        toNextRank -= rankProgress
        rankProgress = 0
      }

      zeusRankBonusOverTime +=
        (Math.pow(matBonusPerRank, incRank) *
          Math.min(toNextRank, missionCount)) /
        missionYield

      missionCount -= toNextRank
      incRank++
    }

    farms.forEach((farm) => {
      farm.staticMats.forEach((staticMat, mat) => {
        const isLastMat = mat === farm.staticMats.length - 1

        const totalMat = isLastMat
          ? staticMat * farm.farmCount * ts7Multiplier
          : staticMat *
          staticMatBonus *
          currentZeusRankBonus *
          zeusRankBonusOverTime *
          farm.farmCount *
          ts7Multiplier
        matYield[mat] += totalMat
        matContrib[mat][farm.id] = totalMat
      })
    })
  }

  return {
    missionYield: missionYield * ts7Multiplier,
    missionContrib,
    matYield,
    matContrib,
    duration: totalDuration,
  }
}

class StoreHouse {
  constructor(totalMats) {
    this.mats = []
    this.spent = []
    for (let i = 0; i < totalMats.length; i++) {
      this.mats.push(totalMats[i])
      this.spent.push(0)
    }
  }
}

class ProjectConfig {
  get gainedLevels() {
    return this.currentLevel - this.startLevel
  }

  get gainedBp() {
    return this.gainedLevels * GameDB.academy.projects[this.projectID].bpCount
  }

  constructor(_projectID, _currentLevel) {
    this.projectID = _projectID
    this.startLevel = _currentLevel
    this.currentLevel = _currentLevel
    this.testLevel = _currentLevel
  }

  MaxLevel(storeHouse) {
    this.testLevel = this.currentLevel

    let costDiv = this.getCostDiv()

    let accumCosts = [0, 0, 0, 0, 0, 0, 0, 0]
    while (true) {
      let searchEnd = false
      let nextCosts = GameDB.academy.projectNextLevelCost(
        this.projectID,
        this.testLevel,
        costDiv,
        playerData.ouro.enabled,
      )

      for (let i = 0; i < storeHouse.mats.length; i++) {
        if (
          storeHouse.mats[i] - storeHouse.spent[i] <
          accumCosts[i] + nextCosts[i]
        ) {
          searchEnd = true
          break
        }
      }

      if (searchEnd) break

      for (let i = 0; i < storeHouse.mats.length; i++) {
        accumCosts[i] += nextCosts[i]
      }
      this.testLevel++

      //   console.count(`Project: ${this.projectID}`);
    }

    let result = {
      newLevels: this.testLevel - this.currentLevel,
      costs: accumCosts,
    }

    // console.log(result);

    return result
  }

  getCostDiv() {
    let costDiv = 1
    costDiv =
      (playerData.research.research62 > 1 ? 1.5 : 1) *
      (playerData.research.research62 > 3 ? 2 : 1) *
      (playerData.research.research62 > 5 ? 2.5 : 1)
    costDiv *=
      (playerData.research.research72 > 1 ? 2 : 1) *
      (playerData.research.research72 > 2 ? 3 : 1) *
      (playerData.research.research72 > 3 ? 3 : 1) *
      (playerData.research.research72 > 4 ? 4 : 1) *
      (playerData.research.research72 > 5 ? 4 : 1)

    return costDiv
  }

  get currentCost() {
    let costDiv = this.getCostDiv()

    let accumCosts = [0, 0, 0, 0, 0, 0, 0, 0]

    for (
      let spanLevel = this.startLevel;
      spanLevel < this.currentLevel;
      spanLevel++
    ) {
      let nextCosts = GameDB.academy.projectNextLevelCost(
        this.projectID,
        spanLevel,
        costDiv,
        playerData.ouro.enabled,
      )
      for (let i = 0; i < 8; i++) {
        accumCosts[i] += nextCosts[i]
      }
    }

    return accumCosts
  }

  getStartCost() {
    const costDiv = this.getCostDiv()
    return GameDB.academy.projectNextLevelCost(
      this.projectID,
      this.startLevel,
      costDiv,
      playerData.ouro.enabled,
    )
  }
}
