import { expect, test } from 'vitest'
import { Appointment } from './appointment';
import { getFutureDate } from '../tests/utils/get-future-date';

test('create an appoiment', () => {
    const startsAt = getFutureDate('2003-07-12')
    const endsAt = getFutureDate('2003-07-13')
    
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('John Doe');
})

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2003-07-12')
    const endsAt = getFutureDate('2003-07-11')
    
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        }).toThrow()
    })
})

test('cannot create an appointment with end date before now', () => {
    const startDate = new Date()
    const endDate = new Date()

    startsAt.setDate(startsAt.getDate()  - 1);
    endsAt.setDate(endsAt.getDate()  + 3);
    
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        }).toThrow()
    })
})