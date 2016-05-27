#!/usr/bin/expect
set key [lindex $argv 0];
set pass [lindex $argv 1];
spawn ssh-add $key
expect "Enter passphrase"
send "$pass\r"
interact