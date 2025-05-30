import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<Link href='/'>
			<div className='w-full flex flex-col items-center pt-4'>
				<Image
					src='/logo.png'
					width={500}
					height={250}
					alt='logo'
					className='h-fit hidden dark:block'
				/>
				<Image
					src='/logo_black.png'
					width={500}
					height={250}
					alt='logo'
					className='h-fit dark:hidden'
				/>
				<span className='text-xl font-extrabold'>Archive</span>
			</div>
		</Link>
	);
}
