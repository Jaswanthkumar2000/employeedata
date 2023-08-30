import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
  employeeForm : FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor ( private formbuilder: FormBuilder,
  private api : ApiService){}
 
ngOnInit(): void{
  this.employeeForm = this.formbuilder.group({
  employeeId : ["",Validators.required],
  firstName : ["",[Validators.required]],
  lastName : ["",Validators.required],
  gmail : ["",Validators.required], 
  phonenumber : ["",Validators.required],
  salary : ["",Validators.required]
  })
    this.getAllEmployee();
}

get f() { return this.employeeForm.controls; }


onSubmit() {
  // stop here if form is invalid
  if (this.employeeForm.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeForm.value))
}

clickAddEmployee(){
  this.employeeForm.reset();
  this.showAdd = true;
  this.showUpdate = false;
}

postEmployeeDetails(){
 this.employeeModelObj.firstName = this.employeeForm.value.firstName;
  this.employeeModelObj.lastName = this.employeeForm.value.lastName;
  this.employeeModelObj.gmail = this.employeeForm.value.gmail;
  this.employeeModelObj.phonenumber = this.employeeForm.value.phonenumber;
  this.employeeModelObj.salary = this.employeeForm.value.salary;
  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee added successfully")
    let ref = document.getElementById("cancel");
    ref?.click();
    this.employeeForm.reset();
    this.getAllEmployee();
  }, 
  err=>{
    alert("something went wrong");
  })
}  

getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData = res;
})
}
deleteEmployee(row :  any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee Deleted");
    this.getAllEmployee();
  })
}

onEdit(row:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeeModelObj.employeeId = row.id;
  this.employeeForm.controls["firstName"].setValue(row.firstName);
  this.employeeForm.controls["lastName"].setValue(row.lastName);
  this.employeeForm.controls["gmail"].setValue(row.gmail);
  this.employeeForm.controls["phonenumber"].setValue(row.phonenumber);
  this.employeeForm.controls["salary"].setValue(row.salary);

}
updateEmployeeDetails(){
  this.employeeModelObj.firstName = this.employeeForm.value.firstName;
  this.employeeModelObj.lastName = this.employeeForm.value.lastName;
  this.employeeModelObj.gmail = this.employeeForm.value.gmail;
  this.employeeModelObj.phonenumber = this.employeeForm.value.phonenumber;
  this.employeeModelObj.salary = this.employeeForm.value.salary; 
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.employeeId)
  .subscribe(res=>{
    alert("updated succesfully")
    let ref = document.getElementById("cancel");
    ref?.click();
    this.employeeForm.reset();
    this.getAllEmployee();
  })
}
}
