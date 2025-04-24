// // Imports
//
// // Define
// interface HeadMenuTemplatesProps {
// 	title?: string;
// 	noTitle?: boolean;
// 	slots?: {
// 		left?: React.ReactNode;
// 		center?: React.ReactNode;
// 		right?: React.ReactNode;
// 	};
// 	gridClassName?: string;
// }
//
// export default function D_HeadMenuToolbar(props: HeadMenuTemplatesProps) {
// 	// Data
// 	const { left, center, right } = props.slots || {};
// 	const hasAnySlot = left || center || right;
// 	const hasTitle = props.title && !props.noTitle;
//
// 	// Methods
//
// 	// Render
// 	const Title = props.title && !props.noTitle && (
// 		<h1 className="text-lg font-bold">{props.title}</h1>
// 	);
//
// 	if (!hasTitle && !hasAnySlot) return null;
// 	return (
// 		<header className="border-grayscale-200 col-span-full row-span-1 row-start-1 flex items-center justify-between gap-2 border-b pb-2">
// 			<div>
// 				{Title}
// 				{props?.slots?.left}
// 			</div>
// 			{props?.slots?.center && <div>{props?.slots?.center}</div>}
// 			{/*TODO utilise toolbar de raidx*/}
// 			<div className="flex items-center gap-2">{props?.slots?.right}</div>
// 		</header>
// 	);
// }
