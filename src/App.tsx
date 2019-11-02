import React, { useState } from 'react';
import { Header } from './components/layout/Header/Header';
import { Content } from './components/layout/Content/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import './App.scss';

interface Props {
	darkModeDefault?: boolean;
}

export const App: React.FC<Props> = ({ darkModeDefault = false }) => {
	const [ darkMode, setDarkMode ] = useState(darkModeDefault);
	return (
		<SelectedProjectProvider>
			<ProjectsProvider>
				<main className={darkMode ? 'darkmode' : undefined} data-testid="application">
					<Header darkMode={darkMode} setDarkMode={setDarkMode} />
					<Content />
				</main>
			</ProjectsProvider>
		</SelectedProjectProvider>
	);
};
