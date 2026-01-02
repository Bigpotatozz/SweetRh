import React, { useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import 'temporal-polyfill/global';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';


 

export const Calendario = () => {

    const eventsService = useState(() => createEventsServicePlugin())[0];
    const eventModal = createEventModalPlugin();



    const calendar = useCalendarApp({

        calendars: {
            team1: {
                colorName: "firstTeam",
                 lightColors: {
                    main: '#f91c45',
                    container: '#ffd2dc',
                    onContainer: '#59000d',
                },
                darkColors: {
                    main: '#ffc0cc',
                    container: '#a24258',
                    onContainer: '#ffdee6',
                },
            },

            team2: {
                colorName: "team2",
                lightColors: {
                    main: '#f9d71c',
                    container: '#fff5aa',
                    onContainer: '#594800',
                },
                darkColors: {
                    main: '#fff5c0',
                    container: '#a29742',
                    onContainer: '#fff5de',
                },
            }
        },

    
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Tiempo por tiempo',
        start: Temporal.PlainDate.from('2026-01-05'),
        end: Temporal.PlainDate.from('2026-01-05'),
        calendarId: "team1",
        description: "Tiempo por tiempo Giovanni"
      },
      {
        id: '2',
        title: 'Denso iot',
        start: Temporal.PlainDate.from('2026-01-15'),
        end: Temporal.PlainDate.from('2026-03-20'),
        calendarId: "team2"
      },
      {
        id: '3',
        title: 'Vacaciones',
        start: Temporal.PlainDate.from('2026-01-20'),
        end: Temporal.PlainDate.from('2026-02-01'),
        calendarId: "team3"
      },
      {
        id: '4',
        title: 'DENSO OKM250772',
        start: Temporal.PlainDate.from('2026-01-05'),
        end: Temporal.PlainDate.from('2026-01-10'),
        
      },
    ],
    plugins: [eventsService, eventModal]
  })
  return (
   <>

    <div className='h-screen'>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
   </>
  )
}
