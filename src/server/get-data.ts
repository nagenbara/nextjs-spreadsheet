'use server';
import { getSheetData } from './google-sheets.action';

export async function getData() {

    const Auth = await getSheetData();

    try {
        const data = await Auth.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEETID,
            range: 'Sheet1!A:Zs',
        });
        
        return { data: data.data.values };
    } catch (error) {
        console.error('Error getting data from Google Sheets:', error);
        throw error;
    }
}