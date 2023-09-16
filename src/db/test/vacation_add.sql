INSERT INTO
    events (date)
SELECT
    ('2023-08-14')
WHERE
    NOT EXISTS (
        SELECT
            1
        FROM
            events
        WHERE
            date = '2023-08-14'
    );

INSERT
OR IGNORE INTO vacations (doctor_id, event_id)
VALUES
    (
        (
            SELECT
                id
            FROM
                doctors
            WHERE
                username = "Danbro"
        ),
        (
            SELECT
                id
            FROM
                events
            WHERE
                date = "2023-08-14"
        )
    );