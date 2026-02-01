let durationOptions = [
  ['1-h', '1 Hour'],
  ['2-h', '2 Hours'],
  ['4-h', '4 Hours'],
  ['6-h', '6 Hours'],
  ['12-h', '12 Hours'],
  ['18-h', '18 Hours'],
  ['1-d', '1 Day'],
  ['2-d', '2 Days'],
  ['3-d', '3 Days'],
  ['4-d', '4 Days'],
  ['5-d', '5 Days'],
  ['7-d', '7 Days'],
  ['10-d', '10 Days'],
  ['15-d', '15 Days'],
  ['30-d', '30 Days'],
  ['45-d', '45 Days'],
  ['60-d', '60 Days'],
  ['90-d', '90 Days'],
  ['120-d', '120 Days'],
]

let academyFarmPortal = {
  pages: {
    default: {},
  },
}

academyFarmPortal.pages.default.dataLinkage = {
  set podspower(value) {
    playerData.academy.personnel[0].power = value
  },
  set podsowned(value) {
    playerData.academy.personnel[0].population = value
  },
  set fireteamspower(value) {
    playerData.academy.personnel[1].power = value
  },
  set fireteamsowned(value) {
    playerData.academy.personnel[1].population = value
  },
  set titanspower(value) {
    playerData.academy.personnel[2].power = value
  },
  set titansowned(value) {
    playerData.academy.personnel[2].population = value
  },
  set corvettespower(value) {
    playerData.academy.personnel[3].power = value
  },
  set corvettesowned(value) {
    playerData.academy.personnel[3].population = value
  },
  set duration(value) {
    playerData.academy.farmYieldSelected = value
  },
  set ap(value) {
    playerData.academy.ap = value
  },
  set difar(value) {
    playerData.academy.stock[0] = value
  },
  set kento(value) {
    playerData.academy.stock[1] = value
  },
  set chromium(value) {
    playerData.academy.stock[2] = value
  },
  set exon(value) {
    playerData.academy.stock[3] = value
  },
  set organium(value) {
    playerData.academy.stock[4] = value
  },
  set adamorphium(value) {
    playerData.academy.stock[5] = value
  },
  set moskom(value) {
    playerData.academy.stock[6] = value
  },
  set darkseid(value) {
    playerData.academy.stock[7] = value
  },

  get podspower() {
    return playerData.academy.personnel[0].power
  },
  get podsowned() {
    return playerData.academy.personnel[0].population
  },
  get fireteamspower() {
    return playerData.academy.personnel[1].power
  },
  get fireteamsowned() {
    return playerData.academy.personnel[1].population
  },
  get titanspower() {
    return playerData.academy.personnel[2].power
  },
  get titansowned() {
    return playerData.academy.personnel[2].population
  },
  get corvettespower() {
    return playerData.academy.personnel[3].power
  },
  get corvettesowned() {
    return playerData.academy.personnel[3].population
  },
  get duration() {
    return playerData.academy.farmYieldSelected || '1-h'
  },
  get ap() {
    return playerData.academy.ap
  },
  get difar() {
    return playerData.academy.stock[0]
  },
  get kento() {
    return playerData.academy.stock[1]
  },
  get chromium() {
    return playerData.academy.stock[2]
  },
  get exon() {
    return playerData.academy.stock[3]
  },
  get organium() {
    return playerData.academy.stock[4]
  },
  get adamorphium() {
    return playerData.academy.stock[5]
  },
  get moskom() {
    return playerData.academy.stock[6]
  },
  get darkseid() {
    return playerData.academy.stock[7]
  },
}

