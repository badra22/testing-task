module.exports = {
  src_folders: ["tests"],
  page_objects_path: "page-objects",
  globals_path: "./globals.js",

  webdriver: {
    "start_process": true,
    "server_path": "node_modules/.bin/chromedriver",
    "port": 9515,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName : 'chrome'
      }
    }
  }
}
