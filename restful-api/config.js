/**
 * Create and export configuration variables
 * Author: Blessing Rweikiza
 */

// Container for all environments
var environments = {};

// Create staging (default) environment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

// Create a production environment
environments.production = {
    'port': 4000,
    'envName': 'production'
};

// Determine which environment was passed as a command-line argument i.e. environment to be exported
var currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';