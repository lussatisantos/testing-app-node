import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
    create(appoiment: Appointment): Promise<void>
    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise <Appointment | null>
}