import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
}

export const StatCard = ({ icon: Icon, value, label }: StatCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-4 text-black">
                <Icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-black mb-1">{value}</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        </div>
    );
};
