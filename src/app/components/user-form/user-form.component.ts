import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

// Models
import { User } from "./../../models/user";

// Services
import { AuthService } from "./../../services/auth.service";
import { UserService } from "./../../services/user.service";
import { ToastService } from "./../../services/toast.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  @Input() isCreate: boolean;
  isAdm: boolean = false;
  user: User = new User();
  btnLabel: String;

  email = new FormControl("", [Validators.required, Validators.email]);
  name = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  phone = new FormControl("", [Validators.required]);
  username = new FormControl("", [Validators.required]);
  profile = new FormControl("", [Validators.required]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAdm = this.authService.isAdm();
    this.btnLabel = this.isCreate ? "Criar" : "Editar";

    if (!this.isCreate) {
      this.getUser();
    }
  }

  getErrorMessage(field) {
    return field.hasError("required")
      ? "Campo obrigatório"
      : field.hasError("email")
      ? "Email inválido"
      : "";
  }

  submit() {
    if (
      !this.email.invalid &&
      !this.name.invalid &&
      !this.password.invalid &&
      !this.phone.invalid &&
      !this.username.invalid
    ) {
      this.user.email = this.email.value;
      this.user.name = this.name.value;
      this.user.password = this.password.value;
      this.user.phone = this.phone.value;
      this.user.username = this.username.value;

      if (this.isAdm) {
        this.user.profile = this.profile.value;
      }

      if (this.isCreate) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  create() {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.toast.showToast("Usuário criado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  update() {
    this.userService.updateUser(this.user).subscribe(
      () => {
        this.toast.showToast("Usuário atualizado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  getUser() {
    const id = this.route.snapshot.params["id"];
    this.user._id = id;

    this.userService.getUser(id).subscribe(
      user => {
        this.email.setValue(user.email);
        this.name.setValue(user.name);
        this.password.setValue(user.password);
        this.phone.setValue(user.phone);
        this.username.setValue(user.username);
        this.profile.setValue(user.profile);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }
}
