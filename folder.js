let getFiles = function(folder) {



const fs = require("fs");

let files_folder = [];

fs.readdirSync(folder).forEach((file) => {
    files_folder.push(file);
    }
);
return files_folder;
};


module.exports.getFiles = getFiles;