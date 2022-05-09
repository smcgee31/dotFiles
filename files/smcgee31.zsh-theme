
# Provide information about ahead/behind tracked branch
function git_remote_status {
	if [ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1; then

		# check if the branch is tracking against an upstream branch
		if git rev-list --right-only --count HEAD...@'{u}' > /dev/null 2>&1; then

			TRACKED="$(git rev-parse --abbrev-ref --symbolic-full-name @{u})"
			REMOTE_COLOR="%{$fg[green]%}"
			BEHIND="$(git rev-list --right-only --count HEAD...@'{u}')"
			AHEAD="$(git rev-list --left-only --count HEAD...@'{u}')"

			if [[ "$BEHIND" > 0 ]] || [[ "$AHEAD" > 0 ]]; then
				REMOTE_COLOR="%{$fg[red]%}"
				REMOTE_DIFF="%{$fg[white]%}:"

				if [[ "$AHEAD" > 0 ]]; then
					REMOTE_DIFF="${REMOTE_DIFF}${GIT_REMOTE_STATUS_AHEAD}${AHEAD}"
				fi

				if [[ "$BEHIND" > 0 ]]; then
					REMOTE_DIFF="${REMOTE_DIFF}${GIT_REMOTE_STATUS_BEHIND}${BEHIND}"
				fi
			fi

			REMOTE_STATUS="%{$fg[magenta]%} [${REMOTE_COLOR}${TRACKED}${REMOTE_DIFF}%{$fg[magenta]%}]"
		fi

		echo "$REMOTE_STATUS"
	fi
}

function node_version {
    if hash node 2>/dev/null; then
        echo "%{$fg[silver]%}Node %{$reset_color%}%{$fg[cyan]%}$(node --version)%{$reset_color%}"
    fi
}

function node_and_npm_version {
    if hash node 2>/dev/null; then
        echo "%{$fg[silver]%}Node %{$reset_color%}%{$fg[cyan]%}$(node --version)%{$reset_color%} | %{$fg[silver]%}NPM %{$reset_color%}%{$fg[cyan]%}v$(npm --version)%{$reset_color%}"
    fi
}

function chpwd() {
    emulate -L zsh
}

TRAPINT() {
    print -n "^C"
    return $(( 128 + $1 ))
}

function precmd() {
    echo -ne "\033]0;${PWD##*/}\007"
}

# Provide information about ahead/behind tracked branch
function git_stash_status {
	if [ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1; then

		# check if there is a stash
		if git rev-parse --verify --quiet refs/stash >/dev/null; then
			echo "${GIT_STASH_STATUS}"
		fi

	fi
}


# Standard prompt
# PROMPT='
# $fg[silver]%w, %* $fg[blue]%n$fg[cyan]@$fg[yellow]%m $fg[green]%~$reset_color
# %{$fg[magenta]%}$(git_prompt_info)$(git_prompt_status)%{$reset_color%}$(git_stash_status)$(git_remote_status)%{$reset_color%} $ '
PROMPT='
$fg[silver]%w, %* $fg[green]%~$reset_color
%{$fg[magenta]%}$(git_prompt_info)$(git_prompt_status)%{$reset_color%}$(git_stash_status)$(git_remote_status)%{$reset_color%}
$ '

# Prompt right aligned
RPROMPT='$(node_and_npm_version)'

# git prompt info
ZSH_THEME_GIT_PROMPT_PREFIX="("
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[green]%} ✔"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[red]%} ✘"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$fg[magenta]%})"

# git prompt status
ZSH_THEME_GIT_PROMPT_DELETED="%{$fg[red]%} ✗"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$fg[cyan]%} ≫"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$fg[yellow]%} ✭"
ZSH_THEME_GIT_PROMPT_ADDED="%{$fg[green]%} ✣"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$fg[magenta]%} ✂"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg[black]%} ✱"

# git remote status - custom function
GIT_REMOTE_STATUS_BEHIND="-"
GIT_REMOTE_STATUS_AHEAD="+"

# git stash status - custom function
GIT_STASH_STATUS="%{$fg[red]%} §"
