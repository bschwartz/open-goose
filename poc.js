(function($) {
  $(function() {
    $("#list_files").click(function(e) {
      e.preventDefault();
      goose.readDir("/", function(files) {
        var fileNames = [];
        for (var i = 0; i < files.length; i++) {
          fileNames.push(files[i].name);
        }
        alert(fileNames.join("\n"));
      });
    });

    $("#read_file").click(function(e) {
      e.preventDefault();
      var filePath = prompt("Enter the file path to read");
      goose.readFile(filePath, function(data) {
        alert(data);
      });
    });

    $("#new_folder").click(function(e) {
      e.preventDefault();
      var folderPath = prompt("Enter the folder path to create");
      goose.createFolder(folderPath, function(fileStat) {
        alert("created " + fileStat.name);
      });
    });

    $("#write_file").click(function(e) {
      e.preventDefault();
      var filePath = prompt("Enter the file path to write");
      goose.writeFile(filePath, $("#file_contents").val(), function(fileStat) {
        alert("updated " + fileStat.name);
      });
    });
  });
}(jQuery));
