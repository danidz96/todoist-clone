import React from 'react';
import { firebase } from '../../firebase';
import { ITask } from '../../model/ITask';

interface Props {
	task: ITask;
}

export const Checkbox: React.FC<Props> = ({ task }: Props) => {
	const archiveTask = () => {
		firebase.firestore().collection('tasks').doc(task.id).update({ archived: true });
	};
	return (
		<div
			className="checkbox-holder"
			data-testid="checkbox-action"
			onClick={archiveTask}
			onKeyDown={archiveTask}
			aria-label={`Mark ${task.task} as done?`}
			role="button"
			tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	);
};
