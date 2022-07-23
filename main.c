#include "oxe.h"

OXE main()
{
    Display* display = XOpenDisplay(NILL);
    Window window = XCreateSimpleWindow(display, 
    XDefaultRootWindow(display),
    100, 100, 200, 200, 4, 0, 0);
    
    XStoreName(display, window, "title");
      

    XEvent event;

    XMapWindow(display, window);
    XSelectInput(display, window, KeyPressMask | ButtonPressMask | ExposureMask);

    while (TRUE) {
      XNextEvent(display, &event);
      printf("%d\n", event.type);
    }

    return 0;
}