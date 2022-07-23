;%include "nagoa+.inc"

extern printf
extern ExitProcess

extern RegisterClassExA
extern CreateWindowExA
extern MessageBoxA
extern GetModuleHandleA
extern PeekMessageA
extern TranslateMessage
extern DispatchMessageA
extern PostQuitMessage
extern DefWindowProcA
extern ShowWindow
extern UpdateWindow
extern GetStockObject
extern BeginPaint
extern EndPaint
extern Rectangle
extern Ellipse
extern MoveToEx
extern LineTo
extern DrawTextA
extern SetBkMode
extern SetTextColor
extern CreateSolidBrush
extern CreatePen
extern SelectObject
extern DeleteObject
extern LoadIconA
extern LoadCursorA

%define WS_OVERLAPPED       0x00000000
%define WS_POPUP            0x80000000
%define WS_CHILD            0x40000000
%define WS_MINIMIZE         0x20000000
%define WS_VISIBLE          0x10000000
%define WS_DISABLED         0x08000000
%define WS_CLIPSIBLINGS     0x04000000
%define WS_CLIPCHILDREN     0x02000000
%define WS_MAXIMIZE         0x01000000
%define WS_CAPTION          0x00C00000
%define WS_BORDER           0x00800000
%define WS_DLGFRAME         0x00400000
%define WS_VSCROLL          0x00200000
%define WS_HSCROLL          0x00100000
%define WS_SYSMENU          0x00080000
%define WS_THICKFRAME       0x00040000
%define WS_GROUP            0x00020000
%define WS_TABSTOP          0x00010000

%define WS_MINIMIZEBOX      0x00020000
%define WS_MAXIMIZEBOX      0x00010000

%define WS_TILED            WS_OVERLAPPED
%define WS_ICONIC           WS_MINIMIZE
%define WS_SIZEBOX          WS_THICKFRAME
%define WS_TILEDWINDOW      WS_OVERLAPPEDWINDOW

; Common Window Styles 

%define WS_OVERLAPPEDWINDOW (WS_OVERLAPPED     | \
							 WS_CAPTION        | \
							 WS_SYSMENU        | \
							 WS_THICKFRAME     | \
							 WS_MINIMIZEBOX    | \
							 WS_MAXIMIZEBOX)
                             
%define PM_REMOVE 1h

%define WM_QUIT                         0x0012
%define WM_PAINT                        0x000F
%define WM_CLOSE                        0x0010

; Class styles 

%define CS_VREDRAW          0x0001
%define CS_HREDRAW          0x0002
%define CS_DBLCLKS          0x0008
%define CS_OWNDC            0x0020
%define CS_CLASSDC          0x0040
%define CS_PARENTDC         0x0080
%define CS_NOCLOSE          0x0200
%define CS_SAVEBITS         0x0800
%define CS_BYTEALIGNCLIENT  0x1000
%define CS_BYTEALIGNWINDOW  0x2000
%define CS_GLOBALCLASS      0x4000

; Standard Icon IDs 

%define IDI_APPLICATION     32512
%define IDC_ARROW 32512
                             

section .text

global START
START:

	push 0
	call GetModuleHandleA
	mov dword [Instance], eax
    
    ; Fill all the OurWindowclass structure members ( dword[OurWindowclass+?] where '?' is member offset )
	mov dword[OurWindowclass], 48 ; .cbSize
	mov dword[OurWindowclass+4], CS_OWNDC|CS_HREDRAW|CS_VREDRAW 
	mov dword[OurWindowclass+8], WindowProc	; lpfnWndProc
	mov dword[OurWindowclass+12], 0
	mov dword[OurWindowclass+16], 0
    
    mov eax, dword[Instance]
	mov dword[OurWindowclass+20], eax ; .hInstance
    
    push IDI_APPLICATION
    push 0
    call LoadIconA
	mov dword[OurWindowclass+24], eax ; .hIcon
    
    push IDI_APPLICATION
    push 0
    call LoadCursorA
    mov dword[OurWindowclass+28], eax ; .hCursor
    
    mov dword[OurWindowclass+32], 5 ; .hbrBackground, 5 is COLOR_WINDOW
    mov dword[OurWindowclass+36], 0 ; .lpszMenuName
    mov dword[OurWindowclass+40], Windowclassname ; .lpszClassName
    mov dword[OurWindowclass+44], 0 ; .hIconSm
    
    ; Now register our class
    lea eax, [OurWindowclass]
    push eax
    call RegisterClassExA
    
    ; If return value is not zero then create the main window
    cmp eax, 0
    jne Lcreate
    
    push 0       ; button type - supposed to be 0,
    push Windowname    ; but I need all the help I can get :)
    push string_reg_failed
    push 0         ; our "handle", I think
    call MessageBoxA
    
    ; Oops!
    jmp exit

Lcreate:
	; Call the 'CreateWindowExA' function to create the main window
	push 0
    push dword[Instance]
    push 0
    push 0
	push 362	; Height
    push 362	; Width
    push 140	; Top
    push 360	; Left
	push WS_VISIBLE+WS_OVERLAPPEDWINDOW
	push Windowname
    push Windowclassname
    push 0
    call CreateWindowExA
    
    mov dword[Windowhandle], eax
    
    ; Show the main window
    push 1 					; 1 is SW_SHOW
    push dword[Windowhandle]
	call ShowWindow
    
    push dword[Windowhandle]
	call UpdateWindow
    
    ;Lb1:
    ;jmp Lb1
    
    ; -- every time user moves mouse or imput some msg this loop is activated
	; -- in order to get all messages imputed by the user 
messloop:
    
	push PM_REMOVE
	push 0
	push 0
	push 0
	push MessageBuffer
	call PeekMessageA
    
    ; See if the return value is zero
    cmp eax, 0
    je nextloop
        
    ; If the 'message' is WM_QUIT then we have to QUIT!
    cmp dword[MessageBuffer+4], WM_QUIT
    je exit
    
    push MessageBuffer
    call TranslateMessage
    
    push MessageBuffer
	call DispatchMessageA
    
nextloop:
    jmp near messloop

exit:
    push dword 0
    call ExitProcess

	ret
    
global WindowProc
WindowProc:
	push ebp	; Saves the base pointer
	mov ebp, esp	; Saves the stack pointer
    
    ; Here is our parameters
    
		; dword[ebp+20]	; LPARAM
        
		; dword[ebp+16]	; WPARAM
        
		; dword[ebp+12]	; Msg
        
		; dword[ebp+8]	; hWnd
    
    ; case WM_CLOSE
    cmp dword[ebp+12], WM_CLOSE
    jne Ldefault
	;{ 	begin WM_CLOSE
		push 0
		call PostQuitMessage
	;} 	end WM_CLOSE

Ldefault:
	push dword[ebp+20]	; LPARAM
    push dword[ebp+16]	; WPARAM
    push dword[ebp+12]	; Msg
    push dword[ebp+8]	; hWnd
	call DefWindowProcA
    
    mov esp, ebp
    pop ebp
	ret
    

;Data section of the KoolB app

section .data

Windowclassname db 'MyClass', 0
Windowname db 'My Window', 0
string_reg_failed  db 'Failed to register main window', 0

Instance dd 0
Windowhandle dd 0

section .bss

; This is my way!
MessageBuffer resb 28
OurWindowclass resb 48