// Adding farm personnel linkages
for (let planet = 0; planet < GameDB.academy.planets; planet++) {
  for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
    let propertyName = `farm${planet}${farm}pods`
    Object.defineProperty(
      academyFarmPortal.pages.default.dataLinkage,
      propertyName,
      {
        set: function (value) {
          playerData.academy.farms[planet][farm].pods = value
        },
        get: function () {
          return playerData.academy.farms[planet][farm].pods
        },
      },
    )

    propertyName = `farm${planet}${farm}fireteams`
    Object.defineProperty(
      academyFarmPortal.pages.default.dataLinkage,
      propertyName,
      {
        set: function (value) {
          playerData.academy.farms[planet][farm].fireteams = value
        },
        get: function () {
          return playerData.academy.farms[planet][farm].fireteams
        },
      },
    )

    propertyName = `farm${planet}${farm}titans`
    Object.defineProperty(
      academyFarmPortal.pages.default.dataLinkage,
      propertyName,
      {
        set: function (value) {
          playerData.academy.farms[planet][farm].titans = value
        },
        get: function () {
          return playerData.academy.farms[planet][farm].titans
        },
      },
    )

    propertyName = `farm${planet}${farm}corvettes`
    Object.defineProperty(
      academyFarmPortal.pages.default.dataLinkage,
      propertyName,
      {
        set: function (value) {
          playerData.academy.farms[planet][farm].corvettes = value
        },
        get: function () {
          return playerData.academy.farms[planet][farm].corvettes
        },
      },
    )

    propertyName = `farm${planet}${farm}lock`
    Object.defineProperty(
      academyFarmPortal.pages.default.dataLinkage,
      propertyName,
      {
        set: function (value) {
          playerData.academy.farms[planet][farm].locked = value
        },
        get: function () {
          return playerData.academy.farms[planet][farm].locked
        },
      },
    )
  }
}

const createElement = (
  tag = 'div',
  className = '',
  attr = {},
  innerText = '',
) => {
  const ele = document.createElement(tag)
  Object.assign(ele, { className, ...attr })
  ele.innerText = innerText
  return ele
}

