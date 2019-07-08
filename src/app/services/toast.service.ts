import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  active: boolean = false;

  constructor() {}

  showToast(message, type) {
    if (!this.active) {
      this.active = true;

      document.getElementById("toast").innerHTML = message;
      document.getElementById("toast").className = type;

      const t = setTimeout(() => {
        document.getElementById("toast").className = "";
        clearTimeout(t);
        this.active = false;
      }, 2000);
    }
  }
}
