import { Dashboard } from '../components/Dashboard';
import { Charts } from '../components/Charts';
import { CardList } from '../components/CardList';

export const Home = () => {

  return (
    <>
      <Dashboard />
      <div className="mt-8">
        <Charts />
      </div>
      <div className="mt-8 pb-12">
        <CardList />
      </div>
    </>
  );
};
