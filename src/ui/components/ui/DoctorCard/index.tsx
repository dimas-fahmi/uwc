import doctorsData from "@/src/lib/app/data/doctors.json";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";

const DoctorCard = ({ id }: { id: string }) => {
  const data = doctorsData.doctors.find((d) => d.code === id);
  return (
    data && (
      <div className="flex items-center gap-4 border rounded-lg p-4 shadow-md">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`/res/arts/${data.image}`}
            alt={`${data.name}'s Avatar`}
          />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-lg font-semibold">{data.name}</h1>
          <p className="text-sm font-light">{data.specialty}</p>
        </div>
      </div>
    )
  );
};

export default DoctorCard;
