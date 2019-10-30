import React from 'react';
import { useProjectsValue } from '../../context';
import './ProjectOverlay.scss';

interface Props {
	setProject: (id: string) => void;
	showProjectOverlay: boolean;
	setShowProjectOverlay: (state: boolean) => void;
}

export const ProjectOverlay: React.FC<Props> = ({ setProject, showProjectOverlay, setShowProjectOverlay }) => {
	//@ts-ignore
	const { projects } = useProjectsValue();

	return projects && showProjectOverlay ? (
		<div className="project-overlay" data-testid="project-overlay">
			<ul className="project-overlay__list">
				{projects.map((project) => (
					<li key={project.projectId}>
						<div
							data-testid="project-overlay-action"
							onClick={() => {
								setProject(project.projectId);
								setShowProjectOverlay(false);
							}}
							onKeyDown={() => {
								setProject(project.projectId);
								setShowProjectOverlay(false);
							}}
							role="button"
							tabIndex={0}
							aria-label="Select the task project"
						>
							{project.name}
						</div>
					</li>
				))}
			</ul>
		</div>
	) : null;
};