academyFarmPortal.pages.default.initFunction = function (panel) {
  const flex = createElement('div', 'section-2')

  const createPersonel = () => {
    const section = createElement('div', 'section-3')
    const header = createElement('h3', null, null, 'Personnel')
    section.appendChild(header)

    const table = createElement('table', 'table table-borderless')
    table.innerHTML =
      '<thead><tr><th></th><th class="text-center" style="font-size:0.7em"><label class="has-tip" data-bs-toggle="tooltip" data-bs-title="Individual">Power</label></th>' +
      '<th class="text-center" style="font-size:0.7em">Owned</th></tr></thead>'

    const tbody = document.createElement('tbody')
    table.appendChild(tbody)

    const personnels = [
      { id: 'pods', label: 'mining pods' },
      { id: 'fireteams', label: 'fireteams' },
      { id: 'titans', label: 'titans' },
      { id: 'corvettes', label: 'corvettes' },
    ]

    personnels.forEach((personnel) => {
      const row = document.createElement('tr')
      tbody.appendChild(row)

      const c1 = createElement('td', 'text-end', null, personnel.label)
      row.appendChild(c1)

      const c2 = createElement('td')
      row.appendChild(c2)
      const power = createElement(
        'input',
        'form-control form-control-sm text-center',
        {
          id: personnel.id + 'power',
          type: 'number',
          style: 'width: 50px',
          min: '0',
          value: portalPanel.dataLinkage[personnel.id + 'power'],
        },
      )
      power.addEventListener('change', portalPanel.updateFunction)
      portalPanel[power.id] = power
      c2.appendChild(power)

      const c3 = createElement('td')
      row.appendChild(c3)
      const owned = createElement(
        'input',
        'form-control form-control-sm text-center',
        {
          id: personnel.id + 'owned',
          type: 'number',
          style: 'width: 70px',
          min: '0',
          value: portalPanel.dataLinkage[personnel.id + 'owned'],
        },
      )
      owned.addEventListener('change', portalPanel.updateFunction)
      portalPanel[owned.id] = owned
      c3.appendChild(owned)
    })

    section.appendChild(table)
    return section
  }

  const createFarms = () => {
    const section = createElement('div', 'section-3')
    const header = createElement('h3', null, null, 'Farms')
    section.appendChild(header)

    const table = document.createElement('table')
    table.className = 'table table-borderless'
    table.innerHTML =
      '<thead><tr><th>Farm</th><th>Total</th><th></th><th class="text-center">Pod</th><th class="text-center">Fire</th><th class="text-center">Titan</th><th class="text-center">Corv</th><th>Time</th></tr></thead>'

    const tbody = document.createElement('tbody')
    table.appendChild(tbody)

    for (let plannet = 0; plannet < GameDB.academy.planets; plannet++) {
      for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
        const row = createElement('tr')
        row.appendChild(
          createElement('td', 'text-end', null, `${plannet + 1}-${farm + 1}`),
        )
        const total = createElement('span', '', {
          id: `farm${plannet}${farm}total`,
        })
        total.setAttribute('data-bs-toggle', 'tooltip')
        total.setAttribute('data-bs-title', ' ')
        portalPanel[`farm${plannet}${farm}total`] = total
        const totalTd = createElement('td', 'text-end')
        totalTd.appendChild(total)
        row.appendChild(totalTd)

        const lockId = `farm${plannet}${farm}lock`
        const lockCell = createElement('td')
        let lockContainer = createElement('label', 'lockcontainer')
        let lockBox = createElement('input', '', {
          id: lockId,
          type: 'checkbox',
          checked: portalPanel.dataLinkage[lockId],
        })
        lockBox.addEventListener('change', portalPanel.updateFunction)

        lockContainer.appendChild(lockBox)
        lockContainer.appendChild(createElement('div', 'lockmark'))
        lockCell.appendChild(lockContainer)
        row.appendChild(lockCell)

        GameDB.academy.personnel.forEach((p) => {
          const cell = createElement('td')
          const e = createElement(
            'input',
            'form-control form-control-sm text-center',
            {
              id: `farm${plannet}${farm}${p}`,
              type: 'number',
              style: 'width: 80px',
              placeholder: '0',
              min: '0',
              value: portalPanel.dataLinkage[`farm${plannet}${farm}${p}`],
            },
          )
          portalPanel[`farm${plannet}${farm}${p}`] = e
          e.addEventListener('change', portalPanel.updateFunction)

          cell.append(e)
          row.appendChild(cell)
        })
        const time = createElement('span', '', {
          id: `farm${plannet}${farm}time`,
        })
        time.setAttribute('data-bs-toggle', 'tooltip')
        time.setAttribute('data-bs-title', ' ')
        portalPanel[`farm${plannet}${farm}time`] = time
        const timeTd = createElement('td', 'font-normal')
        timeTd.appendChild(time)
        row.appendChild(timeTd)

        tbody.appendChild(row)

        const row2 = createElement('tr')
        row2.appendChild(createElement('td', '', { colSpan: 3 }))
        const mat = createElement('td', 'data-material font-normal', {
          id: `farm${plannet}${farm}mat`,
          colSpan: 5,
        })
        portalPanel[`farm${plannet}${farm}mat`] = mat
        row2.appendChild(mat)

        tbody.appendChild(row2)
      }
    }

    section.appendChild(table)

    const assignButton = createElement(
      'button',
      'btn btn-secondary',
      {
        type: 'button',
        style: 'display: block; margin: 20px auto; min-width: 300px',
      },
      'Maximize Mission Rate',
    )
    assignButton.addEventListener('click', maximizeMissionRate)
    section.append(assignButton)

    const clearButton = createElement(
      'button',
      'btn btn-secondary',
      {
        type: 'button',
        style: 'display: block; margin: 20px auto; min-width: 300px',
      },
      'Clear Missions',
    )
    clearButton.addEventListener('click', clearMissions)
    section.append(clearButton)

    return section
  }

  const createResult = () => {
    const section = createElement('div', 'section-3')
    section.appendChild(createElement('h3', null, null, 'Result'))

    const unit = createElement('div', 'row g-3')
    unit.innerHTML =
      '<div class="col-auto"><label class="col-form-label">duration</label></div>'
    const col = createElement('div', 'col-auto')
    unit.appendChild(col)
    const select = createElement('select', 'form-select', {
      id: 'duration',
    })
    select.innerHTML = durationOptions
      .map(([v, l]) => `<option value="${v}">${l}</option>`)
      .join('')
    select.value = playerData.academy.farmYieldSelected || '1-h'
    select.addEventListener('change', portalPanel.updateFunction)
    portalPanel['duration'] = select
    col.appendChild(select)
    section.appendChild(unit)

    const table = document.createElement('table')
    table.className = 'table table-borderless'
    table.style = 'margin-top: 20px'
    table.innerHTML =
      '<thead><tr><th></th><th class="text-center">Stock</th><th class="text-center">Yield</th></tr></thead>'

    const tbody = document.createElement('tbody')
    table.appendChild(tbody)

    const rowData = [
      ['Missions', null, 'missionyield'],
      ['Difar', 'difar', 'difaryield'],
      ['Kento', 'kento', 'kentoyield'],
      ['Chromium', 'chromium', 'chromiumyield'],
      ['Exon', 'exon', 'exonyield'],
      ['Organium', 'organium', 'organiumyield'],
      ['Adamorphium', 'adamorphium', 'adamorphiumyield'],
      ['Moskom', 'moskom', 'moskomyield'],
      ['Darkseid', 'darkseid', 'darkseidyield'],
    ]
    rowData.forEach(([label, input, display]) => {
      const row = createElement('tr')
      row.appendChild(createElement('td', 'text-end', null, label))

      if (input) {
        const td = createElement('td')
        const e = createElement('input', 'form-control text-center', {
          id: input,
          type: 'text',
          style: 'width: 110px',
          value: portalPanel.dataLinkage[input],
        })
        e.addEventListener('change', portalPanel.updateFunction)
        td.appendChild(e)
        row.appendChild(td)
      } else {
        row.appendChild(createElement('td'))
      }

      const d = createElement('td', 'text-end font-normal', {
        id: display,
      })
      portalPanel[display] = d
      row.appendChild(d)

      tbody.appendChild(row)
    })

    section.appendChild(table)

    return section
  }

  const createZeusRank = () => {
    const section = createElement('div', 'section-3')
    const zeusRankToggle = $('<input type="checkbox" name="showallranks">')
    $(section).append(
      $('<div>')
        .addClass('d-flex flex-row align-items-center justify-content-between')
        .append($('<h3>').text('Zeus'))
        .append($('<label>').text(' Show All').prepend(zeusRankToggle)),
    )
    zeusRankToggle.on('change', populateYield)

    const zeust = createElement('table', 'table table-borderless', {
      style: 'width: 100%; margin-top: 20px',
    })
    const zeusBody = createElement('tbody')
    portalPanel.zeusTable = zeusBody
    zeust.appendChild(zeusBody)

    section.appendChild(zeust)

    const rankt = createElement('table', 'table table-borderless', {
      style: 'margin-top: 20px',
    })
    rankt.innerHTML = `
            <thead><tr>
                <th>Rank</th>
                <th class="text-center">Req</th>
                <th class="text-center">Time</th>
                <th class="text-center">Total</th>
            </tr></thead>`
    const rankBody = createElement('tbody')
    portalPanel.rankTable = rankBody
    rankt.appendChild(rankBody)

    section.appendChild(rankt)

    return section
  }

  const createContribution = () => {
    const section = createElement('div', 'section-3', { id: 'section-contrib' })
    section.appendChild(createElement('h3', null, null, 'Contribution'))

    try {
      const options = [
        { value: '-', label: 'None' },
        { value: '11', label: '1-1' },
        { value: '12', label: '1-2' },
        { value: '13', label: '1-3' },
        { value: '14', label: '1-4' },
        { value: '21', label: '2-1' },
        { value: '22', label: '2-2' },
        { value: '23', label: '2-3' },
        { value: '24', label: '2-4' },
        { value: '31', label: '3-1' },
        { value: '32', label: '3-2' },
        { value: '33', label: '3-3' },
        { value: '34', label: '3-4' },
        { value: '41', label: '4-1' },
        { value: '42', label: '4-2' },
        { value: '43', label: '4-3' },
        { value: '44', label: '4-4' },
      ]

      const filter = $(
        '<div class="btn-group" role="group" style="margin-bottom: 20px;">',
      ).append(
        options.map(({ value, label }) => {
          return $(
            `<input type="radio" class="btn-check" name="contrib-farm" value=${value} id="contrib-farm${value}" ${
              value === '-' ? 'checked' : ''
            }>
                    <label class="btn btn-outline-secondary" for="contrib-farm${value}">${label}</label>`,
          )
        }),
      )

      $('<form id="contrib-filter">')
        .append(filter)
        .appendTo(section)
        .on('change', function () {
          const className = 'table-secondary'
          const farmfilter = $("input[name = 'contrib-farm']:checked").val()
          $('#section-contrib')
            .find('tr.contrib-row')
            .removeClass(className)
            .end()
            .find(`tr.contrib-row-${farmfilter}`)
            .addClass(className)
            .end()
        })
    } catch (e) {
      console.error(e)
    }

    const flexWrapper = createElement('div', null, {
      style:
        'display: flex; flex-direction: row; flex-wrap: wrap; gap: 20px; max-width: 700px; justify-content: space-around;',
    })
    section.appendChild(flexWrapper)

    const list = [
      { id: 'missionProd', title: 'Mission Count' },
      { id: 'apProd', title: 'AP' },
      { id: 'difarProd', title: 'Difar' },
      { id: 'kentoProd', title: 'Kento' },
      { id: 'chromiumProd', title: 'Chromium' },
      { id: 'exonProd', title: 'Exon' },
      { id: 'organiumProd', title: 'Organium' },
      { id: 'adamorphiumProd', title: 'Adamorphium' },
      { id: 'moskomProd', title: 'Moskom' },
      { id: 'darkseidProd', title: 'Darkseid' },
    ]

    list.forEach(({ id, title }) => {
      const wrapper = createElement('div')
      wrapper.appendChild(createElement('h5', null, null, title))
      const table = createElement('table', 'table table-borderless', {
        id: `${id}Table`,
        style: 'margin-top: 20px',
      })
      table.innerHTML = `
                <thead><tr>
                    <th class="text-center col-farmname">Farm</th>
                    <th class="text-end col-contrib">Contri.</th>
                    <th class="text-end col-percent">%</th>
                </tr></thead>`
      const body = createElement('tbody')
      portalPanel[id] = body
      table.appendChild(body)

      wrapper.appendChild(table)

      flexWrapper.appendChild(wrapper)
    })

    return section
  }

  flex.appendChild(createPersonel())
  flex.appendChild(createFarms())
  flex.appendChild(createResult())
  flex.appendChild(createZeusRank())
  flex.appendChild(createContribution())
  panel.appendChild(flex)

  PopulateTiming()
  populateYield()

  initTooltips()
}

