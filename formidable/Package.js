exports.Package = class Package {
  publish() {
    return {
      'components': {
        paths: {
          'resources/views/mail/vendor': './formidable/templates',
        }
      },
      config: {
        paths: {
          'config/mail.imba': './formidable/config.imba'
        }
      }
    }
  }
}
