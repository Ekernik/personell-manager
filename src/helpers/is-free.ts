import Doctor from '@/types/doctor';

const MIN_OS = 2;
const MIN_1A = 2;
const MIN_2A = 2;

const filterOneDoctor = (group: Doctor[], chosen_doctor: Doctor) =>
  group.filter(doc => doc.doctor_id !== chosen_doctor.doctor_id);

const filterVacation = (
  group: Doctor[],
  vacation: string[],
  chosen_doctor: Doctor,
) =>
  group.filter(
    doc =>
      !vacation?.includes(doc.username) &&
      !vacation?.includes(chosen_doctor.username),
  );

const filterAppointments = (
  group: Doctor[],
  appointments: any,
  chosen_doctor: Doctor,
) =>
  group.filter(
    doc =>
      !appointments?.[doc.username] && !appointments?.[chosen_doctor.username],
  );

const filterTrips = (group: Doctor[], trips: any, chosen_doctor: Doctor) =>
  group.filter(
    doc => !trips?.[doc.username] && !trips?.[chosen_doctor.username],
  );

const isEnough = (
  doctors: Doctor[],
  chosen_doctor: Doctor,
  day_events: any,
  min_doctors: number,
) => {
  const doctorsWithoutChosenDoctor = filterOneDoctor(doctors, chosen_doctor);

  if (doctorsWithoutChosenDoctor.length < min_doctors) return false;
  const doctorsNotOnVacation = filterVacation(
    doctorsWithoutChosenDoctor,
    day_events?.vacation,
    chosen_doctor,
  );

  if (doctorsNotOnVacation.length < min_doctors) return false;

  const doctorsNotOnAppointment = filterAppointments(
    doctorsNotOnVacation,
    day_events?.appointments,
    chosen_doctor,
  );

  if (doctorsNotOnAppointment.length < min_doctors) return false;

  const doctorsNotOnTrip = filterTrips(
    doctorsNotOnAppointment,
    day_events?.trips,
    chosen_doctor,
  );

  if (doctorsNotOnTrip.length < min_doctors) return false;

  return doctorsNotOnTrip.length >= min_doctors;
};

export const isFree = (
  all_doctors: Doctor[],
  chosen_doctor: Doctor,
  day_event: any,
) => {
  const surgeons = all_doctors.filter(doc => doc.is_surgeon);
  const first_assistans = all_doctors.filter(doc => doc.is_first_assistant);
  const second_assistans = all_doctors.filter(doc => doc.is_second_assistant);

  const isEnoughOS = isEnough(surgeons, chosen_doctor, day_event, MIN_OS);

  const isEnough1A = isEnough(
    first_assistans,
    chosen_doctor,
    day_event,
    MIN_1A,
  );

  const isEnough2A = isEnough(
    second_assistans,
    chosen_doctor,
    day_event,
    MIN_2A,
  );

  const check1 = Boolean(chosen_doctor.is_surgeon) ? isEnoughOS : true;
  const check2 = Boolean(chosen_doctor.is_first_assistant) ? isEnough1A : true;
  const check3 = Boolean(chosen_doctor.is_second_assistant) ? isEnough2A : true;

  return check1 && check2 && check3;
};
