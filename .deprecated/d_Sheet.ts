// export class SheetModel {
// 	readonly years: SheetYearModel[];
//
// 	constructor(years: SheetYear[]) {
// 		this.years = years.map((year) => {
// 			const months = year.months.map((month) => {
// 				return new SheetMonthModel(month.month, month.income, month.expense);
// 			});
// 			return new SheetYearModel(year.year, months);
// 		});
// 	}
// 	// todo Add year crud
// }

export class SheetYearModel {
	readonly year: number;
	months: SheetMonthModel[];

	// todo Add months crud
	constructor(year: number, months: SheetMonthModel[]) {
		this.year = year;
		this.months = months;
	}
}

// export class SheetMonthModel {
// 	readonly month: number;
// 	income: FluxCatModel[];
// 	expense: FluxCatModel[];
//
// 	constructor(month: number, income: FluxCat[], expense: FluxCat[]) {
// 		this.month = month;
// 		this.income = income.map((fluxCat) => new FluxCatModel(fluxCat));
// 		this.expense = expense.map((fluxCat) => new FluxCatModel(fluxCat));
// 	}
// 	// 	todo Add incomes and expenses categories crud
// }

// export class FluxCatModel {
// 	id: string;
// 	category: string;
// 	flux: FluxModel[];
//
// 	constructor(fluxCat: FluxCat) {
// 		this.id = fluxCat.id;
// 		this.category = fluxCat.category;
// 		this.flux = fluxCat.flux.map((flux) => new FluxModel(flux));
// 	}
// 	// todo Add flux crud
// }

// export class FluxModel {
// 	id: string;
// 	amount: number;
// 	date_due?: string;
// 	date_payment?: string;
// 	date_reception?: string;
// 	name: string;
// 	status?: PaymentStatus;
//
// 	// todo modify flux ru
// 	constructor(flux: Flux) {
// 		this.id = flux.id;
// 		this.amount = flux.amount;
// 		this.date_due = flux.date_due;
// 		this.date_payment = flux.date_payment;
// 		this.date_reception = flux.date_reception;
// 		this.name = flux.name;
// 		this.status = flux.status;
// 	}
// }
