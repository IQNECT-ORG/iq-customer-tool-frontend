tar_extract 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2' do
  target_dir '/usr/local/bin'
  creates '/usr/local/phantomjs'
  tar_flags [
    '--extract phantomjs-2.1.1-linux-x86_64/bin/phantomjs',
    '--strip-components 2'
  ]
  compress_char 'j'
end
