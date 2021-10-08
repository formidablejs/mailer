exports.Package = class Package {
  publish() {
    return {
      vendor: {
        paths: {
          'resources/views/email/vendor': './install/templates',
        }
      },
      config: {
        paths: {
          'config/mail.imba': './install/config.imba'
        }
      }
    }
  }
}