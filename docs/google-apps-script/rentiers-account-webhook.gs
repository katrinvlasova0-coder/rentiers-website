/**
 * Rentiers Account App → Google Sheets
 *
 * Deploy: script.google.com → New project → paste this file → Deploy → Web app
 * Execute as: Me | Who has access: Anyone
 *
 * Bind the script to a dedicated spreadsheet (Extensions → Apps Script from that file),
 * or set SPREADSHEET_ID below to open a spreadsheet by ID.
 */

var SPREADSHEET_ID = ''; // optional: paste ID from spreadsheet URL if script is standalone

var SHEETS = {
  registration: 'Registrations',
  portfolio: 'Portfolio Applications',
  withdrawal: 'Withdrawals',
};

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#07101f');
    headerRange.setFontColor('#4FC8E8');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function utm_(data, key) {
  return data[key] || '';
}

function writeRegistration_(ss, data) {
  var headers = [
    'Timestamp',
    'Status',
    'First Name',
    'Email',
    'Phone',
    'Consent',
    'Page',
    'Project',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Term',
    'UTM Content',
  ];
  var sheet = getOrCreateSheet_(ss, SHEETS.registration, headers);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    'New',
    data.firstName || '',
    data.email || '',
    data.phone || '',
    data.consent ? 'Yes' : 'No',
    data.page || '',
    data.project || 'rentiers-onboarding',
    utm_(data, 'utm_source'),
    utm_(data, 'utm_medium'),
    utm_(data, 'utm_campaign'),
    utm_(data, 'utm_term'),
    utm_(data, 'utm_content'),
  ]);
}

function writePortfolio_(ss, data) {
  var headers = [
    'Timestamp',
    'Status',
    'Email',
    'Portfolio',
    'Investment Amount (EUR)',
    'Stripe Ref',
    'Page',
    'Project',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Term',
    'UTM Content',
  ];
  var sheet = getOrCreateSheet_(ss, SHEETS.portfolio, headers);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    'New',
    data.email || '',
    data.portfolio || '',
    data.investmentAmount || '',
    data.stripeRef || '',
    data.page || '',
    data.project || 'rentiers-onboarding',
    utm_(data, 'utm_source'),
    utm_(data, 'utm_medium'),
    utm_(data, 'utm_campaign'),
    utm_(data, 'utm_term'),
    utm_(data, 'utm_content'),
  ]);
}

function writeWithdrawal_(ss, data) {
  var headers = [
    'Timestamp',
    'Status',
    'Email',
    'IBAN',
    'Amount (EUR)',
    'Page',
    'Project',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Term',
    'UTM Content',
  ];
  var sheet = getOrCreateSheet_(ss, SHEETS.withdrawal, headers);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    'New',
    data.email || '',
    data.iban || '',
    data.amount || '',
    data.page || '',
    data.project || 'rentiers-onboarding',
    utm_(data, 'utm_source'),
    utm_(data, 'utm_medium'),
    utm_(data, 'utm_campaign'),
    utm_(data, 'utm_term'),
    utm_(data, 'utm_content'),
  ]);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = (data.type || '').toLowerCase();
    var ss = getSpreadsheet_();

    if (type === 'registration') {
      writeRegistration_(ss, data);
    } else if (type === 'portfolio') {
      writePortfolio_(ss, data);
    } else if (type === 'withdrawal') {
      writeWithdrawal_(ss, data);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({
          result: 'error',
          error: 'Unknown type: ' + type,
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'ok' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function testRegistration() {
  doPost({
    postData: {
      contents: JSON.stringify({
        type: 'registration',
        timestamp: new Date().toISOString(),
        firstName: 'Test',
        email: 'test@example.com',
        phone: '+49123456789',
        consent: true,
        page: 'rentiers.net/test/account/register/',
        project: 'rentiers-onboarding',
      }),
    },
  });
}

function testPortfolio() {
  doPost({
    postData: {
      contents: JSON.stringify({
        type: 'portfolio',
        timestamp: new Date().toISOString(),
        email: 'test@example.com',
        portfolio: 'balanced',
        investmentAmount: '10000',
        page: 'rentiers.net/test/account/portfolio/',
      }),
    },
  });
}

function testWithdrawal() {
  doPost({
    postData: {
      contents: JSON.stringify({
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        email: 'test@example.com',
        iban: 'DE89370400440532013000',
        amount: '10000',
        page: 'rentiers.net/test/account/dashboard/',
      }),
    },
  });
}
