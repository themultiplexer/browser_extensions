const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./scripts/main.js",
        popup: "./popup/mainmenu.js",
        selector: "./selector/panel.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
