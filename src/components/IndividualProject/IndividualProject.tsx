import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { firebase } from '../../firebase';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { IProject } from '../../model/IProject';
import './IndividualProject.scss';

interface Props {
	project: IProject;
}

export const IndividualProject: React.FC<Props> = ({ project }) => {
	const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
	// @ts-ignore
	const { setSelectedProject } = useSelectedProjectValue();
	// @ts-ignore
	const { projects, setProjects } = useProjectsValue();

	const deleteProject = (docId: string): void => {
		firebase.firestore().collection('projects').doc(docId).delete().then(() => {
			setProjects([ ...projects ]);
			setSelectedProject('INBOX');
		});
	};

	return (
		<React.Fragment>
			<span className="sidebar__dot">·</span>
			<span className="sidebar__project-name">{projects.name}</span>
			<span
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}
			>
				<FaTrashAlt />
				{showConfirm && (
					<div className="project-delete-modal">
						<div className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project</p>
							<button type="button" onClick={() => deleteProject(project.docId)}>
								Delete
							</button>
							<span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
						</div>
					</div>
				)}
			</span>
		</React.Fragment>
	);
};
