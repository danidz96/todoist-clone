import React from 'react';
import { Header } from './components/layout/Header/Header';
import { Content } from './components/layout/Content/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import './App.scss';

export const App: React.FC = () => {
	return (
		<SelectedProjectProvider>
			<ProjectsProvider>
				<div className="App">
					<Header />
					<Content />
				</div>
			</ProjectsProvider>
		</SelectedProjectProvider>
	);
};
