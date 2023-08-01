import { Component,ElementRef,OnInit,TemplateRef,ViewChild,AfterViewInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit{
  
  constructor(public dialog: MatDialog,public fb:FormBuilder ,private api:UserService,private toaster:ToastrService) {}
  user_form!:FormGroup;
  submitted = false;
  dataSource:any =[];
  displayedColumns:any;
  modal_title:string ="Add User modal";
  modal_btn:string ="Save";
  @ViewChild('usermodal') usermodal!: TemplateRef<any>;
  // @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.user_form =this.fb.group({
      id:[''],
      user_name:['',Validators.required],
      email:['',Validators.required],
      Phone_number:['',Validators.required],
      whatsapp_number:['',Validators.required],
      address:['',Validators.required],
    })
    this.getall_data();
    this.displayedColumns = ['id','user_name','email','Phone_number','whatsapp_number','address','Action'];

    // this.dataSource.sort = this.sort;
    
  }

  
  get f() {
    return this.user_form["controls"];
  }

  modal_open(usermodal1: any){
    this.modal_btn ="Save";
    this.modal_title ="Add User modal";
   var  dialogRef = this.dialog.open(this.usermodal,{
      width: '70vw',
      disableClose: false
    })

    dialogRef.afterClosed().subscribe(result => {
      this.user_form.reset();
    });
  }

  
  
  getall_data(){
    this.api.getall().subscribe(
      (res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter  = filterValue.trim().toLowerCase();
  }
    
  save_user(){
    this.submitted = true;
      if(this.user_form.valid){
         
        if(this.user_form.controls['id'].value){
          let data = {
            user_name:this.user_form.controls['user_name'].value,
            email:this.user_form.controls['email'].value,
            Phone_number:this.user_form.controls['Phone_number'].value,
            whatsapp_number:this.user_form.controls['whatsapp_number'].value,
            address:this.user_form.controls['address'].value,
          }
          let id =this.user_form.controls['id'].value;
            this.api.update(id,data).subscribe(
              (res:any)=>{
                console.log(res);
                this.toaster.success('User Update Successfully');
                this.dialog.closeAll();
                this.user_form.reset();
                this.getall_data();
              },
              (error:any)=>{
                console.log(error);
              }
            )
        }else{
          this.api.store(this.user_form.value).subscribe(
            (res:any)=>{
              this.toaster.success('User Store Successfully');
            this.dialog.closeAll();
            this.user_form.reset();
            this.getall_data();
          },
          (error:any)=>{
            console.log(error);
          }
          )
        }
      }else{
        this.toaster.warning('All Filed Required');
      }
  }
 
  edit(e:any){
    console.log(e);
    this.modal_btn ="Update";
    this.modal_title ="Edit User modal";
    this.user_form.controls['user_name'].setValue(e.user_name);
    this.user_form.controls['email'].setValue(e.email);
    this.user_form.controls['Phone_number'].setValue(e.Phone_number);
    this.user_form.controls['whatsapp_number'].setValue(e.whatsapp_number);
    this.user_form.controls['address'].setValue(e.whatsapp_number);
    this.user_form.controls['id'].setValue(e.id);
    let edit_modal=this.dialog.open(this.usermodal,{
      width: '70vw',
      disableClose: false
    });  
    
    edit_modal.afterClosed().subscribe(result => {
      this.user_form.reset();
    });
    

  }
  
  delete(id:any){
    this.api.delete(id).subscribe(
      (res:any)=>{
        this.toaster.success('User Delete Successfully');
        this.getall_data();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
