import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

// Models
import { Report, ExpenseGroup } from "./../../models/report";

// Services
import { ReportService } from "./../../services/report.service";
import { ToastService } from "./../../services/toast.service";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-report-form",
  templateUrl: "./report-form.component.html",
  styleUrls: ["./report-form.component.css"]
})
export class ReportFormComponent implements OnInit {
  @Input() isCreate: boolean;
  report: Report = new Report();
  btnLabel: String;

  reportValue = new FormControl("", [Validators.required]);
  reportDate = new FormControl("", [Validators.required]);
  expenseGroupList = [];

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.btnLabel = this.isCreate ? "Criar" : "Editar";

    if (!this.expenseGroupList.length) {
      this.newGroup();
      this.newGroup();
      this.newGroup();
    }

    if (!this.isCreate) {
      this.getReport();
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
    console.log("submit");

    if (!this.reportValue.invalid && !this.reportDate.invalid) {
      this.report.value = Number(this.reportValue.value);
      this.report.date = this.reportDate.value;
      this.report.idUser = this.authService.getUser()._id;

      const newExpenseGroupList = [];
      this.expenseGroupList.forEach(group => {
        const newExpenseGroup = {
          name: group.fieldName.value,
          percentage: Number(group.fieldPercentage.value),
          expenseList: []
        };

        group.expenseList.forEach(expense => {
          newExpenseGroup.expenseList.push({
            name: expense.fieldName.value,
            value: Number(expense.fieldValue.value)
          });
        });

        newExpenseGroupList.push(newExpenseGroup);
      });

      this.report.expenseGroupList = newExpenseGroupList;

      console.log(this.isCreate);

      if (this.isCreate) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  create() {
    this.reportService.createReport(this.report).subscribe(
      () => {
        this.toast.showToast("Relatório criado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  update() {
    this.reportService.updateReport(this.report).subscribe(
      () => {
        this.toast.showToast("Relatório atualizado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  getReport() {
    const id = this.route.snapshot.params["id"];
    this.report._id = id;
    this.reportService.getReport(id).subscribe(
      report => {
        this.reportValue.setValue(report.value);
        console.log(report.date);
        this.reportDate.setValue(
          new Date(report.date).toISOString().split("T")[0]
        );
        console.log(this.reportDate.value);

        const newExpenseGroupList = [];
        if (report.expenseGroupList.length) {
          report.expenseGroupList.forEach(group => {
            const newExpenseGroup = {
              fieldName: new FormControl(group.name, []),
              fieldPercentage: new FormControl(group.percentage, []),
              expenseList: []
            };

            if (group.expenseList.length) {
              const newExpenseList = [];

              group.expenseList.forEach(expense => {
                newExpenseList.push({
                  fieldName: new FormControl(expense.name, []),
                  fieldValue: new FormControl(expense.value, [])
                });
              });

              newExpenseGroup.expenseList = newExpenseList;
            }

            newExpenseGroupList.push(newExpenseGroup);
          });

          this.expenseGroupList = newExpenseGroupList;
        }
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  newGroup() {
    this.expenseGroupList.push({
      fieldName: new FormControl("", []),
      fieldPercentage: new FormControl("", []),
      expenseList: []
    });
  }

  removeGroup(i) {
    this.expenseGroupList = this.expenseGroupList.filter(
      (group, index) => i !== index
    );
  }

  newExpense(i) {
    this.expenseGroupList[i].expenseList.push({
      fieldName: new FormControl("", []),
      fieldValue: new FormControl("", [])
    });
  }

  removeExpense(i, j) {
    this.expenseGroupList[i].expenseList = this.expenseGroupList[
      i
    ].expenseList.filter((expense, index) => j !== index);
  }

  totalExpense(expenseList) {
    if (expenseList.length) {
      if (expenseList.length > 1) {
        return expenseList.reduce((prev, current) => {
          if (prev.fieldValue) {
            return (
              Number(prev.fieldValue.value) + Number(current.fieldValue.value)
            );
          } else {
            return Number(prev) + Number(current.fieldValue.value);
          }
        });
      }

      return expenseList[0].fieldValue.value || 0;
    }

    return 0;
  }

  result(expenseGroup) {
    const resultOfPercentage =
      (expenseGroup.fieldPercentage.value * this.reportValue.value) / 100;

    if (expenseGroup.expenseList.length) {
      if (expenseGroup.expenseList.length > 1) {
        const totalExpenses = expenseGroup.expenseList.reduce(
          (prev, current) => {
            if (prev.fieldValue) {
              return (
                Number(prev.fieldValue.value) + Number(current.fieldValue.value)
              );
            } else {
              return Number(prev) + Number(current.fieldValue.value);
            }
          }
        );

        return resultOfPercentage - totalExpenses;
      }

      return (
        resultOfPercentage - (expenseGroup.expenseList[0].fieldValue.value || 0)
      );
    }

    return resultOfPercentage;
  }
}
