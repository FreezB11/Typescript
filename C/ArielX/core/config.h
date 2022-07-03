#define SUPPORT_MODULE_RSHAPES           1
#define SUPPORT_MODULE_RTEXTURES         1
#define SUPPORT_MODULE_RTEXT             1          // WARNING: It requires SUPPORT_MODULE_RTEXTURES to load sprite font textures
#define SUPPORT_MODULE_RMODELS           1
#define SUPPORT_MODULE_RAUDIO            1
#define SUPPORT_CAMERA_SYSTEM       1
#define SUPPORT_GESTURES_SYSTEM     1
#define SUPPORT_MOUSE_GESTURES      1
#define SUPPORT_SSH_KEYBOARD_RPI    1
#define SUPPORT_WINMM_HIGHRES_TIMER 1
#define SUPPORT_PARTIALBUSY_WAIT_LOOP
#define SUPPORT_SCREEN_CAPTURE      1
#define SUPPORT_GIF_RECORDING       1
#define SUPPORT_COMPRESSION_API     1
#define SUPPORT_DATA_STORAGE        1

#if defined(__linux__)
    #define MAX_FILEPATH_LENGTH     4096        // Maximum length for filepaths (Linux PATH_MAX default value)
#else
    #define MAX_FILEPATH_LENGTH      512        // Maximum length supported for filepaths
#endif

#define MAX_KEYBOARD_KEYS            512        // Maximum number of keyboard keys supported
#define MAX_MOUSE_BUTTONS              8        // Maximum number of mouse buttons supported
#define MAX_GAMEPADS                   4        // Maximum number of gamepads supported
#define MAX_GAMEPAD_AXIS               8        // Maximum number of axis supported (per gamepad)
#define MAX_GAMEPAD_BUTTONS           32        // Maximum number of buttons supported (per gamepad)
#define MAX_TOUCH_POINTS               8        // Maximum number of touch points supported
#define MAX_KEY_PRESSED_QUEUE         16        // Maximum number of keys in the key input queue
#define MAX_CHAR_PRESSED_QUEUE        16        // Maximum number of characters in the char input queue
#define STORAGE_DATA_FILE  "storage.data"       // Automatic storage filename
#define MAX_DECOMPRESSION_SIZE        64 
#define RL_DEFAULT_BATCH_BUFFERS               1      // Default number of batch buffers (multi-buffering)
#define RL_DEFAULT_BATCH_DRAWCALLS           256      // Default number of batch draw calls (by state changes: mode, texture)
#define RL_DEFAULT_BATCH_MAX_TEXTURE_UNITS     4      // Maximum number of textures units that can be activated on batch drawing (SetShaderValueTexture())
#define RL_MAX_MATRIX_STACK_SIZE              32      // Maximum size of internal Matrix stack
#define RL_MAX_SHADER_LOCATIONS               32      // Maximum number of shader locations supported
#define RL_CULL_DISTANCE_NEAR               0.01      // Default projection matrix near cull distance
#define RL_CULL_DISTANCE_FAR              1000.0   
#define RL_DEFAULT_SHADER_ATTRIB_NAME_POSITION     "vertexPosition"    // Binded by default to shader location: 0
#define RL_DEFAULT_SHADER_ATTRIB_NAME_TEXCOORD     "vertexTexCoord"    // Binded by default to shader location: 1
#define RL_DEFAULT_SHADER_ATTRIB_NAME_NORMAL       "vertexNormal"      // Binded by default to shader location: 2
#define RL_DEFAULT_SHADER_ATTRIB_NAME_COLOR        "vertexColor"       // Binded by default to shader location: 3
#define RL_DEFAULT_SHADER_ATTRIB_NAME_TANGENT      "vertexTangent"     // Binded by default to shader location: 4
#define RL_DEFAULT_SHADER_ATTRIB_NAME_TEXCOORD2    "vertexTexCoord2"   // Binded by default to shader location: 5
#define RL_DEFAULT_SHADER_UNIFORM_NAME_MVP         "mvp"               // model-view-projection matrix
#define RL_DEFAULT_SHADER_UNIFORM_NAME_VIEW        "matView"           // view matrix
#define RL_DEFAULT_SHADER_UNIFORM_NAME_PROJECTION  "matProjection"     // projection matrix
#define RL_DEFAULT_SHADER_UNIFORM_NAME_MODEL       "matModel"          // model matrix
#define RL_DEFAULT_SHADER_UNIFORM_NAME_NORMAL      "matNormal"         // normal matrix (transpose(inverse(matModelView))
#define RL_DEFAULT_SHADER_UNIFORM_NAME_COLOR       "colDiffuse"        // color diffuse (base tint color, multiplied by texture color)
#define RL_DEFAULT_SHADER_SAMPLER2D_NAME_TEXTURE0  "texture0"          // texture0 (texture slot active 0)
#define RL_DEFAULT_SHADER_SAMPLER2D_NAME_TEXTURE1  "texture1"          // texture1 (texture slot active 1)
#define RL_DEFAULT_SHADER_SAMPLER2D_NAME_TEXTURE2  "texture2"  
#define SUPPORT_QUADS_DRAW_MODE     1
#define SUPPORT_FILEFORMAT_PNG      1
#define SUPPORT_FILEFORMAT_GIF      1
#define SUPPORT_FILEFORMAT_QOI      1
#define SUPPORT_FILEFORMAT_DDS      1
#define SUPPORT_FILEFORMAT_HDR      1
#define SUPPORT_IMAGE_EXPORT        1
#define SUPPORT_IMAGE_GENERATION    1
#define SUPPORT_IMAGE_MANIPULATION  1
#define SUPPORT_DEFAULT_FONT        1
#define SUPPORT_FILEFORMAT_FNT      1
#define SUPPORT_FILEFORMAT_TTF      1
#define SUPPORT_TEXT_MANIPULATION   1
#define MAX_TEXT_BUFFER_LENGTH      1024  
#define MAX_TEXTSPLIT_COUNT          128 
#define SUPPORT_FILEFORMAT_OBJ      1
#define SUPPORT_FILEFORMAT_MTL      1
#define SUPPORT_FILEFORMAT_IQM      1
#define SUPPORT_FILEFORMAT_GLTF     1
#define SUPPORT_FILEFORMAT_VOX      1
#define SUPPORT_MESH_GENERATION     1
#define MAX_MATERIAL_MAPS               12      // Maximum number of shader maps supported
#define MAX_MESH_VERTEX_BUFFERS          7      
#define SUPPORT_FILEFORMAT_WAV      1
#define SUPPORT_FILEFORMAT_OGG      1
#define SUPPORT_FILEFORMAT_XM       1
#define SUPPORT_FILEFORMAT_MOD      1
#define SUPPORT_FILEFORMAT_MP3      1
#define AUDIO_DEVICE_FORMAT    ma_format_f32    // Device output format (miniaudio: float-32bit)
#define AUDIO_DEVICE_CHANNELS              2    // Device output channels: stereo
#define AUDIO_DEVICE_SAMPLE_RATE           0    // Device sample rate (device default)
#define MAX_AUDIO_BUFFER_POOL_CHANNELS    16 
#define SUPPORT_STANDARD_FILEIO
#define SUPPORT_TRACELOG            1
#define MAX_TRACELOG_MSG_LENGTH          128    // Max length of one trace-log message
