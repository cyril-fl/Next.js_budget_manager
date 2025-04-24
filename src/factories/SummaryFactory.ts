import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';

type TransactionRecord = OutcomeTransactionRecord | IncomeTransactionRecord;
/*
	TODO:
		- Utiliser des methode pour chaque extraction de données
		mettre ça dans des propriétés
		retourner l'objet final en class ou en autre class
*/
export class SummaryFactory {
	static yearlySummary(transactions: TransactionRecord[]) {
		const map = new Map<number, TransactionRecord>();
		for (const record of transactions) {
			const { reportYear } = record;

			if (!map.has(reportYear)) {
				map.set(reportYear, record);
			}
		}

		return Array.from(map.values()).map((record) => {
			const { reportYear } = record;
			const transactionsByYear = transactions.filter(
				(transaction) => transaction.reportYear === reportYear
			);

			// __ Une methode
			const yearlyIncome = transactionsByYear.reduce(
				(acc, transaction) =>
					acc + (transaction.type === 'income' ? transaction.amount : 0),
				0
			);
			const yearlyOutcome = transactionsByYear.reduce(
				(acc, transaction) =>
					acc + (transaction.type === 'outcome' ? transaction.amount : 0),
				0
			);
			// __

			// __ Une methode
			const balance = yearlyIncome - yearlyOutcome;
			// __
			// __ Une methode
			const incomeOutcomeRatio =
				yearlyOutcome > 0 ? yearlyIncome / yearlyOutcome : null;
			// __

			const monthsInYear = transactionsByYear
				.reduce((acc, transaction) => {
					const month = transaction.reportMonth;
					if (!acc.includes(month)) {
						acc.push(month);
					}
					return acc;
				}, [] as number[])
				.sort((a, b) => a - b);

			// __ Une methode
			const activeMonthsCount = monthsInYear.length;
			const averageIncomePerMonth =
				activeMonthsCount > 0 ? yearlyIncome / activeMonthsCount : 0;
			const averageOutcomePerMonth =
				activeMonthsCount > 0 ? yearlyOutcome / activeMonthsCount : 0;

			const incomeByCategory: Record<string, number> = {};
			const outcomeByCategory: Record<string, number> = {};
			const monthlyIncome: Record<number, number> = {};
			const monthlyOutcome: Record<number, number> = {};

			transactionsByYear.forEach((transaction) => {
				const category = transaction.value.category;
				const month = transaction.reportMonth;

				if (transaction.type === 'income') {
					incomeByCategory[category] =
						(incomeByCategory[category] || 0) + transaction.amount;
					monthlyIncome[month] =
						(monthlyIncome[month] || 0) + transaction.amount;
				}

				if (transaction.type === 'outcome') {
					outcomeByCategory[category] =
						(outcomeByCategory[category] || 0) + transaction.amount;
					monthlyOutcome[month] =
						(monthlyOutcome[month] || 0) + transaction.amount;
				}
			});
			// __ Une methode

			// __ Une methode
			const incomeByCategoryPercentage = Object.entries(incomeByCategory).map(
				([category, total]) => ({
					category,
					percentage: (total / yearlyIncome) * 100,
				})
			);

			const outcomeByCategoryPercentage = Object.entries(outcomeByCategory).map(
				([category, total]) => ({
					category,
					percentage: (total / yearlyOutcome) * 100,
				})
			);
			// __
			// __ Une methode
			const topIncomeCategory = incomeByCategoryPercentage
				.slice()
				.sort((a, b) => b.percentage - a.percentage)[0]?.category;

			const topOutcomeCategory = outcomeByCategoryPercentage
				.slice()
				.sort((a, b) => b.percentage - a.percentage)[0]?.category;

			// __ Une methode
			// Une methode
			const topIncomeMonth = Object.entries(monthlyIncome).sort(
				(a, b) => b[1] - a[1]
			)[0]?.[0];

			const topOutcomeMonth = Object.entries(monthlyOutcome).sort(
				(a, b) => b[1] - a[1]
			)[0]?.[0];
			// __

			return {
				reportYear,
				yearlyIncome,
				yearlyOutcome,
				balance,
				incomeOutcomeRatio,
				monthsInYear,
				activeMonthsCount,
				averageIncomePerMonth,
				averageOutcomePerMonth,
				incomeByCategory,
				incomeByCategoryPercentage,
				outcomeByCategory,
				outcomeByCategoryPercentage,
				topIncomeCategory,
				topOutcomeCategory,
				topIncomeMonth: topIncomeMonth ? Number(topIncomeMonth) : null,
				topOutcomeMonth: topOutcomeMonth ? Number(topOutcomeMonth) : null,
			};
		});
	}
}

// static monthlySummary() {
// 	// à implémenter
// 	return [];
// }
//
// static transactionSummary() {
// 	// à implémenter
// 	return [];
// }

