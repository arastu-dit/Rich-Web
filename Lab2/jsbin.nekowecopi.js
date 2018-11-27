function Answers(x) {
    
    if (operation == '+') {
        operation = '+';
    } else if (operation == '-') {
        operation = '-';
    } else if (operation == '/') {
        operation = '/';
    } else if (operation == '*') {
        operation = '*';
    } else {
       
        Selection(operation);
    }
    return operation;
}