import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../../styles/AthleteRow.css';

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
  const levelClasses: Record<string, string> = {
    beginner: 'athlete-row-badge-beginner',
    intermediate: 'athlete-row-badge-intermediate',
    advanced: 'athlete-row-badge-advanced'
  };

  return (
    <tr className="athlete-row">
      <td className="athlete-row-cell">
        <div className="athlete-row-info">
          <div className="athlete-row-avatar-wrap">
            <div className="athlete-row-avatar">
              {athlete.full_name.charAt(0)}
            </div>
          </div>
          <div className="athlete-row-name-wrap">
            <div className="athlete-row-name">{athlete.full_name}</div>
          </div>
        </div>
      </td>
      <td className="athlete-row-cell">
        <span className={`athlete-row-badge ${levelClasses[athlete.fitness_level] || levelClasses.beginner}`}>
          {athlete.fitness_level}
        </span>
      </td>
      <td className="athlete-row-cell athlete-row-plan">
        {athlete.assigned_plan || 'No Active Plan'}
      </td>
      <td className="athlete-row-cell athlete-row-last-active">
        {athlete.last_active}
      </td>
      <td className="athlete-row-action-cell">
        <Link to={`/coach/athletes/${athlete.id}`} className="athlete-row-view-link">
          View Profile
          <ChevronRight className="athlete-row-arrow-icon" />
        </Link>
      </td>
    </tr>
  );
}
