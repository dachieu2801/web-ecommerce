import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailHistory from './Component/DetailHistory';
import MainHistory from './Component/MainHistory';

function History(props) {
	return (
		<Routes>
			<Route path='/history/' component={MainHistory} />

			<Route path='/history/:id' component={DetailHistory} />
		</Routes>
	);
}

export default History;
