#ifndef OXE

#define OXE int
#define NILL ((void *)0)


#define TRUE 1
#define FLASE 0

#include <X11/Xlib.h>
//colour management function
#include <X11/Xcms.h>
#include <stdio.h>


int Create_window(int width, int height, char* title){

    Display* display = XOpenDisplay(NULL);
    Window window = XCreateSimpleWindow(display, XDefaultRootWindow(display),
    100, 100, width, height, 4, 0, 0);

    XStoreName(display, window, title);
    XEvent event;
    XMapWindow(display, window);
    while (TRUE) {
      XNextEvent(display, &event);
      printf("%d\n", event.type);
    }

    return 0;
}

#endif