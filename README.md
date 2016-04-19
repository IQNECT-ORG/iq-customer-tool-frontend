# iq-customer-tool-frontend

## Requirements

### Host Machine

#### Vagrant plugins:

* vagrant-berkshelf (4.1.0)
* vagrant-omnibus (1.4.1)
* vagrant-vbguest (0.11.0)

### Guest Machine

* npm
* node
* ruby
* grunt

@TODO: https://github.com/chriseppstein/sass-css-importer
Need to get this installed via chef.

## Dev

### Environment

* Create env file `cp .env.example .env`
* Fill in all the information
* Set the env `source .env`

### Testing

#### E2E

* https://www.browserstack.com/local-testing
* Host => `./BrowserStackLocal -forcelocal <key>` - The `forcelocal` flag is required to access our docker stack
* Guest => `grunt webdriver`
