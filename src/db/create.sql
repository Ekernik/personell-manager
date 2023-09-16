CREATE TABLE
    users (
        user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        hash TEXT NOT NULL,
        role TEXT NOT NULL,
        last_seen TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    users (username, hash, role)
VALUES
    (
        'guest_user',
        '$2b$10$VcB3QxmeWcJ2xgfvPALsWusoNsxCxBuWdQ1IwbahYpJFRQHfXERzu',
        'guest'
    ),
    (
        'administrator',
        '$2b$10$VcB3QxmeWcJ2xgfvPALsWusoNsxCxBuWdQ1IwbahYpJFRQHfXERzu',
        'admin'
    ),
    (
        'developer',
        '$2b$10$l61JFeD8TRnBuej7ijXqluT07fjEXXa5NQedrTHgShw//0jU7tiUG',
        'master'
    );

-- Password for guest_user and administrator is 12345
-- Password for developer is 0000
CREATE TABLE
    doctors (
        doctor_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        lastname TEXT NOT NULL,
        firstname TEXT NOT NULL,
        middlename TEXT NOT NULL,
        is_surgeon INTEGER NOT NULL DEFAULT 0,
        is_first_assistant INTEGER NOT NULL DEFAULT 0,
        is_second_assistant INTEGER NOT NULL DEFAULT 0,
        username TEXT
    );

INSERT INTO
    doctors (
        lastname,
        firstname,
        middlename,
        is_surgeon,
        is_first_assistant,
        is_second_assistant,
        username
    )
VALUES
    ('Johnson', 'Michael', 'Lee', 1, 0, 0, 'MicJoh'),
    ('Brown', 'Daniel', 'Robert', 1, 0, 0, 'Danbro'),
    ('Wilson', 'Sarah', 'Mary', 1, 0, 0, 'Marysah'),
    ('Taylor', 'Olivia', 'Ann', 0, 1, 0, 'Tayann'),
    ('Williams', 'Jessica', 'Ann', 0, 1, 0, 'WillJess'),
    ('Miller', 'David', 'Joseph', 0, 1, 0, 'JoMi'),
    ('Smith', 'Emily', 'Elizabeth', 0, 0, 1, 'Smilly'),
    ('Davis', 'Christopher', 'James', 0, 0, 1, 'JD'),
    ('Johnson', 'Jane', 'Marie', 0, 0, 1, 'MarieJane');

CREATE TABLE
    events (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        duty TEXT,
        vacation TEXT,
        appointments TEXT,
        trips TEXT
    );