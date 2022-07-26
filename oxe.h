#ifndef OXE

#define OXE int
#define NILL ((void *)0)


#define TRUE 1
#define FLASE 0

#include <X11/Xlib.h>
//colour management function
#include <X11/Xcms.h>
#include <stdio.h>


int Create_window(int width, int height){

    Display* display = XOpenDisplay(NILL);
    Window window = XCreateSimpleWindow(display, XDefaultRootWindow(display),
    width, height, 200, 200, 4, 0, 0);

    XStoreName(display, window, "title");
}

#endif