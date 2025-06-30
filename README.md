# calculator

How this calculator works:
-To begin, insert a first number, an operator (a grey button except the equals and the M+ button), and another number.
-If the equals button is pressed, the top display will show the answer. If, instead, another operator button is pressed, the top display will show the result of the first operation, which will become the first term in the bottom display, followed by the latest operator input by the user. 

The decimal precision has been set to 3 digits, and the maximum length of a given term has been set to 17. This leads to a maximum integer part length of 13 digits for positive numbers and 12 digits for negative numbers. A calculation that leads to a positive number with integer part larger than 13 digits (or larger than 12 digits for negative numbers) will yield Inf/-Inf in the top display. Division by 0 will yield an error message in the top display.