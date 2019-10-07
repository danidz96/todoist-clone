import React from 'react';
import { Header } from './components/layout/Header/Header';
import { Content } from './components/layout/Content/Content';
import { useTasks } from './hooks/useTasks';
import { ITask } from './model/ITask';

export const App: React.FC = () => {
	const { tasks, archivedTasks } = useTasks('1');

	console.log(tasks);
	return (
		<div className="App">
			<Header />
			<Content />
		</div>
	);
};
