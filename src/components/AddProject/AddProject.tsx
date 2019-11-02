import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { useProjectsValue } from '../../context';
import uuid from 'uuid/v4';
import './AddProject.scss';

interface Props {
	shouldShow?: boolean;
}

export const AddProject: React.FC<Props> = ({ shouldShow = false }) => {
	const [ show, setShow ] = useState(shouldShow);
	const [ projectName, setProjectName ] = useState('');
	//@ts-ignore
	const { projects, setProjects } = useProjectsValue();

	const projectId = uuid();
	const addProject = () =>
		projectName &&
		firebase
			.firestore()
			.collection('projects')
			.add({ projectId, name: projectName, userId: 'PIlfw5ql9ExmqixfenaK' })
			.then(() => {
				setProjects([ ...projects ]);
				setProjectName('');
				setShow(false);
			});

	return (
		<div>
			<div className="add-project" data-testid="add-project">
				{show && (
					<div className="add-project__input" data-testid="add-project-inner">
						<input
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							className="add-project__name"
							data-testid="project-name"
							type="text"
							placeholder="Name your project"
						/>
						<button
							className="add-project__submit"
							type="button"
							onClick={() => addProject()}
							data-testid="add-project-submit"
						>
							Add Project
						</button>
						<span
							aria-label="Cancel adding project"
							data-testid="hide-project-overlay"
							className="add-project__cancel"
							onClick={() => setShow(false)}
							onKeyDown={() => setShow(false)}
							role="button"
							tabIndex={0}
						>
							Cancel
						</span>
					</div>
				)}
				<span className="add-project__plus">+</span>
				<span
					aria-label="Add Project"
					data-testid="add-project-action"
					className="add-project__text"
					onClick={() => setShow(!show)}
					onKeyDown={() => setShow(!show)}
					role="button"
					tabIndex={0}
				>
					Add Project
				</span>
			</div>
		</div>
	);
};
