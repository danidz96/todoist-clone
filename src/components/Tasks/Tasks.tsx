import React, { useEffect } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTasks } from '../../hooks/useTasks';
import { collatedTasks } from '../../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../../context/';

import './Tasks.scss';

interface Props {}

export const Tasks: React.FC<Props> = () => {
	//@ts-ignore
	const { selectedProject } = useSelectedProjectValue();
	//@ts-ignore
	const { projects } = useProjectsValue();
	const { tasks } = useTasks(selectedProject);

	let projectName: string = '';

	if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
		projectName = getTitle(projects, selectedProject).name;
		console.log('projectName 1', projectName);
	}

	if (collatedTasksExist(selectedProject) && selectedProject) {
		projectName = getCollatedTitle(collatedTasks, selectedProject).name;
		console.log('projectName 2', projectName);
	}

	useEffect(() => {
		document.title = `${projectName}: Todoist`;
	});

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
