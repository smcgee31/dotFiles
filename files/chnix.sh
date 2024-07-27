##########   This is specifically a script for Insturcture   ##########
#
#
# Makes a "chruby"-style script for a specific application
# Example:
# ch_myapp() { chnix_specific_app ch_myapp myapp path/to/flake#myapp_v 1.0 "$@"; }
# (1.0 is just an example version used in the help)
# then when you run
#   ch_myapp 1.1
# it will run
#   chnix rm myapp; chnix path/to/flake#myapp_v1.1
# Use
#   ch_myapp system
# To remove myapp nix paths
chnix_specific_app() {
  ch_script_name="$1"
  nix_deriv_name="$2"
  flake_prefix="$3"
  example_version="$4"
  shift 4

  if [[ "$1" == "help" || "$1" == "--help" || "$1" == "-?" ]]; then
    echo "Usage:"
    echo "See current cloudgate nix paths:"
    echo "  $ch_script_name"
    echo "Switch to a version:"
    echo "  $ch_script_name $example_version"
    echo "Switch back to the system:"
    echo "  $ch_script_name system"
  elif [[ -z "$1" ]]; then
    chnix | grep -- -"$nix_deriv_name" || echo system
  elif [[ "$1" == "system" ]]; then
    chnix rm "$nix_deriv_name"
  else
    chnix rm "$nix_deriv_name" 2>/dev/null
    chnix "$flake_prefix""$1" >/dev/null && echo switched to "$1"
  fi
}

# Add a flake's package's bin/ paths to the PATH.
# Remove by running "chnix rm derivationname", where derivationname is the derivation
# name in /nix/store/abc123...-derivationname/bin
chnix() {
  if [[ "$1" == "" || "$1" == "ls" ]]; then
    echo "Nix store paths in PATH: "
    echo "$PATH" | tr ':' '\n' | grep /nix/store
    echo "---"
    echo "To add, use:"
    echo "  chnix path-to-flake#package-name [path-to-flake-2#package-name-2 ...]"
    echo "To remove, use:"
    echo "  chnix rm deriv-name-1 [deriv-name-2 ...]"
  elif [[ "$1" == "add"  && "$2" == "" ]]; then
    echo "Usage: chnix [add] path-to-flake#package-name [path-to-flake-2#package-name-2 ...]"
  elif [[ "$1" == *#*  || "$1" == "add" ]]; then
    [[ "$1" == "add" ]] && shift
    while [ -n "$1" ]; do
      # TODO: may not like spaces in path
      for dir in $(nix shell "$1" -c bash -c 'echo $PATH' | tr ':' '\n' | grep nix/store | uniq); do
        if [[ "$PATH" == *"$dir"* ]]; then
          echo "$dir" already in path, not adding
        else
          PATH=$dir:$PATH
          echo Adding "$dir"
        fi
      done
      shift
    done
  elif [[ "$1" == "rm" && "$2" == "" ]]; then
    echo "Usage: chnix rm derivname-1 [derivname-2 ...]"
  elif [[ "$1" == "rm" ]]; then
    while [ -n "$2" ]; do
      if { echo "$PATH" | tr ':' '\n' | grep /nix/store | grep ".-$2/"; } >/dev/null 2>/dev/null; then
        for dir in $(echo "$PATH" | tr ':' '\n' | grep /nix/store | grep ".-$2/"); do
          echo Removing "$dir" from path
        done
        PATH="$(
          {
            { echo "$PATH" | tr ':' '\n' | grep -v /nix/store | grep .; } &&
            { echo "$PATH" | tr ':' '\n' | grep /nix/store | grep -v ".-$2/" | grep .; };
          } | tr '\n' ':'
        )"
      else
        echo "No nix paths matching: $2. Run 'chnix' to see paths" >&2
      fi
      shift
    done
  fi
}

  # echo "starting a new shell"
  # nix-
