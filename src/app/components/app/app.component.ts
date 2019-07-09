import { Component } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isAuthenticated: boolean;
  user: User = new User();

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.user = this.auth.getUser();
  }
}
