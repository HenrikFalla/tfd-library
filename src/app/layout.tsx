import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/ui/header';

const pretendard = localFont({
	src: [
		{
			path: '../fonts/Pretendard-Regular.woff2',
			weight: '400',
		},
		{
			path: '../fonts/Pretendard-Light.woff2',
			weight: '100',
		},
		{
			path: '../fonts/Pretendard-ExtraBold.woff2',
			weight: '800',
		},
	],
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: 'TFD Library',
	description: 'All things The First Descendant',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${pretendard.variable}  antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}

