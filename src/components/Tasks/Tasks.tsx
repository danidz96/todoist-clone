import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTasks } from '../../hooks/useTasks';
import './Tasks.scss';

interface Props {}

export const Tasks: React.FC<Props> = () => {
	const { tasks } = useTasks('1');

	let projectName: string = '';

	return (
		<div className="tasks" data-testid="tasks">
			<h2 className="project-name" data-testid="project-name">
				{projectName}
			</h2>

			<ul className="tasks__list">
				{tasks.map((task) => (
					<li key={task.id}>
						<Checkbox task={task} />
						<span>{task.task}</span>
					</li>
				))}
			</ul>
		</div>
	);
};
