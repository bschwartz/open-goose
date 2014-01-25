window.dbClient = new Dropbox.Client({ key: '5v5xqo9fafwtm7h' });

dbClient.authenticate({ interactive: false }, function (error) {
  if (error) {
    console.log('Authentication error: ' + error);
  }
});

if (dbClient.isAuthenticated()) {
  console.log('authenticated');
  $(document).ready(function(){
    $('#splash').hide();
    $('#actual_goose').show();
  });
} else {
  $(document).ready(function(){
    $('#splash a.connect').click(function(){
      console.log('hi');
      dbClient.authenticate();
      return false;
    });
  });
}
