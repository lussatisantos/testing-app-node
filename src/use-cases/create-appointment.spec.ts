import { describe, expect } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('Create appointmet', () => {
    it ('should be able to create an appointment', () => {
        const startsAt = getFutureDate('2003-07-12')
        const endsAt = getFutureDate('2003-07-11')

        const appointmentsRepository = new InMemoryAppointmentsRepository
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        )

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it ('should not be able to create an appointment with overlapping dates', async() => {
        const startsAt = getFutureDate('2003-07-12')
        const endsAt = getFutureDate('2003-07-18')

        const appointmentsRepository = new InMemoryAppointmentsRepository
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        )
        
        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2003-07-12'),
            endsAt: getFutureDate('2003-07-18')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2003-07-10'),
            endsAt: getFutureDate('2003-07-13')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2003-07-07'),
            endsAt: getFutureDate('2003-07-20')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2003-07-13'),
            endsAt: getFutureDate('2003-07-17')
        })).rejects.toBeInstanceOf(Error)
    })
})