academyFarmPortal.pages.default.updateFunction = function (e) {
  if (e.target.id.includes('lock')) {
    portalPanel.dataLinkage[e.target.id] = e.target.checked
    SavePlayerData()
    return
  }

  if (e.target.id.includes('duration')) {
    portalPanel.dataLinkage[e.target.id] = e.target.value
    SavePlayerData()

    PopulateTiming()
    populateYield()

    return
  }

  if (e.target.id.includes('power')) {
    portalPanel.dataLinkage[e.target.id] = parseFloat(e.target.value)
    SavePlayerData()

    PopulateTiming()
    populateYield()

    return
  }

  if (e.target.type === 'number') {
    portalPanel.dataLinkage[e.target.id] = parseInt(e.target.value)
    SavePlayerData()

    PopulateTiming()
    populateYield()

    return
  }

  let value = parseBigNum(e.target.value)
  if (isNaN(value)) {
    e.target.value = 0
  } else {
    portalPanel.dataLinkage[e.target.id] = value
  }
  SavePlayerData()

  populateYield()
}

function PopulateTiming() {
  let farmData = CalculateFarmTimes()
  const matBonus = GetCurrentMatBonus()

  for (let planet = 0; planet < GameDB.academy.planets; planet++) {
    for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
      const farmInfo = GameDB.academy.farms[planet * GameDB.academy.farms_number + farm]
      const maxPersonnel = farmInfo.maxPop
      let datum = farmData[planet * GameDB.academy.farms_number + farm]

      const totalEl = portalPanel[`farm${planet}${farm}total`]
      totalEl.innerText = datum.personnel
      totalEl.setAttribute('data-bs-title', `Max: ${maxPersonnel}`)
      totalEl.style.color =
        datum.personnel > maxPersonnel ? 'var(--bs-danger-text-emphasis)' : ''
      totalEl.classList.toggle('has-tip', datum.personnel > maxPersonnel)
      const timeEl = portalPanel[`farm${planet}${farm}time`]
      timeEl.innerText = datum.time
      timeEl.classList.toggle('is-capped', datum.isCapped)
      timeEl.setAttribute('data-bs-title', datum.rawTime || '-')
      portalPanel[`farm${planet}${farm}mat`].innerText = farmInfo.baseMats
        .map((a, i, arr) => {
          if (a === 0) return null

          const isLast = i === arr.length - 1
          const mat = isLast ? a : matBonus * a

          return (
            GameDB.academy.materials[i] +
            ': ' +
            formatLargeInteger(mat)
          )
        })
        .filter(Boolean)
        .join(', ')

    }
  }
}

