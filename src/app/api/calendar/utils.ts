export const groupBy = {
	$group: {
		_id: {
			$concat: [{ $toString: '$year' }],
		},
		year: { $first: '$year' },
		detail: { $push: '$$ROOT' },
	},
};

export const months = {
	$setUnion: [
		{
			$filter: {
				input: {
					$reduce: {
						input: '$detail',
						initialValue: [],
						in: {
							$concatArrays: ['$$value', ['$$this.month']],
						},
					},
				},
				as: 'day',
				cond: { $ne: ['$$day', null] },
			},
		},
	],
};

const details = (day: string, type: string) => ({
	$cond: [
		{
			$and: [{ $ne: [`$$this.${day}`, null] }, { $eq: ['$$this.type', type] }],
		},
		{
			y: '$$this.year',
			m: '$$this.month',
			d: `$$this.${day}`,
			type: '$$this.type',
			status: '$$this.status',
			_id: '$$this._id',
		},
		'$$REMOVE',
	],
});

export const days = {
	$setUnion: [
		{
			$filter: {
				input: {
					$reduce: {
						input: '$detail',
						initialValue: [],
						in: {
							$concatArrays: [
								'$$value',
								[
									details('dayReception', 'income'),
									details('dayPayment', 'outcome'),
									details('dayDue', 'outcome'),
								],
							],
						},
					},
				},
				as: 'day',
				cond: { $ne: ['$$day', null] },
			},
		},
	],
};
