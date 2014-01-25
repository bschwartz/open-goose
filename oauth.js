window.dbClient = new Dropbox.Client({ key: '5v5xqo9fafwtm7h' });

dbClient.authenticate({ interactive: false }, function (error) {
  if (error) {
    alert('Authentication error: ' + error);
  }
});

if (dbClient.isAuthenticated()) {
  console.log('authenticated');
}

dbClient.authenticate();
