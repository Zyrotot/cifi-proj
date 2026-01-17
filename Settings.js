let settingsPortal = {
  pages: {
    default: {
      initFunction: initSettings,
      updateFunction: updateSettings,
    },
  },
}

settingsPortal.pages.default.dataLinkage = {
  set academyproj0(value) {
    playerData.colorProfile.academyProjects[0] = value
  },
  set academyproj1(value) {
    playerData.colorProfile.academyProjects[1] = value
  },
  set academyproj2(value) {
    playerData.colorProfile.academyProjects[2] = value
  },
  set academyproj3(value) {
    playerData.colorProfile.academyProjects[3] = value
  },

  get academyproj0() {
    return playerData.colorProfile.academyProjects[0]
  },
  get academyproj1() {
    return playerData.colorProfile.academyProjects[1]
  },
  get academyproj2() {
    return playerData.colorProfile.academyProjects[2]
  },
  get academyproj3() {
    return playerData.colorProfile.academyProjects[3]
  },
}

const createButton = (label) => {
  return createElement(
    'button',
    'btn btn-secondary',
    {
      type: 'button',
      style: 'display: block; margin: 20px auto; min-width: 340px',
    },
    label,
  )
}

const pad = (number, length = 2) => {
  return `${number}`.padStart(length, '0')
}

const saveSettings = () => {
  const link = createElement('a')
  const file = new Blob([JSON.stringify(playerData)], { type: 'text/plain' })
  link.href = URL.createObjectURL(file)
  const date = new Date()
  link.download = `cifiprojplanner-${date.getFullYear()}${pad(
    date.getMonth() + 1,
  )}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(
    date.getSeconds(),
  )}.txt`
  link.click()
  URL.revokeObjectURL(link.href)
}

const loadSettings = (e) => {
  const loadFile = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type && !file.type.startsWith('text/')) {
        reject()
        return
      }

      const reader = new FileReader()
      reader.addEventListener('load', (event) => {
        try {
          const rawData = event.target.result
          const data = JSON.parse(rawData)
          if (!data.version) {
            reject()
            return
          }

          delete data.activePortal
          SavePlayerData(data)
          resolve()
        } catch (e) {
          console.error(e)
          reject()
        }
      })
      reader.readAsText(file)
    })
  }

  loadFile(e.target.files[0])
    .then(() => location.reload())
    .catch(() => alert('Load failed!'))
}

const resetSettings = () => {
  if (confirm('Sure?')) {
    ResetPlayerData()
    location.reload()
  }
}

function initSettings(panel) {
  const wrapper = createElement('div', 'section-2')
  panel.appendChild(wrapper)

  const colorProfiles = [
    {
      id: 'academyproj0',
      label: 'Unaffordable',
      value: playerData.colorProfile.academyProjects[0],
    },
    {
      id: 'academyproj1',
      label: 'Theoretical',
      value: playerData.colorProfile.academyProjects[1],
    },
    {
      id: 'academyproj2',
      label: 'Affordable',
      value: playerData.colorProfile.academyProjects[2],
    },
    {
      id: 'academyproj3',
      label: 'Selected',
      value: playerData.colorProfile.academyProjects[3],
    },
  ]

  $('<div>')
    .addClass('section-3')
    .append('<h3>Project Plan Color</h3>')
    .append(
      $(
        '<table class="table" style="width: 100%; --bs-table-bg: transparent">',
      ).append(
        $('<tbody>').append(
          colorProfiles.map((profile) => {
            return $('<tr>')
              .append(
                $('<td>').append(
                  $('<label class="form-label mb-0"></label>')
                    .attr('for', profile.id)
                    .text(profile.label),
                ),
              )
              .append(
                $('<td width="1%">').append(
                  $(
                    '<input type="color" class="form-control form-control-color">',
                  )
                    .attr('id', profile.id)
                    .val(profile.value),
                ),
              )
          }),
        ),
      ),
    )
    .append(
      $('<button>')
        .addClass('btn btn-secondary')
        .text('Reset')
        .click(resetColors),
    )
    .appendTo(wrapper)

  const section = createElement('div', 'section-3')
  wrapper.appendChild(section)

  const header = createElement('h3')
  header.innerHTML = 'Save/Load'
  section.appendChild(header)

  const fileinput = createElement('input', '', {
    id: 'fileinput',
    type: 'file',
    style: 'display: none',
    accept: '.txt,.json',
  })
  section.appendChild(fileinput)
  // const load = createElement('label', 'form-label', null, 'Load Data and Reload app')
  const load = createButton('Import Settings')
  const save = createButton('Export Settings')
  const reset = createButton('Reset Settings')

  load.addEventListener('click', () => fileinput.click())
  fileinput.addEventListener('change', loadSettings)
  save.addEventListener('click', saveSettings)
  reset.addEventListener('click', resetSettings)

  section.appendChild(load)
  section.appendChild(save)
  section.appendChild(reset)

  const creditsList = $('<ul class="list-unstyled">')

  CONTRIBUTORS.forEach((c) => {
    const line = $('<li>')

    if (c.page) {
      line.append(
        $('<a>')
          .attr('href', c.page)
          .attr('target', '_blank')
          .text(c.name),
      )
    } else {
      line.text(c.name)
    }

    if (c.role) {
      line.append(` — ${c.role}`)
    }

    if (c.github) {
      line.append(
        ' (',
        $('<a>')
          .attr('href', c.github)
          .attr('target', '_blank')
          .text('GitHub'),
        ')',
      )
    }

    creditsList.append(line)
  })

  $('<div>')
    .addClass('section-3')
    .append($('<h3>Credits</h3>').addClass('mb-4'))
    .append(
      $('<div class="font-normal">')
        .append($('<div class="font-normal">').append(creditsList))
        .append($('<p>Status: maintained</p>'))
        .append(
          $(
            '<p><a href="https://github.com/Zyrotot/cifi-proj/pulls" target="_blank">Pull requests</a>' +
            ' are welcome. You can also fork for your own version. :)</p>',
          ),
        ),
    )
    .appendTo(wrapper)

  $('input[type=color]').change(selectColor)
}

function updateSettings() {}

function selectColor(e) {
  portalPanel.dataLinkage[e.target.id] = e.target.value
  SavePlayerData()
}

function resetColors() {
  portalPanel.dataLinkage.academyproj0 = '#444444'
  portalPanel.dataLinkage.academyproj1 = '#CCCC44'
  portalPanel.dataLinkage.academyproj2 = '#44CC44'
  portalPanel.dataLinkage.academyproj3 = '#4444CC'

  SavePlayerData()
  location.reload()
}
