#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <ctype.h>
#define EOT  10
#define NONE 256
#define NUM  257
#define ID   258

int lookahead;
int tokenval;

int analyze(void);
void expr(void);
void term(void);
void factor(void);
void error(void);
void match(int t);

int main() {
	lookahead = analyze();
	expr(); putchar('\n'); 
	_getch(); return 0;
}

int analyze(void)
{
	int t;
	while (1) {
		t = getchar();
		if (t == ' ' || t == '\t') continue;
		if (isdigit(t)) // begin of number!
		{
			tokenval = t - '0';
			t = getchar();
			while (isdigit(t)) {
				tokenval = tokenval * 10 + t - '0';         t = getchar();
			}
			ungetc(t, stdin);        return NUM;
		}
		if (isalpha(t))
		{
			tokenval = t; return ID;
		}
		tokenval = NONE;     return t;
	}
}



void expr(void)
{
	int t;
	term(); // האכוו גלוסעמ erest();
	while (1) {
		t = lookahead;
		switch (lookahead) {
		case '+': case '-':
			{  match(t); term(); putchar(t); continue; }
		case ')': case EOT: return;
		default: error();
		}
	} 
}



void term()
{
	int t;
	factor(); //  האכוו גלוסעמ trest();
	while (1) {
		t = lookahead;
		switch (lookahead) {
		case '*': case '/':
			{match(t); factor(); putchar(t); continue; } 
		case '+': case '-': case ')': case EOT:
			return;
		default: error();
		}
	} 
}



void factor(void)
{
	if (lookahead == '(') {
		match('('); expr(); match(')');
	}
	else if (lookahead == ID) {
		printf("%c ", tokenval); match(lookahead);
	}
	else if (lookahead == NUM) {
		printf("%d ", tokenval); match(lookahead);
	}
	else error();
}

void match(int t) {
	if (lookahead == t)  
		lookahead = analyze();   
	else error();
}

void error(void) { 
	printf("\nSyntax error"); 
	_getch(); exit(1); 
}