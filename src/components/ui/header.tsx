import Image from 'next/image';

export default function Header() {
	return (
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
			<h1>TFD Library</h1>
		</div>
	);
}
