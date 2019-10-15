import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../../context';

interface Props {
	activeValue?: any;
}

export const Projects: React.FC<Props> = ({ activeValue = null }) => {
	const [ active, setActive ] = useState<boolean>(activeValue);
	// @ts-ignore
	const { setSelectedProject } = useSelectedProjectValue();
	// @ts-ignore
	const { projects } = useProjectsValue();
	console.log(projects);

	return (
		projects &&
		projects.map((project) => (
			<li
				key={project.projectId}
				data-testid="project-action-parent"
				data-doc-id={project.docId}
				className={active === project.projectId ? 'active sidebar__project' : 'sidebar__project'}
			>
				<div
					role="button"
					data-testid="project-action"
					tabIndex={0}
					aria-label={`Select ${project.name} as the task project`}
					onClick={() => {
						setActive(project.projectId);
						setSelectedProject(project.projectId);
					}}
					onKeyDown={() => {
						setActive(project.projectId);
						setSelectedProject(project.projectId);
					}}
				>
					// @ts-ignore
					{('project', JSON.stringify(project))}
				</div>
			</li>
		))
	);
};
