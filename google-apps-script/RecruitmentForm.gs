/**
 * ACE Recruitment Form — Google Apps Script backend.
 *
 * DEPLOYMENT (do this while signed in as ace@svce.ac.in):
 * 1. Go to sheets.google.com and create a new spreadsheet, e.g. "ACE Recruitment 2026".
 * 2. Extensions > Apps Script. Delete the placeholder code and paste this whole file in.
 * 3. Click Deploy > New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me (ace@svce.ac.in)"
 *    - Who has access: "Anyone"
 * 4. Click Deploy, authorize the requested permissions, and copy the Web app URL.
 * 5. In the website project, put that URL in .env as:
 *      VITE_RECRUITMENT_SHEET_URL=<the web app URL>
 *    Then rebuild/redeploy the site.
 * 6. Every submission appends a row to the "Responses" sheet and emails
 *    a confirmation to the applicant's college email address, sent from
 *    ace@svce.ac.in.
 *
 * If you ever change the form fields, update both the frontend (src/pages/Join.tsx)
 * and the HEADERS / row-building below to match. Note: HEADERS is only written to
 * row 1 when the sheet is empty — if you're updating an existing sheet, manually
 * fix up the header row (or clear the sheet) after changing this array.
 */

var HEADERS = [
  "Timestamp",
  "Name",
  "College Email",
  "Personal Email",
  "Phone Number",
  "Registration Number",
  "Year of Study",
  "Section",
  "Programme",
  "Gender",
  "Day Scholar / Hosteller",
  "Role Preference 1",
  "Justification 1",
  "Role Preference 2",
  "Justification 2",
  "Drive Link",
  "Coding Languages",
];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Responses");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  var p = e.parameter;

  sheet.appendRow([
    new Date(),
    p.name || "",
    p.collegeEmail || "",
    p.personalEmail || "",
    p.phoneNumber || "",
    p.registrationNumber || "",
    p.yearOfStudy || "",
    p.section || "",
    p.programme || "",
    p.gender || "",
    p.residency || "",
    p.rolePreference1 || "",
    p.justification1 || "",
    p.rolePreference2 || "",
    p.justification2 || "",
    p.driveLink || "",
    p.codingLanguages || "",
  ]);

  if (p.collegeEmail) {
    try {
      MailApp.sendEmail({
        to: p.collegeEmail,
        subject: "ACE Recruitment — Application Received",
        body:
          "Hi " + (p.name || "") + ",\n\n" +
          "We've received your application to join ACE for the following roles:\n\n" +
          "Preference 1: " + (p.rolePreference1 || "") + "\n" +
          "Preference 2: " + (p.rolePreference2 || "") + "\n\n" +
          "We'll reach out on this email once shortlisting begins. If anything in your " +
          "application needs correcting, just reply to this email.\n\n" +
          "— ACE, Sri Venkateswara College of Engineering",
      });
    } catch (err) {
      // Don't fail the submission just because the confirmation email bounced.
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