function maximizeMissionRate() {
  GetMaxMissionRate()

  for (let planet = 0; planet < GameDB.academy.planets; planet++) {
    for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
      for (let personnel = 0; personnel < 4; personnel++) {
        let type = GameDB.academy.personnel[personnel]
        portalPanel[`farm${planet}${farm}${type}`].value =
          portalPanel.dataLinkage[`farm${planet}${farm}${type}`]
      }
    }
  }

  populateYield()
  PopulateTiming()
}

function clearMissions() {
  for (let planet = 0; planet < GameDB.academy.planets; planet++) {
    for (let farm = 0; farm < GameDB.academy.farms_number; farm++) {
      if (playerData.academy.farms[planet][farm].locked) continue

      for (let personnel = 0; personnel < 4; personnel++) {
        let type = GameDB.academy.personnel[personnel]
        portalPanel.dataLinkage[`farm${planet}${farm}${type}`] = 0
        portalPanel[`farm${planet}${farm}${type}`].value = 0
      }
    }
  }

  SavePlayerData()
  populateYield()
  PopulateTiming()
}

function populateYield() {
  let yieldData = CalculateFarmYields()
  // console.log(yieldData)
  let duration = yieldData.duration

  const fragWield = yieldData.matYield[8]

  yieldData.matYield = yieldData.matYield.map((yieldValue) =>
    formatLargeInteger(yieldValue),
  )

  portalPanel.missionyield.innerText = formatInteger(yieldData.missionYield)
  portalPanel.difaryield.innerText = yieldData.matYield[0]
  portalPanel.kentoyield.innerText = yieldData.matYield[1]
  portalPanel.chromiumyield.innerText = yieldData.matYield[2]
  portalPanel.exonyield.innerText = yieldData.matYield[3]
  portalPanel.organiumyield.innerText = yieldData.matYield[4]
  portalPanel.adamorphiumyield.innerText = yieldData.matYield[5]
  portalPanel.moskomyield.innerText = yieldData.matYield[6]
  portalPanel.darkseidyield.innerText = yieldData.matYield[7]

  try {
    const apContrib = Object.entries(yieldData.missionContrib).reduce(
      (o, [f, c]) => {
        o[f] =
          c *
          (GameDB.academy.farms.find((ff) => ff.id.toString() === f)?.baseAP ||
            0)
        return o
      },
      {},
    )

    genZeusRank(yieldData.missionYield, duration, fragWield)
    genProduction(portalPanel.missionProd, yieldData.missionContrib)
    genProduction(portalPanel.apProd, apContrib)
    genProduction(portalPanel.difarProd, yieldData.matContrib[0])
    genProduction(portalPanel.kentoProd, yieldData.matContrib[1])
    genProduction(portalPanel.chromiumProd, yieldData.matContrib[2])
    genProduction(portalPanel.exonProd, yieldData.matContrib[3])
    genProduction(portalPanel.organiumProd, yieldData.matContrib[4])
    genProduction(portalPanel.adamorphiumProd, yieldData.matContrib[5])
    genProduction(portalPanel.moskomProd, yieldData.matContrib[6])
    genProduction(portalPanel.darkseidProd, yieldData.matContrib[7])
  } catch (e) {
    console.error(e)
  }
}

