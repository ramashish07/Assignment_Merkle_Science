# Mercel Science Frontend Assignment




### Tech stack

- Reactjs
- Tailwind CSS
- Typescript

### Folder Strucure
```
project-root/
├── public/
├── src/
    ├── assets/
    ├── components/
         ├── CalenderDays.tsx
         ├── SelectCountry.tsx
         ├── SelectMonth.tsx
         ├── SelectYear.tsx
         ├── UnitCellCalender.tsx
├── constants/
    ├── countries.js
├── hooks/
    ├── useCalender.tsx  
├── tests/
    ├── daysInMonth.tsx
├── utils/
    ├── calenderForMonth.tsx
    ├── daysInParticularMonth.tsx
└── app.css
└── app.tsx
└── index.css
└── index.tsx
└── tailwind.config.js
└── tsconfig.json

    
```
### Features 

- Holiday in Calender : 
   User can see all the holiday  of a month specific to a day, month,year and loaction.
  ![image](https://github.com/ramashish07/Assignment_Mercel_Science/assets/91429764/47179974-4c61-4015-939f-e2f05c50bb4c)

- Holiday Description : User can see the detailed Description of a particular holiday on click.
![image](https://github.com/ramashish07/Assignment_Mercel_Science/assets/91429764/e23fc26e-af52-4256-b7ec-538014b077cb)
- Responsive : Utilised tailwind css breakpoints for making  it completely responsive.
- DarkMode/LightMode
- Added basic unit test using jest
- Notification using Toast
     Used toast for showing notification when the api loads holidays
- Today button redirects user to current date.

