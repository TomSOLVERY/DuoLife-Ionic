export interface Task 
{
    id: string,
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    occurence: number;
    createdBy: string;
    assignedFor: string;
    localization: string;
    alarm: Date;
}
