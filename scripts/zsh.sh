#!/bin/bash
source $PWD/scripts/helpers.sh

PLUGINS=${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins
THEMES=${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes

install_or_update $PLUGINS https://github.com/zsh-users/zsh-syntax-highlighting
install_or_update $PLUGINS https://github.com/supercrabtree/k
install_or_update $PLUGINS https://github.com/zsh-users/zsh-autosuggestions

cp files/smcgee31.zsh-theme ~/.oh-my-zsh/custom/themes

chsh -s /bin/zsh
