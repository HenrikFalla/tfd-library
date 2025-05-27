import Providers from './providers';
import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'The First Descendant Library',
	description: 'Your TFD Data Source',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

