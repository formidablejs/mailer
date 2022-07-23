exports.Package = class Package {
  publish(language = 'imba') {
    const ext = language.toLowerCase() == 'imba'
      ? 'imba' : (
        language.toLowerCase() == 'typescript' ? 'ts' : 'imba'
      )

    const configKey = `config/mail.${ext}`;
    const configValue = `./formidable/config.${ext}`;

    return {
      'components': {
        paths: {
          'resources/views/mail/vendor': './formidable/templates',
        }
      },
      config: {
        paths: {
          [configKey]: configValue
        }
      }
    }
  }
}
