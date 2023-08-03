import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName + '.xlsx');
  }
}





/*import { Injectable } from '@angular/core'; 
import * as XLSX from 'xlsx'; 

const EXCEL_EXTENSION = '.xlsx'; // excel file extension

@Injectable({ providedIn: 'root' }) 

export class ExcelServiceService { 
  constructor () { }

  public exportToExcel (element: any, fileName: string): void {
    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new(); 

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'demoDemo.xlsx'); 
  }
}*/