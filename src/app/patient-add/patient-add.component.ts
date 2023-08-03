import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from '../service/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CoreService } from '../core/core.service';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {
  
  patForm: FormGroup;
  
  patient: string[] = [
    '<1 Mjesec',
    '1-3 Mjeseci',
    '3-6 Mjeseci',
    '6-12 Mjeseci',
    '>12 Mjeseci'
  ]

  constructor(
    private _fb: FormBuilder, 
    private _dialogRef:MatDialogRef<PatientAddComponent>, 
    private _patService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService,
    private filerSaver:FileSaverService
    ) {
  
    this.patForm = this._fb.group({
      firstName: '',
      lastName: '',
      dateofBirth: '',
      gender: '',
      ekv: '',
      tsr: '',
      hr: '',
      pr: '',
      pMax: '',
      pMin: '',
      pwd: '',
      ptf: '',
      qrs: '',
      qt: '',
    })
  }
/*
  excelExport () {

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    

    const worksheet = XLSX.utils.json_to_sheet(this.data);

    const wb = {
      Sheets: {
        'testingSheet':worksheet
      },
      SheetNames: ['testingSheet']
    }

    const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'});

    const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE});
    this.filerSaver.save(blobData,"demoData")
  }
*/

  ngOnInit(): void {
    this.patForm.patchValue(this.data);
  }

  onFormSubmit( ) {
    if(this.patForm.valid){
      if(this.data) {
        this._patService.updatePatient(this.data.id,this.patForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Successfuly updated!');
            this._dialogRef.close(true);
          },
        error: (err:any) => {
          console.error(err);
          }
        })
      }
      else {
        this._patService.addPatient(this.patForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Heyy you know how to add patients. Good job little one!');
            this._dialogRef.close(true);
          },
        error: (err:any) => {
          console.error(err);
          }
        })
      }
      
    }
  }
}
