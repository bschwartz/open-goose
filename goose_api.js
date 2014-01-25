(function() {
  window.goose = {};

  goose.rootDir = "/Open Goose/"

  // Given a directory relative from the root, callback with a list of JSON
  // objects representing each file.
  goose.readDir = function(path, callback) {
    dbClient.readdir(goose.rootDir + path, {}, function(apiError, fileNames, folderStat, fileStats) {
      if (fileStats.contents) {
        callback(fileStats.contents);
      } else {
        callback(fileStats)
      }
    });
  };

  // Given a file path, callback with the data for that file.
  goose.readFile = function(path, callback) {
    dbClient.readFile(goose.rootDir + path, {}, function(apiError, data, rangeInfo) {
      callback(data);
    });
  };

  // Create or update the file. Callback is `fileStat` which represents the
  // state of the updated/new file.
  goose.writeFile = function(path, data, callback) {
    dbClient.writeFile(goose.rootDir + path, {}, function(apiError, fileStat) {
      callback(fileStat);
    });
  };

  goose.createFolder = function(path, callback) {
    dbClient.mkdir(goose.rootDir + path, function(apiError, fileStat) {
      if (callback) {
        callback(fileStat);
      }
    });
  };

  goose.stat = function(path, callback) {
    dbClient.stat(goose.rootDir + path, function(apiError, fileStat) {
      callback(fileStat);
    });
  };

  goose.search = function(filename, callback) {
    dbClient.findByName(goose.rootDir, filename, {}, function(apiError, fileStats) {
      callback(fileStats);
    });
  };
}());
