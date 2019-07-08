import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: User = new User();

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
