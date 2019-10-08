import React from 'react';
import { Header } from './components/layout/Header/Header';
import { Content } from './components/layout/Content/Content';
import { useTasks } from './hooks/useTasks';
import { useProjects } from './hooks/useProjects';

export const App: React.FC = () => {
	const { tasks, archivedTasks } = useTasks('1');
	const [ projects, setProjects ] = useProjects();

	console.log(tasks);
	return (
		<div className="App">
			<Header />
			<Content />
		</div>
	);
};
