from itertools import combinations

def generate_strings_with_no_repeat_model(inputs=['0', '1', '2', '3','4','5','6','7','8','9']):

    all_combinations = []

    for r in range(1, len(inputs)+1):
        all_combinations.extend(combinations(inputs, r))
    
    return all_combinations

def generate_header_tags(lines = []):
    lines.append('<?xml version="1.0" encoding="UTF-8" standalone="no"?><!--Created with JFLAP 7.1.-->')
    lines.append('<structure>&#13;')
    lines.append('<type>fa</type>&#13;')
    lines.append('<automaton>&#13;')

def close_header_tags(lines = []):
    lines.append('</automaton>&#13;')
    lines.append('</structure>')

def create_transition(lines, previous_state, next_state, on_input):

    lines.append('\t<transition>&#13;')
    lines.append(f'\t\t<from>{previous_state}</from>&#13;')
    lines.append(f'\t\t<to>{next_state}</to>&#13;')
    lines.append(f'\t\t<read>{on_input}</read>&#13;')
    lines.append(f'\t</transition>&#13;')

def create_state(lines, id , name, x_pos=0, y_pos=0, is_initial= False , is_final = False, label = None):

    lines.append(f'\t<state id="{id}" name="{name}">&#13;')
    lines.append(f'\t\t<x>{x_pos}</x>&#13;')
    lines.append(f'\t\t<y>{y_pos}</y>&#13;')

    if label:
        lines.append(f'\t\t<label>{label}</label>&#13;')

    if is_initial:
        lines.append(f'\t\t<initial/>&#13;')

    if is_final:
        lines.append(f'\t\t<final/>&#13;')
    
    lines.append(f'\t</state>&#13;')
    
def generate_state_xml(inputs=['0', '1', '2','3','4','5','6','7','8','9']):
    lines = []
    pos_increment = 250
    x_pos = 0
    y_pos = 0
    prev_len = 0

    # Get all possible states combinations
    combinations = generate_strings_with_no_repeat_model(inputs)

    labeled_combinations = []
    
    for index in range(len(combinations)):
        labeled_combinations.append({"id":index+1, "states":list(combinations[index])})

    # Generate XML format and opening tags for JFLAP structure
    generate_header_tags(lines)

    # Generate the initial state
    create_state(lines=lines, id="0", name="q0", is_initial=True, is_final=True, label="initial", x_pos=0, y_pos=500)

    for state in labeled_combinations:
        id_str = ''.join(state["states"])

        if prev_len != len(state["states"]):
            x_pos += pos_increment
            y_pos = 0

        create_state(
            lines=lines,
            id=state["id"],
            name="q" + str(state["id"]),
            is_final=True,
            label=id_str,
            x_pos=x_pos,
            y_pos=y_pos
        )

        if len(state["states"]) == 1:
            create_transition(
                lines,
                previous_state="0",
                next_state=state["id"],
                on_input=state["states"][-1]
            ) 
        else:
            transition_states = []
            for combination in labeled_combinations:
                if len(combination["states"]) == len(state["states"])-1:
                    transition_states.append(combination)
                    if(set(combination["states"]).issubset(state["states"])):
                        transition_input = [state_input for state_input in state["states"] if state_input not in combination["states"]]
                        create_transition(
                            lines,
                            previous_state = combination["id"],
                            next_state=state["id"],
                            on_input= transition_input[0]
                        ) 
                        

        y_pos += pos_increment
        prev_len = len(state["states"])

    close_header_tags(lines)

    return "\n".join(lines)


# Limit States
xml_content = generate_state_xml(inputs=['0', '1', '2','3','4','5'])

# Full States

# xml_content = generate_state_xml()

with open("states.jff", "w", encoding="utf-8") as f:
    f.write(xml_content)


