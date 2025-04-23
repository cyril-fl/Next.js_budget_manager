'use client';
import { useCtxMenu } from '@/stores/useCtxMenu';
import utilsDate from '@utils/utilsDate';

export default function IndexList() {
	const { ctx } = useCtxMenu();
	const { formatMonth } = utilsDate();
	return (
		<div className="overflow-auto">
			{ctx.overview.map((item, index) => (
				<ul key={index}>
					<li>{item.reportYear}</li>
					<li>
						<ul>
							{item.monthsIndex.map((month, index) => (
								<li key={index}>
									{formatMonth(item.reportYear, month, {
										month: 'long',
									})}
								</li>
							))}
						</ul>
					</li>
				</ul>
			))}
		</div>
	);
}
