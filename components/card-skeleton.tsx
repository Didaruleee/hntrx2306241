import {Card, Skeleton} from "@nextui-org/react";

const CardSkeleton = ({className, skeleton = 3}: {className?: string; skeleton?: number}) => {
  return (
    <div>
      <Card className={`${className ?? ""} space-y-5 p-4`} radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          {Array.from({length: skeleton}, (_, index) => (
            <div key={index} className={`w-${(index % 16) + 2}/5 rounded-lg`}>
              <div
                className={`h-3 w-${(index % 5) + 16}/5 rounded-lg bg-default-${
                  200 + (index % 2) * 100
                }`}
              ></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CardSkeleton;
