#!/bin/bash

# Prompt the user to enter multiple strings to search (separated by spaces)
echo "Enter two or more strings to search (separated by spaces):"
read -a search_strings

# count=${#search_strings[@]}

# echo "Number of search strings: $count"

# echo "${search_strings}"

# for string in "${search_strings[@]}"; do

(for string in "${search_strings[@]}"; do ag -wl $string; done) | sort | uniq -c | sort -n
# (for string in "${search_strings[@]}"; do ag -l $string; done)
