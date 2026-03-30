import { Studio } from 'sanity';
import config from '../../sanity.config';

export default function AdminPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <Studio config={config} />
    </div>
  );
}
