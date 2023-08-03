import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientService } from './service/patient.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ExportService } from './service/excle.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  patient: any[] = [];

  displayedColumns: string[] = [
    'firstName', 
    'lastName', 
    'dateofBirth', 
    'gender',
    'ekv',
    'tsr',
    'hr',
    'pr',
    'pMax',
    'pMin',
    'pwd',
    'ptf',
    'qrs',
    'qt',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private _dialog: MatDialog, 
    private _patService: PatientService,
    private _coreService: CoreService,
    private httpClient: HttpClient,
    private exportService: ExportService) {}

  exportDataToExcel(): void {
    this.httpClient.get<any[]>('http://localhost:3000/patient').subscribe(
      data => {
        this.exportService.exportToExcel(data, 'exported_data');
      },
      error => {
        console.error('Error fetching data from db.json', error);
      }
    );
  }

  ngOnInit(): void {
    this.getPatient();
  }

  openAddEditPatFrom () {
    const dialogRef = this._dialog.open(PatientAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getPatient();
        }
      }
    })
  }

  getPatient() {
    this._patService.getPatient().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePatient(id: number) {
    this._patService.deletePatient(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Bitch you deleted the patient!',"Done");
        this.getPatient();
      },
      error: console.log
    })
  }

  openEditPatFrom (data:any) {
    const dialogRef = this._dialog.open(PatientAddComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getPatient();
        }
      }
    });
  }


}
