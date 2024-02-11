@echo off
cd C:\Sistema Odontomix\Backend\
start "" php artisan serve
cd C:\Sistema Odontomix\Backend
start "" php artisan queue:work