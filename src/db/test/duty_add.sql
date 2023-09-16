INSERT
OR REPLACE INTO events (date, duty_doctor)
VALUES
    (
        "2023-08-12",
        (
            SELECT
                id
            FROM
                doctors
            WHERE
                username = "Marysah"
        )
    );