#include<stdio.h>
#include<string.h>	//strlen
#include<sys/socket.h>
#include<arpa/inet.h>	//inet_addr

int main(int argc , char *argv[])
{
	int socket_desc;
    // function socket() creates a socket 
    // AF_net -- IP4
    //sock_stream  tcp (or) sock_dgram -- UDP protocol
	socket_desc = socket(AF_INET , SOCK_STREAM , 0);
    char *message;

    /*
    struct sockaddr_in {
        short sin_family;
        unsigned short sin_port;
        struct in_addr sin_addr;
        char sin_zero[];
    };

    struct in_addr {
        unsigned long s_addr;
    };

    struct sockaddr {
        unsigned short sa_family;
        char sa_data[14];
    }


    
    */
    struct sockaddr_in server;

    if (socket_desc == -1)
	{
		printf("Could not create socket");
	}
	
	

    server.sin_addr.s_addr = inet_addr("74.125.235.20");
    server.sin_family = AF_INET;
    server.sin_port = htons( 80 );
	

    if (connect(socket_desc , (struct sockaddr *)&server , sizeof(server)) < 0)
	{
		puts("connect error");
		return 1;
	}
	
	puts("Connected");

    message = "GET / HTTP/1.1\r\n\r\n";
	if( send(socket_desc , message , strlen(message) , 0) < 0)
	{
		puts("Send failed");
		return 1;
	}
	puts("Data Send\n");
	
	return 0;
	
}