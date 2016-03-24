ruby_block 'npm_bin_path' do
    block do
        #tricky way to load this Chef::Mixin::ShellOut utilities
        Chef::Resource::RubyBlock.send(:include, Chef::Mixin::ShellOut)
        command = 'npm bin -g'
        command_out = shell_out(command)
        Chef::Log.info(command_out.stdout)
        node.set['npm_bin_path'] = command_out.stdout
    end
    action :create
end


template '/home/vagrant/.bashrc' do
  source 'bashrc.erb'
  owner 'vagrant'
  group 'vagrant'
  mode '0644'
  variables (
    lazy {
      { npm_bin_path: node['npm_bin_path'] }
    }
  )
end
