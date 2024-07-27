#!/bin/bash

# Prompt the user to enter multiple strings to search (separated by spaces)
echo "Enter two or more strings to search (separated by spaces):"
read -a search_strings

# Create an empty array to store the results
result_array=()

# Capture the results of ag command for the first search string
first_search_string="${search_strings[0]}"
while IFS= read -r line; do
    result_array+=("$line")
done < <(ag -wl "$first_search_string")

# Loop through the remaining search strings
for ((i = 1; i < ${#search_strings[@]}; i++)); do
    search_string="${search_strings[i]}"
    temp_array=()

    # Loop through the files in the result_array
    for file in "${result_array[@]}"; do
        # Check if the current file contains the search string
        if ag -wl "$search_string" "$file" >/dev/null; then
            temp_array+=("$file")
        fi
    done

    # Update the result_array with the files that contain the current search string
    result_array=("${temp_array[@]}")
done

# Display the matching files where all search strings appear
echo "Matching files:"
printf '%s\n' "${result_array[@]}"
