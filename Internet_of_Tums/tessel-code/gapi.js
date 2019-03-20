const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
// var tessel = require('tessel');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = './app/remote-script/token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, async (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    try {
      const tokenInfo = await oAuth2Client.getTokenInfo(JSON.parse(token).access_token);
    } catch (e) {
      // tessel.leds[0].on();
      console.log(e)
      return getNewToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
// /overlay/upper/app/remote-script/token.json
// /app/remote-script/token.json
// console.log(fs.readdirSync('./'));
// console.log(fs.readdirSync('./app'));
// console.log(fs.readdirSync('./overlay'));
// // console.log(fs.readdirSync('./overlay/remote-script'));
// console.log(fs.readdirSync('./app/remote-script'));

// console.log(fs.readdirSync('./root'));
// console.log(fs.readdirSync('./bin'));
// console.log(fs.readdirSync('./www'));
content = { "installed": { "client_id": "1051818775539-el9al99qa9ni0r1k1t3fcqdq75lor2a9.apps.googleusercontent.com", "project_id": "trash-1536100136605", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://www.googleapis.com/oauth2/v3/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "CVTQcNTQ0sM7_HcF_PmHHl8V", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] } };

// Authorize a client with credentials, then call the Google Sheets API.
authorize(content, append);


async function checkStatus(auth) {
  try {
    const tokenInfo = await auth.getTokenInfo(auth.credentials.access_token);
  } catch (e) {
    console.log(e); // 30
  }
  // let x = auth.getTokenInfo().then(function (y) {
  //   // console.log(y)
  //   console.log('success')
  // }, function (y) {
  //   console.log(Object.keys(y))
  //   console.log(y.code)
  //   console.log(auth.credentials)
  //   // console.log(y.response)
  //   console.log('error')
  // })
}

function append(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.append({
    spreadsheetId: '1dy9jSRMq0NpohZHuZa1W3yDLZBVofZEkO2oaCQqj1iY',
    range: 'Sheet1!A:A',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[new Date().toLocaleTimeString()],] }
  }, (err, result) => {
    if (err) {
      // Handle error.
      console.log(err);
    } else {
      console.log('cells appended.');
    }
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  // tessel.leds[0].on();
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  console.log(auth)

  console.log(x);
  console.log('x');
  sheets.spreadsheets.values.get({
    spreadsheetId: '1dy9jSRMq0NpohZHuZa1W3yDLZBVofZEkO2oaCQqj1iY',
    range: 'Sheet1!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}
