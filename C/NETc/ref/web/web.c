/*

learning how to build web application with c programming
@2022
@FreezB11



*/

//include required library
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <err.h>
#include <time.h>
#include <sys/wait.h>
#include <signal.h>
#include <sys/sendfile.h>
#include <fcntl.h>
#include <sys/stat.h>

#define ServerURL "127.0.0.1"
#define ServerSocket 8080
#define BacklogSize 10

char pageNotFoundPage[] =
"HTTP/1.1 404 PageNotFound\r\n"
"Content-Type: text/html; charset=UTF-8\r\n\r\n"
"<!DOCTYPE html>\r\n"
"<html><head><title>Page Not Found</title>\n"
"</head>\n"
"<body><center><h1>Page Not Found!</h1></center>\n"
"</body></html>\n";

char webpageHeaderOK[] = 
"HTTP/1.1 200 OK\r\n"
"Content-Type: text/html; charset=UTF-8\r\n\r\n"
"<!DOCTYPE html>\r\n";

enum httpRequestType {
    UNKOWN, GET, POST
};