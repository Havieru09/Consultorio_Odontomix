<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConsultaMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $msg;

    public function __construct($msg)
    {
        $this->msg = $msg;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CONSULTA MEDICA AGENDADA',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'welcome',
        );
    }

}
