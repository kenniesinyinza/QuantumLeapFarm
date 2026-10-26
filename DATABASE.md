# Local SQLite accounts database

The sign-up and sign-in pages use PHP sessions and a SQLite database. Passwords are stored as PHP password hashes, not plain text. The database is stored in `storage/quantumleap.sqlite`; the API creates its `users` table automatically.

## Run locally

Double-click `start-local.bat`. The launcher runs the PHP website at <http://127.0.0.1:8000>. No separate database server or setup is needed; PHP creates the SQLite file and table automatically. Keep the terminal window open while using the site. Do not use VS Code Live Server for authentication; it does not execute the PHP API.

To view registrations, open the `storage/quantumleap.sqlite` file with a SQLite viewer and inspect the `users` table. Its `email` and `created_at` fields show the account and registration date. The stored `password_hash` is a one-way hash; the original password is never saved.

Existing MySQL accounts have been copied to the SQLite database where they were not already present; the MySQL database was left unchanged. Back up `storage/quantumleap.sqlite` to preserve registrations. Google sign-in and password recovery are not enabled because the project has no provider credentials or recovery-mail service.
