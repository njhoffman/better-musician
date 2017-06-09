const settingCommands = { };

export default {
  url: 'http://localhost:3000/settings',
  commands: [settingCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
