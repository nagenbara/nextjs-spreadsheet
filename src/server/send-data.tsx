"use server"
import { getSheetData } from './google-sheets.action';

type formData = {
    name: string,
    email: string,
    message: string
}

export async function sendData(data: formData) {
    try {
        // Dapatkan akses ke Google Sheets
        const auth = await getSheetData();

        // Dapatkan jumlah baris yang sudah terisi
        const response = await auth.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEETID,
            range: 'Sheet1!A:Z', // Menggunakan kolom G untuk mendapatkan jumlah baris yang terisi
            majorDimension: 'COLUMNS'
        });

        
        // Dapatkan data yang akan dikirim ke Google Sheets
        const dataToSend = {
            values: [
                [data.name, data.email, data.message]
            ]
        };
        
        const numRows = response.data.values ? response.data.values[0].length : 0;
        const range = `Sheet1!A${numRows + 1}:Z${numRows + 1 + dataToSend.values.length}`; 
        

        // Kirim data ke Google Sheets
        const insertResponse = await auth.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEETID,
            range: range, // range yang akan diperbarui
            valueInputOption: 'RAW', // tipe input data (misalnya: RAW, USER_ENTERED)
            requestBody: dataToSend
        });

        return insertResponse.data;
    } catch (error) {
        console.error('Error sending data to Google Sheets:', error);
        throw error;
    }
}
