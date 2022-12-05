# Formidable Mailer

![Test](https://github.com/formidablejs/mailer/actions/workflows/test.yml/badge.svg)
![npm](https://img.shields.io/npm/v/@formidablejs/mailer)
![GitHub](https://img.shields.io/github/license/formidablejs/mailer)

## Introduction

Formidable Mailer is a simple mailer library for sending emails. This mailer package is built on top of [nodemailer](https://nodemailer.com/).

## Install

This package is automatically installed with the Formidable Framework.

npm:

```bash
npm i @formidablejs/mailer
```

yarn:

```bash
yarn add @formidablejs/mailer
```

## Publish

Once the package has been installed, you can publish the package:

```bash
node craftsman package:publish --package=@formidablejs/mailer --tag="components,config"
```

> Note: Formidable will automatically publish the package during project setup.

## Configuration

Before you can start sending emails, you will need to configure your default transport. You can do so by passing a transport config object to the `configure` method of the `Mail` class:

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

> Note, there's no need to configure Formidable Mailer in a Formidable application as this is done for you automatically.

## Sending Raw Emails

Here's an example of how to send an email:

```js
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').raw('This is a test email')
```

## Sending Attachments

Here's an example of how to send an email with an attachment:

```imba
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example').attach({ path: file }).raw('This is a test email')
```

You can also send multiple attachments:

```imba
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({ path: formidableLogo })
	.attach({ path: imbaLogo })
	.raw('This is a test email')
```

You may also pass an array of attachments instead of a single attachment each time you call `attach`:

```imba
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach([
		{ path: formidableLogo }
		{ path: imbaLogo }
	])
	.raw('This is a test email')
```

Attachment object consists of the following properties:

* **filename** - filename to be reported as the name of the attached file. Use of unicode is allowed.
* **content** - String, Buffer or a Stream contents for the attachment
* **path** - path to the file if you want to stream the file instead of including it (better for larger attachments)
* **href** – an URL to the file (data uris are allowed as well)
* **httpHeaders** - optional HTTP headers to pass on with the href request, eg. {authorization: "bearer ..."}
* **contentType** - optional content type for the attachment, if not set will be derived from the filename property
* **contentDisposition** - optional content disposition type for the attachment, defaults to ‘attachment’
* **cid** - optional content id for using inline images in HTML message source
* **encoding** - If set and content is string, then encodes the content to a Buffer using the specified encoding. Example values: ‘base64’, ‘hex’, ‘binary’ etc. Useful if you want to use binary attachments in a JSON formatted email object.
* **headers** - custom headers for the attachment node. Same usage as with message headers
* **raw** - is an optional special value that overrides entire contents of current mime node including mime headers. Useful if you want to prepare node contents yourself

## Embedding Images

Attachments can be used as embedded images in the HTML body. To use this feature, you need to set additional property of the attachment - `cid` (unique identifier of the file) which is a reference to the attachment file. The same `cid` value must be used as the image URL in HTML (using `cid:` as the URL protocol, see example below):

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({
		filename: 'imba.png',
		path: file,
		cid: 'imba',
	})
	.raw('Embedded image: <img src="cid:imba"/>')
```

> Note, the `cid` must be unique for each attachment.

## Email Events

### onSuccess

`onSuccess` runs if the email was successfully sent:

```imba
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onSuccess: do(response\SentMessageInfo)
		console.log response.messageId
})
```

### onError

`onError` runs when the email fails:

```imba
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onError: do(reason)
		console.log reason
})
```

### onComplete

`onComplete` runs when the email is task is done:

```imba
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onComplete: do
		console.log 'done'
})
```

## Sending HTML Emails

Before you can start sending html emails, you will need to create a new Mailable. All Mailables must extend the `Mailable` class:

```imba
import { Mailable } from '@formidablejs/mailer'

export default WelcomeEmail < Mailable

	prop subject\String
	prop name\String

	def constructor name\String
		super()

		self.subject = 'Welcome to Formidable'
		self.name = name

	def render
		<p> "Welcome to Formidable, {self.name}"
```

Now that you've created a Mailable, you can use the `send` method of the `Mail` class to send it:

```js
Mail.to('email@example').send(new WelcomeEmail)
```

### Attachments

You can attach files to the email by passing an array of attachment objects or a single object to the `attach` method:

```imba
import { Mailable } from '@formidablejs/mailer'
import path from 'path'

export default WelcomeEmail < Mailable

	prop subject\string
	prop name\string

	def constructor name\String
		super()

		self.subject = 'Welcome to Formidable'
		self.name = name

		const file\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

		self.attach({ path: file })

	def render
		<p> "Welcome to Formidable, {self.name}"
```

## Mail API

Here is a list of all the methods available on the `Mail` class.

 Method    | Params                                  | Description
-----------|:----------------------------------------|:------------------------------------------
 `to`      | `recipient: string[] or string`         | Recipients of the email.
 `cc`      | `recipient: string[] or string`         | Carbon copy recipients of the email.
 `bcc`     | `recipient: string[] or string`         | Blind carbon copy recipients of the email.
 `from`    | `name: string, email: string`           | Sender of the email.
 `replyTo` | `email: string`                         | Reply to address of the email.
 `attach`  | `object[] or object`                    | Add attachments to the email.
 `raw`     | `content: string; text: string or null` | Raw email content.
 `subject` | `subject: string`                       | Subject of the email.
 `send`    | `mailable: Mailable`                    | Send the email with a Mailable class.

Security
--------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.
