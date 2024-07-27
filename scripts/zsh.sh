#!/bin/bash
source $PWD/scripts/helpers.sh

PLUGINS=${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins
THEMES=${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes

install_or_update $PLUGINS https://github.com/zsh-users/zsh-syntax-highlighting
install_or_update $PLUGINS https://github.com/supercrabtree/k
install_or_update $PLUGINS https://github.com/zsh-users/zsh-autosuggestions

# cp files/smcgee31.zsh-theme ~/.oh-my-zsh/custom/themes


#### For the vpn file that runs openconnect ####
sudo chmod 755 ./files/vpn           # make sure that the vpn file is an executable
sudo cp ./files/vpn /usr/local/bin   # copy the file instead doing a symlink -> now `which vpn` says /usr/local/bin/vpn and it works

# this makes a symlink but doesn't seem to work - probably the System Integrity Protection for macs >= El_Capitan
# sudo ln -s ./files/vpn /usr/local/bin
####

# copy these files to /usr/local/bin for use everywhere, ie. using the cmd `search`
sudo cp ./files/output-colors.js /usr/local/bin/output-colors.js
sudo cp ./files/search.js /usr/local/bin/search
sudo cp ./files/gupdate /usr/local/bin/gupdate
sudo chmod 755 /usr/local/bin/gupdate

chsh -s /bin/zsh
