import { Component } from '@angular/core';
import { UserserviceService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
api:any


  user = [
    {
      id: '',
      username: '',
      email: '',
      phone: '',
      enabled: '',
      profile:''
    }
  ]
  constructor(private _user: UserserviceService) {

  }
  ngOnInit(): void {
    this._user.getallUsers().subscribe(
      (data: any) => {
        this.user = data;
        console.log(data);

      },
      (error) => {
        Swal.fire('error', 'something wrong', 'error')
      })
      this.api = 'http://localhost:8081/user/post/image/';
  }



  deleteUser(id: any) {
   
    Swal.fire({
      icon: 'info',
      'title': 'Are You sure',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete
        this._user.deleteUser(id).subscribe(
          (data) => {
            // Filter
            this.user = this.user.filter((user: any) => user.id != id);
            Swal.fire('Success', 'User Delete SuccessFully', 'success')
          },
          (error) => {
            Swal.fire('error', "Something is went wrong", 'error')
          })
      }
    })

  }


}

