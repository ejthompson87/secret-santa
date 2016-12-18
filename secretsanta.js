var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the Gmail API.
  authorize(JSON.parse(content), sendMessage);
});

function person(name, email) {
    this.name = name;
    this.email = email;
}

var person1 = new person ('ADD NAME', 'ADD EMAIL');
var person2 = new person ('ADD NAME', 'ADD EMAIL');
var person3 = new person ('ADD NAME', 'ADD EMAIL');
var person4 = new person ('ADD NAME', 'ADD EMAIL');
var person5 = new person ('ADD NAME', 'ADD EMAIL');
var person6 = new person ('ADD NAME', 'ADD EMAIL');

// remember to add/remove personN to this array if have more or less than 6 people
var toOriginal = [person1, person2, person3, person4, person5, person6];

var to = shuffle(toOriginal);
var fromE = 'ADD YOUR EMAIL';
var subject = 'Kris Kringle';
var limit = 'ADD SPENDING LIMIT';

// Email content
var makeMessage = function (toName, KK) {
    return 'Hi ' + toName + ',\n' 
        + 'You will be purchasing a gift for ' + KK + '!\n' 
        + 'Spending limit is ' + limit + '.\n'
        + 'Merry Christmas!';
} 

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
}


function sendMessage(auth) {
    for (index = 0; index < to.length; index++) {
        setTimeout((function(i) {
            return function() {
                var toName = to[i].name;
                var KK;
                if (i === to.length-1) {
                    KK = to[0].name;
                } else {
                    KK = to[i+1].name;
                }
                var raw = makeBody(to[i].email, fromE, subject, makeMessage(toName, KK));
                
                var gmail = google.gmail('v1');
                gmail.users.messages.send({
                    auth: auth,
                    userId: 'me',
                    resource: {
                        raw: raw
                    }
                }, function(err, response) {
                    if (err){
                        console.log("Error: " + err);
                        return;
                    }
                    console.log("Done!");
                });
            }
        }) (index), 10000*index);
    }
}

// Create an OAuth2 client with the given credentials, and then execute the given callback function.
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}


// Store token to disk be used in later program executions.
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

// Randomly shuffles array - using Fisher-Yates Shuffle
function shuffle(array) {
  var m = array.length, t, i;
  while (m > 0) 
  {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

