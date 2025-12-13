// backend/sheets.js
import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";

type AppendRowsArgs = {
  spreadsheetId: string;
  tabName: string;
  rows: string[][];
};

const SCOPE = ["https://www.googleapis.com/auth/spreadsheets"];

function getSheetsClient() {
  let auth;

  auth = new google.auth.JWT({
    email: process.env.CLIENT_EMAIL!,
    key: process.env.PRIVATE_KEY!,
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  // auth = new google.auth.GoogleAuth({
  //   scopes: SCOPE,
  // });
  return google.sheets({ version: "v4", auth });
}

async function ensureTab({
  sheets,
  spreadsheetId,
  tabName,
}: {
  sheets: any;
  spreadsheetId: string;
  tabName: string;
}) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  const exists = (meta.data.sheets || []).some(
    (s: any) => s?.properties?.title === tabName
  );
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: tabName } } }],
      },
    });
  }
}

export async function appendRows({
  spreadsheetId,
  tabName,
  rows,
}: AppendRowsArgs) {
  const sheets: any = await getSheetsClient();
  await ensureTab({ sheets, spreadsheetId, tabName });
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: rows },
  });
}
