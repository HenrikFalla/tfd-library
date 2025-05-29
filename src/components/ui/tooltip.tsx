'use client';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Tooltip({
	children,
	content,
}: PropsWithChildren<{ content: ReactNode }>) {
	const [isVisible, setIsVisible] = useState(false);

	const ShowTip = () => {
		setIsVisible(true);
	};
	const HideTip = () => {
		setIsVisible(false);
	};
	return (
		<div
			className='relative'
			onMouseEnter={ShowTip}
			onMouseLeave={HideTip}
		>
			{children}
			{isVisible && (
				<div className='relative md:absolute -bottom-4 md:bottom-10 w-fit'>
					{content}
				</div>
			)}
		</div>
	);
}
