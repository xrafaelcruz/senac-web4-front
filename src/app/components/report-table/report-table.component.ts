import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Models
import { Report } from "./../../models/report";

// Services
import { ReportService } from "./../../services/report.service";
import { ToastService } from "./../../services/toast.service";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-report-table",
  templateUrl: "./report-table.component.html",
  styleUrls: ["./report-table.component.css"]
})
export class ReportTableComponent implements OnInit {
  displayedColumns: string[] = ["date", "value", "options"];
  dataSource: Report[] = [];

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    const id = this.authService.getUser()._id;
    this.reportService.getReports(id).subscribe(
      reports => {
        reports.map(report => {
          report["dateString"] = new Date(report.date)
            .toISOString()
            .split("T")[0];
        });

        this.dataSource = reports;
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }

  update(i) {
    console.log(i);
    const id = this.dataSource[i]._id;
    this.router.navigate(["/report/update/" + id]);
  }

  remove(i) {
    this.reportService.removeReport(this.dataSource[i]._id).subscribe(
      () => {
        this.getReports();
        this.toast.showToast("Relatório deletado com sucesso", "success");
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }
}
