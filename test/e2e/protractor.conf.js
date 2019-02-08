
// Environments configs
const configs = {
  local: {
    baseUrl: 'http://localhost:3000',
    baseConfig: 'local'
  },
  development: {
    baseUrl: 'http://localhost:3000',
    baseConfig: 'local'
  },
  test: {
    baseUrl: 'http://localhost:3000',
    baseConfig: 'local'
  }
};

// Get env from process.env
const getEnv = () => {
  const envs = Object.keys(configs);
  const env = process.env.env;
  if (envs.includes(env)) {
    return env;
  }
  return null;
};

// Set env (local is default)
const env = process.env.NODE_ENV || 'local';

// Set version
const version = process.env.version;

// Get job-name
const getJobName = () => {
  if (version) {
    return `mercadolivre-${version}`;
  }
  return `mercadolivre-${env}`;
};

// Set job-name
const jobName = getJobName();
console.log(`Starting protractor ${jobName}`);

// Base configs
const baseConfigs = {
  // Local configuratiom
  local: {
    // Rodar direto no browser local
    directConnect: true,
    capabilities: {
      browserName: 'chrome'
    }
  },
  // Sauce configuratiom
  sauce: {
    sauceUser: 'gestaodeativos',
    sauceKey: '5975413b-e51d-4924-aa46-6e993e1bf259',
    capabilities: {
      browserName: 'chrome',
      name: jobName,
      maxDuration: 10800,
      recordScreenshots: false,
      recordVideo: false,
      recordLogs: false
    },
    onComplete() {
      const printSessionId = () => {
        browser.getSession().then(session => {
          // Integrate with https://wiki.jenkins.io/display/JENKINS/Sauce+OnDemand+Plugin
          console.log(`SauceOnDemandSessionID=${session.getId()} job-name=${jobName}`);
        });
      };
      printSessionId();
    }
  }
};

// Common config for all environments
const commonConfig = {
  framework: 'mocha',

  specs: [
    './specs/*_spec.js'
  ],

  onPrepare() {
    const width = 1024;
    const height = 768;
    browser.driver.manage().window().setSize(width, height);
    browser.manage().timeouts().pageLoadTimeout(5000);
    browser.manage().timeouts().implicitlyWait(4000);

    browser.ignoreSynchronization = true;
  },

  // Resultado dos Testes *COM* Screenshots
  // mochaOpts: {
  //  showColors: true,
  //   verbose: true,
  //   timeout: 30000,
  //   reporter: 'mochawesome-screenshots',
  //   reporterOptions: {
  //     reportDir: './tests/results',
  //     reportName: 'MercadoLivre_Automation_Results',
  //     reportTitle: 'MercadoLivre - Automation Results',
  //     reportPageTitle: 'MercadoLivre - Automation Tests',
  //     takePassedScreenshot: true, // Option to control the scope of screenshots
  //     clearOldScreenshots: true,
  //     jsonReport: false,
  //     multiReport: false // Use 'multiReport = true' for parallel test execution
  //   }
  // }

  // Resultado dos Testes *SEM* Screenshots
  mochaOpts: {
    showColors: true,
    verbose: true,
    timeout: 50000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: './test/results',
      reportFilename: 'MercadoLivre_Automation_Results_Mochawesome',
      reportTitle: 'MercadoLivre - Automation Results',
      reportPageTitle: 'MercadoLivre - Automation Tests',
      inlineAssets: true
    // autoOpen: true
    }
  }

};

// Join configs
const config = configs[env];
const baseConfig = baseConfigs[config.baseConfig];

module.exports.config = Object.assign(config, baseConfig, commonConfig);
