interface CardProps {
  title?: string;
  bodyContent?: React.ReactNode;
  actionsContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, bodyContent, actionsContent }) => {
  return (
    <div className="card bg-base-100">
      <div className="card-body gap-8">
        {title && <h2 className="card-title">{title}</h2>}
        {bodyContent && bodyContent}
        {actionsContent && (
          <div className="card-actions justify-end">{actionsContent}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
