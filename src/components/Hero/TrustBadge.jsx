const TrustBadge = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-white border border-[hsl(214,32%,91%)]">
      {Icon && (
        <div className="shrink-0 w-10 h-10 rounded-full bg-[hsl(214,100%,97%)] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[hsl(221,83%,53%)]" />
        </div>
      )}
      <div>
        <h3 className="font-medium text-[hsl(222,47%,11%)]">{title}</h3>
        {description && (
          <p className="text-sm text-[hsl(215,16%,47%)] mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TrustBadge;