function genZeusRank(missionCount, duration, yield_hour) {
  const zeusReqs = GameDB.fleet.zeus.rankRequirements
  const zeusTable = $(portalPanel.zeusTable)
  const container = $(portalPanel.rankTable)
  zeusTable.html('')
  container.html('')

  const numMissionPerHr = (missionCount / duration) * 3600
  const missionRate = $('<tr>')
    .append($('<td>').text('Mission Rate'))
    .append(
      $('<td>')
        .addClass('text-end font-normal')
        .text(formatInteger(numMissionPerHr) + ' / hr'),
    )
  zeusTable.append(missionRate)
  if (playerData.ouro.enabled) {
    BonusDebugger.group('Fragments rate');

    const fragFromMissionPerHr = numMissionPerHr * (0.001 + 0.001 * (playerData.relics.relic5 || 0) + 0.0001 * (playerData.gadgets.gadget12 || 0) + 0.0005 * (Math.floor(playerData.gadgets.gadget12  / 10) || 0))
    BonusDebugger.log('Fragments from mission per hour', fragFromMissionPerHr, 'FRAG');
    const fragFromfarmMissions = yield_hour
    BonusDebugger.log('Fragments from farm missions', fragFromfarmMissions, 'FRAG');
    const fragmentationIAPBonus = (playerData.diamonds.iapFragmentation ? 1.1 : 1);
    BonusDebugger.log('Fragmentation bonus', fragmentationIAPBonus, 'FRAG');
  
    const totalRelicFragPerHr = (fragFromMissionPerHr + fragFromfarmMissions) * fragmentationIAPBonus;

    BonusDebugger.log('Total fragments rate per hour', totalRelicFragPerHr, 'TOTAL');
    BonusDebugger.groupEnd();
      zeusTable.append(
      $('<tr>')
        .append($('<td>').text('Relic Fragment'))
        .append(
          $('<td>')
            .addClass('text-end font-normal')
            .text(formatFloat(totalRelicFragPerHr) + ' / hr'),
        ),
    )
    zeusTable.append(
      $('<tr>')
        .append('<td>')
        .append(
          $('<td>')
            .addClass('text-end font-normal')
            .text(formatFloat(totalRelicFragPerHr * 24) + ' / d'),
        ),
    )
  }

  let missionLeft = missionCount
  let rankProgress = playerData.fleet.zeus.rank.progress
  let yieldRank = playerData.fleet.zeus.rank.current

  let maxRows = 10
  let showAllRanks = $('[name=showallranks]').prop('checked')

  let totalTime = 0

  while (maxRows-- > 0 || showAllRanks) {
    let requirement = zeusReqs[yieldRank]

    if (!requirement) break

    if (rankProgress > 0) {
      requirement -= rankProgress
      rankProgress = 0
    }

    missionLeft -= requirement
    yieldRank++
    // console.log('missionLeft', missionLeft)
    // console.log('requirement', requirement)

    const row = createElement('tr')
    row.appendChild(createElement('td', '', null, yieldRank))
    const time = (requirement / missionCount) * duration
    row.appendChild(
      createElement(
        'td',
        'text-end font-normal',
        null,
        formatInteger(requirement),
      ),
    )
    row.appendChild(
      createElement('td', 'text-end font-normal', null, formatDuration(time)),
    )
    totalTime += time
    row.appendChild(
      createElement(
        'td',
        'text-end font-normal',
        null,
        formatDuration(totalTime),
      ),
    )

    container.append($(row))
  }
}

function genProduction(table, contrib) {
  try {
    const farms = Object.keys(contrib).sort((a, b) => (a < b ? -1 : 1))
    const total = Object.values(contrib).reduce((a, v) => a + v, 0)

    table.innerHTML = ''

    if (farms.length === 0) {
      table.innerHTML = '' // TODO
      return
    }

    farms.forEach((farm) => {
      const c = contrib[farm]

      if (c === 0) return

      const row = createElement('tr', `contrib-row contrib-row-${farm}`)
      const farmname = createElement(
        'td',
        'text-center col-farmname',
        null,
        farm.split('').join('-'),
      )
      const value = createElement(
        'td',
        'text-end col-contrib font-normal',
        null,
        formatLargeInteger(c),
      )
      const percent = createElement(
        'td',
        'text-end col-percent font-normal',
        null,
        ((c / total) * 100).toFixed(2) + '%',
      )
      // const eff = createElement('td', 'text-end')

      row.appendChild(farmname)
      row.appendChild(value)
      row.appendChild(percent)
      // row.appendChild(eff)
      table.appendChild(row)
    })
  } catch (e) {
    console.error(e)
  }
}
