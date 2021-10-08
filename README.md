# Formidable Mailer

## Introduction

Formidable Mailer is a simple mailer library for sending emails. This mailer package is built on top of [nodemailer](https://nodemailer.com/).

## Install

This package is automatically installed with the Formidable Framework.

npm:

```
npm i @formidablejs/mailer
```

yarn:

```
yarn add @formidablejs/mailer
```

## Publish

Once the package has been installed, you can publish the package:

```
craftsman publish --package=@formidablejs/mailer --tag="components,config"
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

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example').attach({ path: file }).raw('This is a test email')
```

You can also send multiple attachments:

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({ path: formidableLogo })
	.attach({ path: imbaLogo })
	.raw('This is a test email')
```

You may also pass an array of attachments instead of a single attachment each time you call `attach`:

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

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

### Attachments

You can attach files to the email by passing an array of attachment objects or a single object to the `attach` method:

```js
import { Mailable } from '@formidablejs/mailer'
import path from 'path'

export default WelcomeEmail < Mailable

	prop subject\String
	prop name\String

	def constructor name\String
		super!

		self.subject = 'Welcome to Formidable'
		self.name = name

		const file\String = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

		self.attach({ path: file })

	def render
		<p> "Welcome to Formidable, {self.name}"
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
 `attach`  | `Object[] or Object`                    | Add attachments to the email.
 `raw`     | `content: String; text: String or null` | Raw email content.
 `subject` | `subject: String`                       | Subject of the email.
 `send`    | `mailable: Mailable`                    | Send the email with a Mailable class.

Security
--------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.
