export const groupBy = {
	$group: {
		_id: {
			$concat: [{ $toString: '$year' }],
		},
		year: { $first: '$year' },
		record: { $push: '$$ROOT' },
	},
};
