import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface AthleteRowProps {
  athlete: {
    id: string;
    full_name: string;
    fitness_level: string;
    last_active: string;
    assigned_plan?: string;
  };
}

export function AthleteRow({ athlete }: AthleteRowProps) {
  const levelColors: Record<string, string> = {
    beginner: 'bg-blue-100/10 text-blue-200',
    intermediate: 'bg-green-100/10 text-green-300',
    advanced: 'bg-danger/10 text-danger'
  };

  return (
    <tr className="hover:bg-surface2 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-200 font-bold">
              {athlete.full_name.charAt(0)}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-text">{athlete.full_name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${levelColors[athlete.fitness_level] || levelColors.beginner}`}>
          {athlete.fitness_level}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {athlete.assigned_plan || 'No Active Plan'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
        {athlete.last_active}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link to={`/coach/athletes/${athlete.id}`} className="text-blue-400 hover:text-blue-300 inline-flex items-center">
          View Profile
          <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </td>
    </tr>
  );
}