/*
{
    "totalIncome": 22472.239999999998,
    "totalOutcome": 11714.369999999999,
    "id": "y-2024",
    "reportYear": 2024,
    "months": [
      {
        "totalIncome": 4505.47,
        "totalOutcome": 2369.72,
        "incomes": [
          {
            "total": 2660.38,
            "category": "Salaire",
            "transactions": [
              {
                "id": "flux_0",
                "label": "income_0",
                "currency": "EUR",
                "amount": 2660.38,
                "status": "expected",
                "dateReception": "2024-01-15T23:00:00.000Z"
              }
            ]
          },
          {
            "total": 1845.09,
            "category": "Cadeau",
            "transactions": [
              {
                "id": "flux_13",
                "label": "income_13",
                "currency": "EUR",
                "amount": 1845.09,
                "status": "expected",
                "dateReception": "2024-01-27T23:00:00.000Z"
              }
            ]
          }
        ],
        "outcomes": [
          {
            "total": 2369.72,
            "category": "Courses",
            "transactions": [
              {
                "id": "flux_28",
                "label": "outcome_28",
                "currency": "EUR",
                "amount": 2369.72,
                "status": "pending",
                "dateDue": "2024-01-03T23:00:00.000Z",
                "datePayment": "2024-01-12T23:00:00.000Z"
              }
            ]
          }
        ],
        "id": "m-2024-0",
        "reportMonth": 0
      },
      {
        "totalIncome": 0,
        "totalOutcome": 589,
        "incomes": [],
        "outcomes": [
          {
            "total": 589,
            "category": "Impôts",
            "transactions": [
              {
                "id": "flux_72",
                "label": "outcome_72",
                "currency": "EUR",
                "amount": 262.83,
                "status": "paid",
                "dateDue": "2024-02-14T23:00:00.000Z",
                "datePayment": "2024-02-11T23:00:00.000Z"
              },
              {
                "id": "flux_96",
                "label": "outcome_96",
                "currency": "EUR",
                "amount": 326.17,
                "status": "pending",
                "dateDue": "2024-02-09T23:00:00.000Z",
                "datePayment": "2024-02-10T23:00:00.000Z"
              }
            ]
          }
        ],
        "id": "m-2024-1",
        "reportMonth": 1
      },
      {
        "totalIncome": 914.8,
        "totalOutcome": 0,
        "incomes": [
          {
            "total": 914.8,
            "category": "Vente",
            "transactions": [
              {
                "id": "flux_65",
                "label": "income_65",
                "currency": "EUR",
                "amount": 914.8,
                "status": "received",
                "dateReception": "2024-03-04T23:00:00.000Z"
              }
            ]
          }
        ],
        "outcomes": [],
        "id": "m-2024-2",
        "reportMonth": 2
      },
      {
        "totalIncome": 2722.09,
        "totalOutcome": 1467.82,
        "incomes": [
          {
            "total": 2722.09,
            "category": "Salaire",
            "transactions": [
              {
                "id": "flux_32",
                "label": "income_32",
                "currency": "EUR",
                "amount": 2722.09,
                "status": "pending",
                "dateReception": "2024-04-11T22:00:00.000Z"
              }
            ]
          }
        ],
        "outcomes": [
          {
            "total": 934.02,
            "category": "Transport",
            "transactions": [
              {
                "id": "flux_20",
                "label": "outcome_20",
                "currency": "EUR",
                "amount": 934.02,
                "status": "pending",
                "dateDue": "2024-04-09T22:00:00.000Z",
                "datePayment": "2024-04-09T22:00:00.000Z"
              }
            ]
          },
          {
            "total": 533.8,
            "category": "Santé",
            "transactions": [
              {
                "id": "flux_83",
                "label": "outcome_83",
                "currency": "EUR",
                "amount": 533.8,
                "status": "pending",
                "dateDue": "2024-04-05T22:00:00.000Z",
                "datePayment": "2024-04-03T22:00:00.000Z"
              }
            ]
          }
        ],
        "id": "m-2024-3",
        "reportMonth": 3
      },
      {
        "totalIncome": 7078.500000000001,
        "totalOutcome": 516.38,
        "incomes": [
          {
            "total": 2095.37,
            "category": "Salaire",
            "transactions": [
              {
                "id": "flux_53",
                "label": "income_53",
                "currency": "EUR",
                "amount": 2095.37,
                "status": "expected",
                "dateReception": "2024-05-09T22:00:00.000Z"
              }
            ]
          },
          {
            "total": 1783.26,
            "category": "Cadeau",
            "transactions": [
              {
                "id": "flux_56",
                "label": "income_56",
                "currency": "EUR",
                "amount": 1783.26,
                "status": "pending",
                "dateReception": "2024-05-24T22:00:00.000Z"
              }
            ]
          },
          {
            "total": 1814.65,
            "category": "Vente",
            "transactions": [
              {
                "id": "flux_69",
                "label": "income_69",
                "currency": "EUR",
                "amount": 1814.65,
                "status": "expected",
                "dateReception": "2024-05-26T22:00:00.000Z"
              }
            ]
          },
          {
            "total": 1385.22,
            "category": "Remboursement",
            "transactions": [
              {
                "id": "flux_81",
                "label": "income_81",
                "currency": "EUR",
                "amount": 1385.22,
                "status": "pending",
                "dateReception": "2024-05-02T22:00:00.000Z"
              }
            ]
          }
        ],
        "outcomes": [
          {
            "total": 516.38,
            "category": "Transport",
            "transactions": [
              {
                "id": "flux_68",
                "label": "outcome_68",
                "currency": "EUR",
                "amount": 516.38,
                "status": "overdue",
                "dateDue": "2024-05-11T22:00:00.000Z",
                "datePayment": "2024-05-19T22:00:00.000Z"
              }
            ]
          }
        ],
        "id": "m-2024-4",
        "reportMonth": 4
      },
*/
