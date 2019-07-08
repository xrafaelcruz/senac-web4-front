import { Component, OnInit } from "@angular/core";

// Models
import { User } from "./../../models/user";

// Services
import { UserService } from "./../../services/user.service";
import { ToastService } from "./../../services/toast.service";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.css"]
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "username",
    "email",
    "phone",
    "profile",
    "options"
  ];
  dataSource: User[] = [];
  users: User[] = [];

  constructor(private userService: UserService, private toast: ToastService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource = users;
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  update(i) {}

  remove(i) {
    this.userService.removeUser(this.dataSource[i]._id).subscribe(
      () => {
        this.getUsers();
        this.toast.showToast("Usuário deletado com sucesso", "success");
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }
}
