const path = require("path");

module.exports = {
    entry: {
        scripts: "./scripts/main.js",
        content_scripts: "./scripts/content_script.js",
        popup: "./popup/mainmenu.js",
        selector: "./selector/panel.js"
    },
    node: {
        fs: 'empty'
      },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
