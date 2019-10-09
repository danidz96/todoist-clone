import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Tasks } from '../../Tasks/Tasks';

interface Props {}

export const Content: React.FC<Props> = () => {
	return (
		<section>
			<Sidebar />
			<Tasks />
		</section>
	);
};
