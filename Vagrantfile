VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Use Ubuntu 14.04 Trusty Tahr 64-bit as our operating system
  config.vm.box = 'ubuntu/trusty64'

  # Configurate the virtual machine to use 2GB of RAM
  config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--memory', '1024']
  end

  config.vm.network :forwarded_port, guest: 8080, host: 8080
  config.vm.network :forwarded_port, guest: 35729, host: 35729

  config.omnibus.chef_version = '12.10.24'

  config.vm.provision :shell, :inline => "ulimit -n 4048"
  # Use Chef Solo to provision our virtual machine
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ['cookbooks']

    chef.add_recipe 'apt'
    chef.add_recipe 'locale'
    chef.add_recipe 'build-essential'
    chef.add_recipe 'git'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'custom::bashrc'
    chef.add_recipe 'custom::gems'
    chef.add_recipe 'custom::phantomjs'

    chef.json = {
      nodejs: {
        install_method: 'binary',
        version: '5.7.0',
        binary: {
          url: 'https://nodejs.org/dist/v5.7.0/node-v5.7.0-linux-x64.tar.gz',
          checksum: 'ae24ae3076393e7968316098ddbb0221bde0830a0e9d878c6493604e1cc553c1'
        },

        npm_packages: [
          {
            name: 'grunt-cli'
          },
          {
            name: 'karma-cli'
          }
        ]
      }
    }
  end
end