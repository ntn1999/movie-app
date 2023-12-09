import { Suspense, lazy } from 'react';
import { Loading } from '@/components/atoms';
import { delayForLoading } from '@/utils';

const Home = lazy(() => delayForLoading(import('@/pages/Home')));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Home />
		</Suspense>
	);
}

export default App;
