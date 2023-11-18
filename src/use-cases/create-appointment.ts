import { Appointment } from "../entities/appointment"
import { AppointmentRepository } from "../repositories/appointment-repositories"

interface CreateAppointmentRequest {
    customer: string
    startsAt: Date
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor (
        private appointmentsRepository: AppointmentRepository
    ){}

    async execute({
        customer,
        startsAt,
        endsAt
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const findOverlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
            startsAt,
            endsAt
        )

        if (findOverlappingAppointment) {
            throw new Error ('Another appointment overlaps this appointment dates')
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })

        await this.appointmentsRepository.create(appointment)

        return appointment
    }
}