import type { ActivityEvent } from "../../types";
import { formatDate, getStatusClass, getStatusLabel } from "./utils";

type ActivityCardProps = {
  activity: ActivityEvent;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const displayDate = activity.updatedAt || activity.createdAt;

  return (
    <div className="card">
      <div className="card-date">{formatDate(displayDate)}</div>

      <div>
        <span className={`badge ${getStatusClass(activity.status)}`}>
          {getStatusLabel(activity.status)}
        </span>
      </div>

      <div className="card-content">
        <div className="card-subject">{activity.subject}</div>
        <div className="card-description">
          {activity.type} : {activity.description}
        </div>
      </div>

      <div className="card-user">{activity.user.name}</div>
    </div>
  );
};
