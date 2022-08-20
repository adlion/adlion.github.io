#!/bin/bash


all_arguments="null"
function echo_manual (){
    initialize_colors
    echo_yellow "===== Select one action from the list below: ======"

    echo_yellow "-----------------------Database -----------------------"
    echo_green_title "101. Backend Application"
    echo_green_title "102. Frontend Application"
    echo_green_title "103. FE Component in Project"
    echo_green_title "104. FE Component in Project with module"
    echo_green_title "105. FE Service in Project"
    echo_green_title "106. FE Directive in Project"
    echo_green_title "107.  Library FE"

    echo
    echo_green "Your option:"
    read all_arguments
    read -ra arr <<<"$all_arguments"
    if [ "$all_arguments" != "null" ]; then
        echo_green "Working..."
        parsing_arguments 
    fi
    read -n 1 -s -r -p "Press any key to continue"
}

function parsing_arguments (){
        case $all_arguments in
            "101" )
                echo_yellow "----------------------- Backend Application -----------------------"
                read -p "Project name? " answer
                if [[ -n $answer ]]; then
                        nx g @nx-go/nx-go:application be/$answer
                else
                    option_unknown
                fi
            ;;
            102 )
            echo_yellow "----------------------- Frontend Application -----------------------"
                read -p "Project name? " answer
                if [[ -n $answer ]]; then
                        nx g @nrwl/angular:application fe/$answer
                else
                    option_unknown
                fi
            ;;
            103 )
                echo_yellow "----------------------- FE Component in Project -----------------------"
                read -p "Component name? " component
                if [[ -z $component ]]; then
                    option_unknown
                fi

                read -p "Project name? " app_name
                if [[ -n $app_name ]]; then
                    nx g @nrwl/angular:component $component --project=$app_name
                else
                    option_unknown
                fi

            ;;
            104 )
                echo_yellow "----------------------- FE Component in Project with module -----------------------"
                read -p "Component name (this will also be module name) ? " component
                if [[ -z $component ]]; then
                    option_unknown
                fi

                read -p "Project name? " app_name
                if [[ -n $app_name ]]; then
                   nx g @nrwl/angular:module $component --project=$app_name &&  nx g @nrwl/angular:component $component --project=$app_name 
                else
                    option_unknown
                fi
            ;;
            105 )
                echo_yellow "----------------------- FE Service in Project -----------------------"
                read -p "Service name ? " service
                if [[ -z $service ]]; then
                    option_unknown
                fi

                read -p "Project name? " app_name
                if [[ -n $app_name ]]; then
                    nx g @nrwl/angular:service $service --project=$app_name 
                else
                    option_unknown
                fi
            ;;
            106 )
                echo_yellow "----------------------- FE Directive in Project -----------------------"
                read -p "Directive name ? " directive
                if [[ -z $directive ]]; then
                    option_unknown
                fi

                read -p "Project name? " app_name
                if [[ -n $app_name ]]; then
                    nx g @nrwl/angular:directive $directive --project=$app_name 
                else
                    option_unknown
                fi
            ;;
            107 )

                echo_yellow "----------------------- Library FE -----------------------"
                read -p "Project directory? " directory
                if [[ -z $directory ]]; then
                    option_unknown
                fi
                read -p "Library name ? " library
                if [[ -n $library ]]; then
                   nx g @nrwl/angular:lib --name=$library --prefix=noi --directory=$directory --simpleModuleName
                else
                    option_unknown
                fi
            ;;
            *)
                echo_red "Option $a not known"
            ;;
            
        esac
    
}


function option_unknown() {
    echo_red "Option not known"
}
#Canalize the echo functions
function last_echo() {
    echo -e "${2}$*${normal_color}"
}

#Initialize colors vars
function initialize_colors() {
    normal_color="\e[1;0m"
    green_color="\033[1;32m"
    green_color_title="\033[0;32m"
    red_color="\033[1;31m"
    red_color_slim="\033[0;031m"
    blue_color="\033[1;34m"
    cyan_color="\033[1;36m"
    brown_color="\033[0;33m"
    yellow_color="\033[1;33m"
    pink_color="\033[1;35m"
    white_color="\e[1;97m"
}


#Print green messages
function echo_green() {
    last_echo "${1}" "${green_color}"
}

#Print blue messages
function echo_blue() {
    last_echo "${1}" "${blue_color}"
}

#Print yellow messages
function echo_yellow() {
    last_echo "${1}" "${yellow_color}"
}

#Print red messages
function echo_red() {
    last_echo "${1}" "${red_color}"
}

#Print red messages using a slimmer thickness
function echo_red_slim() {
    last_echo "${1}" "${red_color_slim}"
}

#Print black messages with background for titles
function echo_green_title() {
    last_echo "${1}" "${green_color_title}"
}

#Print pink messages
function echo_pink() {
    last_echo "${1}" "${pink_color}"
}

#Print cyan messages
function echo_cyan() {
    last_echo "${1}" "${cyan_color}"
}

#Print brown messages
function echo_brown() {
    last_echo "${1}" "${brown_color}"
}

#Print white messages
function echo_white() {
    last_echo "${1}" "${white_color}"
}


echo_manual
