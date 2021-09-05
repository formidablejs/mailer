# Formidable Mailer

## Install

This package is automatically installed with the Formidable Framework.

```
npm i @formidablejs/mailer
```

## Introduction

Formidable Mailer is a simple mailer library for sending emails. This mailer package is built on top of [nodemailer](https://nodemailer.com/).

## Configuration

Before you can start sending emails, you will need to configure your default transport. You can do so by passing a transport object to the `configure()` method of the `Mail` class:

```js
import { Mail } from '@formidablejs/mailer'

Mail.configure({
	default: 'smtp'
	mailers: {
		smtp: {
			transport: 'smtp'
			host: 'smtp.example.com'
			port: 465
			secure: true
			username: 'email@example'
			password: 'password'
		}
	}
	from: {
		address: 'email@example'
		name: 'example'
	}
})
```

> Note, there's no need to configure Formidable Mailer in a Formidablejs application as this is done for you automatically.

## Sending Raw Emails

Here's an example of how to send an email:

```js
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').raw('This is a test email')
```

## Sending HTML Emails

Before you can start sending html emails, you will need to create a new Mailable. All Mailables must extend the `Mailable` class:

```py
import { Mailable } from '@formidablejs/mailer'

export default WelcomeEmail < Mailable

	prop subject\String
	prop name\String

	def constructor name\String
		super!

		self.subject = 'Welcome to Formidable'
		self.name = name

	def render
		<p> "Welcome to Formidable, {self.name}"
```

Now that you've created a Mailable, you can use the `send` method of the `Mail` class to send it:

```js
Mail.to('email@example').send(new WelcomeEmail)
```

## Mail API

Here is a list of all the methods available on the `Mail` class.

 Method    | Params                                  | Description
-----------|:----------------------------------------|:------------------------------------------
 `to`      | `recipient: String[] or String`         | Recipients of the email.
 `cc`      | `recipient: String[] or String`         | Carbon copy recipients of the email.
 `bcc`     | `recipient: String[] or String`         | Blind carbon copy recipients of the email.
 `from`    | `name: String, email: String`           | Sender of the email.
 `replyTo` | `email: String`                         | Reply to address of the email.
 `raw`     | `content: String; text: String or null` | Raw email content.
 `subject` | `subject: String`                       | Subject of the email.
 `send`    | `mailable: Mailable`                    | Send the email with a Mailable class.

Security
--------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.
