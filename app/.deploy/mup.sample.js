module.exports = {
  servers: {
    one: {
      host: 'study-dojo.me',
      username: 'root',
      password: 'StudyDojo'
    }
  },

  app: {
    name: 'meteor-application-template-react',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'https://study-dojo.me',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      image: 'abernix/meteord:node-12-base',
    },

    enableUploadProgressBar: true
  },

  proxy: {
    domains: 'study-dojo.me',
    ssl: {
      letsEncryptEmail: 'johnson@hawaii.edu',
      forceSSL: true
    }
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
};

