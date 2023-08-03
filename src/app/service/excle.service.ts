import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  exportToExcel(data: any[], fileName: string): void {
    // Define the column name mapping
    const columnMapping: { [key: string]: string } = {
      'firstName': 'Ime',
      'lastName': 'Prezime',
      'dateofBirth': 'Datum rođenja',
      'gender': 'Pol',
      'ekv': 'ekv',
      'tsr': 'tsr',
      'hr': 'hr',
      'pr': 'pr',
      'pMax': 'pMax',
      'pMin': 'pMin',
      'pwd': 'pwd',
      'ptf': 'ptf',
      'qrs': 'qrs',
      'qt': 'qt',
    };

    // Create a copy of the original data with renamed column names
    const dataCopy = data.map(item => {
      const newItem: any = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && columnMapping.hasOwnProperty(key)) {
          newItem[columnMapping[key]] = item[key];
        }
      }
      return newItem;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataCopy);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName + '.xlsx');
  }
}
