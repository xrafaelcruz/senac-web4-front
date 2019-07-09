export class Report {
  _id: String;
  value: Number;
  date: Date;
  idUser: String;
  expenseGroupList: ExpenseGroup[];
}

export class ExpenseGroup {
  name: String;
  percentage: Number;
  expenseList: Expense[];
}

export class Expense {
  name: String;
  value: Number;
}
