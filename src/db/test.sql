CREATE TABLE
    doctors (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        lastname TEXT NOT NULL,
        firstname TEXT NOT NULL,
        middlename TEXT NOT NULL,
        username TEXT
    );

INSERT INTO
    doctors (lastname, firstname, middlename, username)
VALUES
    ('Johnson', 'Michael', 'Lee', 'MicJoh'),
    ('Brown', 'Daniel', 'Robert', 'Danbro'),
    ('Wilson', 'Sarah', 'Mary', 'Marysah'),
    ('Taylor', 'Olivia', 'Ann', 'Tayann'),
    ('Williams', 'Jessica', 'Ann', 'WillJess'),
    ('Miller', 'David', 'Joseph', 'JoMi'),
    ('Smith', 'Emily', 'Elizabeth', 'Smilly'),
    ('Davis', 'Christopher', 'James', 'JD'),
    ('Johnson', 'Jane', 'Marie', 'MarieJane');

CREATE TABLE
    roles (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

INSERT INTO
    roles (name)
VALUES
    ('surgeon'),
    ('first assistant'),
    ('second assistant'),
    ('x-ray'),
    ('arrhythmologist');

CREATE TABLE
    doctor_roles (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        role_id INTEGER NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (role_id) REFERENCES roles (id)
    );

INSERT INTO
    doctor_roles (doctor_id, role_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 3),
    (6, 3),
    (7, 3),
    (8, 4),
    (9, 5);

CREATE TABLE
    events (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        duty_doctor INTEGER DEFAULT NULL,
        vacations INTEGER DEFAULT NULL,
        appointments INTEGER DEFAULT NULL,
        business_trips INTEGER DEFAULT NULL,
        FOREIGN KEY (duty_doctor) REFERENCES doctors (id),
        FOREIGN KEY (vacations) REFERENCES vacations (id),
        FOREIGN KEY (appointments) REFERENCES appointments (id),
        FOREIGN KEY (business_trips) REFERENCES business_trips (id),
        UNIQUE (date)
    );

CREATE TABLE
    vacations (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        event_id INTEGER NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (event_id) REFERENCES events (id),
        UNIQUE (doctor_id, event_id)
    );

CREATE TABLE
    appointments (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        event_id INTEGER NOT NULL,
        location TEXT,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (event_id) REFERENCES events (id)
    );

CREATE TABLE
    business_trips (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        event_id INTEGER NOT NULL,
        city TEXT NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (event_id) REFERENCES events (id)
    );

-- GET ALL DOCTORS INFO
SELECT
    d.id AS doctor_id,
    d.lastname,
    d.firstname,
    d.middlename,
    d.username,
    r.name AS role
FROM
    doctors d
    JOIN doctor_roles dr ON d.id = dr.doctor_id
    JOIN roles r ON dr.role_id = r.id