import { IncomeFluxDataModel, OutcomeFluxDataModel } from './Flux';

export class SheetDataModel {
	readonly records: Array<OutcomeFluxDataModel | IncomeFluxDataModel>;

	constructor(flux: Array<OutcomeFluxDataModel | IncomeFluxDataModel> = []) {
		this.records = flux;
	}

	//Method
	// C
	/*
	- Create a new flux
	- Push existing flux
	 */
	// R
	/*
	- Get flux by id
	- Get flux by category
	- Get flux by month
	- Get flux by year
	- Get flux by type
	- Get flux by status
	- Get flux by date
	- Get flux by amount
	- Get flux by label
	- Get flux by date_due
	- Get flux by date_payment
	- Get flux by date_reception
	*/
	// U
	/*
	- Update flux
	*/
	// D
	/*
	- Delete flux
	- Delete flux by id
	- Delete flux by category
	- Delete flux by month
	- Delete flux by year
	- Delete flux by type
	- Delete flux by status
	- Delete flux by date
	- Delete flux by amount
	- Delete flux by label
	- Delete flux by date_due
	- Delete flux by date_payment
	- Delete flux by date_reception
	*/
	// S
	/*
	- Search flux by id
	- Search flux by category
	- Search flux by month
	- Search flux by year
	- Search flux by type
	- Search flux by status
	- Search flux by date
	- Search flux by amount
	- Search flux by label
	- Search flux by date_due
	- Search flux by date_payment
	- Search flux by date_reception
	*/
}
